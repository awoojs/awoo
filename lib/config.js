const merge = require('lodash.merge')
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

function generateConfig (conf) {
  return merge(DEFAULT_CONFIG, conf)
}

module.exports = {
  generateConfig
}
