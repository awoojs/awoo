const config = require('./config')
const Hooks = require('./hooks')
const { walkDir } = require('./read')

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

  async build () {
    await this.hooks.run('pre_read', this.site)
    this.site.files = await walkDir(this.site.config)
    await this.hooks.run('post_read')
    return this.hooks.run('pre_run', this.site)
  }
}

module.exports = koe
