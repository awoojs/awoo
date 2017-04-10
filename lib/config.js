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
  const result = merge(DEFAULT_CONFIG, conf)
  if (conf.destination) {
    result.exclude.push(path.relative(process.cwd(), conf.destination))
  }
  return result
}

function mergeConfigs (conf1, conf2) {
  return merge(conf1, conf2)
}

module.exports = {
  DEFAULT_CONFIG,
  generateConfig,
  mergeConfigs
}
