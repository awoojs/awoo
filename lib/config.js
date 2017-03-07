const merge = require('deepmerge')
const path = require('path')

const DEFAULT_CONFIG = {
  source: process.cwd(),
  destination: path.join(process.cwd(), '_site'),
  exclude: [
    'package.json',
    'node_modules/',
    'bower_components/',
    'coverage/'
  ]
}

function generateConfig (site) {
  site.config = merge(DEFAULT_CONFIG, site)
}

module.exports = {
  generateConfig
}
