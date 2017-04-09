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

function generateConfig (conf = {}) {
  return merge(DEFAULT_CONFIG, conf)
}

function mergeConfigs (conf1, conf2) {
  return merge(conf1, conf2)
}

module.exports = {
  DEFAULT_CONFIG,
  generateConfig,
  mergeConfigs
}
