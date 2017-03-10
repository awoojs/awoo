const config = require('./config')
const Hooks = require('./hooks')

function koe (config) {
  return new Koe(config)
}

class Koe {
  constructor (conf) {
    this.site = {}
    this.site.config = config.generateConfig(conf)
    this.hooks = new Hooks()
  }

  use (fn) {
    this.hooks.register('pre_run', fn)
  }

  build () {
    return this.hooks.run('pre_run', this.site)
  }
}

module.exports = koe
