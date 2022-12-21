const fs = require('fs')
const packageJson = require('./package.json')

const newPackageJson = {...packageJson}
newPackageJson.main = './lib/cjs/index.js'
newPackageJson.module = './lib/esm/index.js'
newPackageJson.types = './lib/esm/index.d.ts'
fs.writeFileSync('./lib/package.json', JSON.stringify(newPackageJson))
