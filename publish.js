const fs = require('fs')
const packageJson = require('./package.json')
const newPackageJson = {...packageJson}
newPackageJson.main = './cjs/index.js'
newPackageJson.module = './esm/index.js'
newPackageJson.types = './esm/index.d.ts'
delete newPackageJson.scripts
delete newPackageJson.devDependencies

newPackageJson.dependencies = {
  'react-redux': '*',
  "immer": "*",
  redux: '*',
}
newPackageJson.peerDependencies = {
  ...newPackageJson.peerDependencies,
  typescript: '^4.9.4'
}
fs.writeFileSync('./lib/package.json', JSON.stringify(newPackageJson))
fs.copyFileSync('./README.md', './lib/README.md')
