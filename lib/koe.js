const config = require('./config')
const Hooks = require('./hooks')
const read = require('./read')
const write = require('./write')

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
    this.site.files = await read(this.site.config)
    await this.hooks.run('post_read')
    await this.hooks.run('pre_run', this.site)
    await this.hooks.run('post_run', this.site)
    await this.hooks.run('pre_write', this.site)
    this.site = await write(this.site)
    return await this.hooks.run('post_write', this.site)
  }
}

module.exports = koe
