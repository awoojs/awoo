const merge = require('deepmerge')
const path = require('path')

const DEFAULT_CONFIG = {
  source: process.cwd(),
  destination: path.join(process.cwd(), '_site'),
  exclude: [
    'package.json',
    'node_modules/',
    'bower_components/',
    'coverage/',
    '_site',
    '.git'
  ]
}

function generateConfig (conf = {}) {
  const result = merge(DEFAULT_CONFIG, conf)
  if (conf.destination) {
    result.exclude.push(path.relative(process.cwd(), conf.destination))
  }
  return result
}

module.exports = {
  DEFAULT_CONFIG,
  generateConfig
}
