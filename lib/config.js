const merge = require('lodash.merge')
const path = require('path')

const DEFAULT_CONFIG = {
  source: process.cwd(),
  destination: path.join(process.cwd(), '_site'),
  exclude: ['node_modules/']
}

function generateConfig (conf) {
  return merge(DEFAULT_CONFIG, conf)
}

module.exports = {
  generateConfig
}
