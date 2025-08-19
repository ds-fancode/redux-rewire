import {defineConfig, type Options} from 'tsup'

export default defineConfig(options => {
  const baseConfig: Options = {
    entry: {
      'index.debug': 'src/index.ts'
    },
    tsconfig: 'tsconfig.build.json',
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false,
    dts: false,
    platform: 'neutral',
    target: 'es2017'
  }
  const minifiedConfig = {
    ...baseConfig,
    sourcemap: false,
    clean: false,
    minify: true
  }
  return [
    // esm
    {
      ...baseConfig,
      outDir: './dist/esm/',
      format: ['esm'],
      name: 'mjs-debug'
    },
    {
      ...minifiedConfig,
      entry: {
        'index.min': 'src/index.ts'
      },
      outDir: './dist/esm/',
      format: ['esm'],
      name: 'mjs-minified'
    },
    // cjs
    {
      ...baseConfig,
      outDir: './dist/cjs/',
      format: ['cjs'],
      name: 'cjs-debug',
      dts: true
    },
    {
      ...minifiedConfig,
      entry: {
        'index.min': 'src/index.ts'
      },
      outDir: './dist/cjs/',
      format: ['cjs'],
      name: 'cjs-minified'
    },
    // global
    {
      ...baseConfig,
      outDir: './dist/global/',
      format: ['iife'],
      dts: false
    }
  ]
})
