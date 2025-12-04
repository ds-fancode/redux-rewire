import {configureStore} from '@ds-fancode/redux-rewire-core'
import {RewireProvider} from '@ds-fancode/redux-rewire-react'
import type {Request, Response} from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import {renderToPipeableStream} from 'react-dom/server'
import {Transform} from 'stream'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {App} from '../app/app'

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
async function wrapStream(
  res: Response,
  stream: ReturnType<typeof renderToPipeableStream>,
  startText: string,
  endText: string
) {
  let started = false
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      if (!started) {
        console.log('[stream] html start')
        this.push(startText.trim())
        started = true
      }
      this.push(chunk)
      callback()
    },
    flush(callback) {
      console.log('[stream] html end')
      this.push(endText.trim())
      callback()
    }
  })
  console.log('[stream] piping')
  stream.pipe(transformStream).pipe(res)
}
export const renderer = async (req: Request, res: Response) => {
  const store = configureStore([], {}, {asyncFunction: cb => cb()})
  const sheet = new ServerStyleSheet()
  let didError = false
  console.log('========= Starting renderer for =========', req.url)
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
    // <React.StrictMode>
    <StyleSheetManager sheet={sheet.instance}>
      <RewireProvider store={store}>
        <App />
      </RewireProvider>
    </StyleSheetManager>,
    // </React.StrictMode>,
    {
      bootstrapScripts: getClientEntryFiles(),
      onShellReady: () => {
        console.log('onShellReady')
      },
      onShellError: error => {
        console.error('onShellError', error)
      },
      onError: error => {
        didError = true
        console.error('onError', error)
      },
      onAllReady: () => {
        const styleTags = sheet.getStyleTags()
        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-type', 'text/html')
        const headerText = `${styleTags}`
        const footerText = `
          <script id='fc-web-nonce-ele'>
           window.__INIT_STATE__ = ${JSON.stringify(store.getState())}
          </script>
        `
        wrapStream(res, stream, headerText, footerText)
        console.log('onAllReady')
      }
    }
  )
  setTimeout(() => stream.abort(), 50000)
}
