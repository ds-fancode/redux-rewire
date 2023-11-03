const fs = require('fs')
const packageJson = require('./package.json')
const newPackageJson = {...packageJson}
newPackageJson.main = './cjs/index.js'
newPackageJson.module = './esm/index.js'
newPackageJson.types = './esm/index.d.ts'
const dependencies = {
  'react-redux': newPackageJson.dependencies['react-redux'],
  redux: newPackageJson.dependencies['redux'],
  immer: newPackageJson.dependencies['immer'],
}
const peerDependencies = {
  ...newPackageJson.peerDependencies,
  typescript: newPackageJson.dependencies['typescript'],
}
const scripts = {}
const devDependencies = {}
newPackageJson.scripts = scripts
newPackageJson.dependencies = dependencies
newPackageJson.devDependencies = devDependencies
newPackageJson.peerDependencies = peerDependencies
fs.writeFileSync('./lib/package.json', JSON.stringify(newPackageJson))
fs.copyFileSync('./README.md', './lib/README.md')
