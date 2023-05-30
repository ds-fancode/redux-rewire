const fs = require('fs')
const packageJson = require('./package.json')
const newPackageJson = {...packageJson}
newPackageJson.main = './cjs/index.js'
newPackageJson.module = './esm/index.js'
newPackageJson.types = './esm/index.d.ts'
delete newPackageJson.scripts
delete newPackageJson.devDependencies

newPackageJson.dependencies = {}
newPackageJson.peerDependencies = {
  ...newPackageJson.peerDependencies,
  'react-redux': '^8.0.5',
  redux: '^4.2.0',
  typescript: '^4.9.4'
}
fs.writeFileSync('./lib/package.json', JSON.stringify(newPackageJson))
