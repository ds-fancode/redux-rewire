module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: true
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: ['babel-plugin-styled-components']
}
