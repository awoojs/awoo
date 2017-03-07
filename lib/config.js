const merge = require('lodash.merge')

const DEFAULT_CONFIG = {
  source: '.',
  destination: './_site',
  exclude: ['node_modules/']
}

function generateConfig (conf) {
  return merge(DEFAULT_CONFIG, conf)
}

module.exports = {
  generateConfig
}
