import type {Request, Response} from 'express'
import React from 'react'
import {configureStore} from '@redux-rewire/core'
import {renderToPipeableStream} from 'react-dom/server'
import {App} from '../app/app'
import {RewireProvider} from '@redux-rewire/react'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import path from 'path'
import fs from 'fs'
import {Transform} from 'stream'

let entryFiles: Array<string> = []
export const getClientEntryFiles = function () {
  if (entryFiles.length === 0 || process.env.NODE_ENV === 'development') {
    const pathToStatsJson = path.join(
      process.cwd(),
      'dist/client',
      'assets-stats.json'
    )
    const statsFile = JSON.parse(fs.readFileSync(pathToStatsJson) as any)
    const basePath = statsFile.publicPath
    /**
     * All the entry point files
     * Refer 'assets-stats.json' file created under build folder
     */
    entryFiles = Object.values<{assets: string[]}>(statsFile.entrypoints)
      .reduce((acc: any, entryPoint: any) => {
        const entryAssetsList = Array.isArray(entryPoint.assets)
          ? entryPoint.assets.map((currentAssets: any) => {
              return currentAssets.name
            })
          : []
        acc = [...acc, ...entryAssetsList]
        return acc
      }, [])
      .map((scriptPath: string) => {
        return `${basePath}${scriptPath}`
      })
  }
  console.log('entryFiles', entryFiles)
  return entryFiles
}

export const renderer = async (req: Request, res: Response) => {
  const store = configureStore([], {})
  const sheet = new ServerStyleSheet()
  let didError = false
  res?.socket?.on('error', error => {
    console.error('Fatal', error)
  })
  const readerWriter = new Transform({
    objectMode: true,
    transform(
      chunk,
      /* encoding */
      encoding,
      callback
    ) {
      // Get the chunk and retrieve the sheet's CSS as an HTML chunk,
      // then reset its rules so we get only new ones for the next chunk
      const decoder = new TextDecoder('utf-8') // Create a TextDecoder instance for UTF-8 encoding
      const renderedHtml = decoder.decode(chunk)
      const styledCSS = sheet._emitSheetCSS()
      console.log('encoding', encoding)
      console.log('renderedHtml', renderedHtml)
      console.log('styledCSS', styledCSS)
      const CLOSING_TAG_R = /<\/[a-z]*>/i

      sheet.instance.clearTag()

      // prepend style html to chunk, unless the start of the chunk is a
      // closing tag in which case append right after that
      if (/<\/head>/.test(renderedHtml)) {
        const replacedHtml = renderedHtml.replace(
          '</head>',
          `${styledCSS}</head>`
        )
        this.push(replacedHtml)
      } else if (CLOSING_TAG_R.test(renderedHtml)) {
        const execResult: any = CLOSING_TAG_R.exec(renderedHtml)
        const endOfClosingTag = execResult.index + execResult.flat().length - 1

        const before = renderedHtml.slice(0, endOfClosingTag)
        const after = renderedHtml.slice(endOfClosingTag)
        this.push(before + styledCSS + after)
      } else {
        this.push(styledCSS + renderedHtml)
      }
      callback()
    }
  })

  const stream = renderToPipeableStream(
    <React.StrictMode>
      <StyleSheetManager sheet={sheet.instance}>
        <RewireProvider store={store}>
          <App />
        </RewireProvider>
      </StyleSheetManager>
    </React.StrictMode>,
    {
      bootstrapScripts: getClientEntryFiles(),
      onShellReady: () => {
        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-type', 'text/html')
        stream.pipe(readerWriter)
      },
      onError: error => {
        didError = true
        console.error(error)
      },
      onAllReady: () => {}
    }
  )
  setTimeout(() => stream.abort(), 5000)
  readerWriter.pipe(res)
}
