const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {StatsWriterPlugin} = require('webpack-stats-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const moduleConfig = (server = true) => {
  return {
    rules: [
      {
        test: /\.tsx?$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          // ...(server ? [] : [MiniCssExtractPlugin.loader]),
          'style-loader', // Inject styles into the DOM
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
}
const extensions = ['.tsx', '.ts', '.js', '.jsx', '.css'] // Resolve these file extensions
const clientApp = {
  entry: './src/app/index.tsx', // Your entry point (React app's root component)
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist/client'), // The directory to output bundled files
    filename: 'main.js' // The name of the bundled JavaScript file
  },
  mode: 'development', // Use 'production' for production builds
  devtool: 'inline-source-map', // Source maps for easier debugging
  devServer: {
    contentBase: './dist', // Where the dev server will look for files
    hot: true // Hot module replacement for live updates
  },
  module: moduleConfig(false),
  resolve: {
    extensions,
    alias: {
      '@ds-fancode/redux-rewire-core': path.resolve(
        __dirname,
        '../../packages/core/src'
      ),
      '@ds-fancode/redux-rewire-react': path.resolve(
        __dirname,
        '../../packages/react/src'
      )
    }
  },
  plugins: [
    new StatsWriterPlugin({
      filename: `assets-stats.json`,
      stats: {
        all: false,
        publicPath: true,
        entrypoints: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css' // Output CSS file with hash for caching
    })
  ]
}

const allowlist = [
  '@ds-fancode/redux-rewire-core',
  '@ds-fancode/redux-rewire-react'
]
const serverApp = {
  entry: './src/server/index.ts', // Your entry point (React app's root component)
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist/server'), // The directory to output bundled files
    filename: 'main.js' // The name of the bundled JavaScript file
  },
  mode: 'development', // Use 'production' for production builds
  devtool: 'source-map', // Source maps for easier debugging
  target: 'node', // Make web variables accessible to webpack, e.g. window
  optimization: {
    minimize: false
  },
  externalsPresets: {node: true},
  node: {
    __dirname: false
  },
  bail: true,
  externals: [
    nodeExternals({
      allowlist: allowlist
    }),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: allowlist
    })
  ],
  module: moduleConfig(true),
  resolve: {
    extensions
  },
  plugins: []
}

module.exports = [clientApp, serverApp]
