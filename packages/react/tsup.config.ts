import {defineConfig} from 'tsup'

export default defineConfig(options => {
  const baseConfig = {
    entry: ['src/index.ts'],
    tsconfig: 'tsconfig.build.json',
    splitting: false,
    sourcemap: true,
    clean: true,
    // minify: !options.watch,
    minify: false,
    dts: true
  }
  return [
    {
      ...baseConfig,
      entry: ['src/index.ts'],
      outDir: './dist/esm/',
      format: ['esm']
    },
    {
      ...baseConfig,
      entry: ['src/index.ts'],
      outDir: './dist/cjs/',
      format: ['cjs']
    }
  ]
})
