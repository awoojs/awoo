const pino = require('pino')
const config = require('./config')
const Hooks = require('./hooks')
const read = require('./read')
const write = require('./write')
const { version } = require('../package.json')

function koe (config, opts) {
  return new Koe(config, opts)
}

class Koe {
  constructor (conf, { silent = false, verbose = false } = {}) {
    let loggingLevel = 'info'
    if (silent) loggingLevel = 'silent'
    if (verbose) loggingLevel = 'debug'

    this.site = {}
    this.site.config = config.generateConfig(conf)
    this.site.logger = pino({
      name: 'koe',
      level: loggingLevel
    })
    this.hooks = new Hooks()
  }

  use (fn) {
    this.hooks.register('pre_write', fn)
  }

  hook (hookName, fn) {
    this.hooks.register(hookName, fn)
  }

  async build () {
    this.site.logger.info(`koe v${version} ready!`)

    this.site.logger.debug('running pre_read...')
    await this.hooks.run('pre_read', this.site)

    this.site.logger.info('starting read...')
    this.site.files = await read(this.site)

    this.site.logger.debug('running post_read...')
    await this.hooks.run('post_read', this.site)

    this.site.logger.debug('running pre_write...')
    await this.hooks.run('pre_write', this.site)

    this.site.logger.info('starting write...')
    this.site = await write(this.site)

    this.site.logger.debug('running post_write...')
    const res = await this.hooks.run('post_write', this.site)

    this.site.logger.info('all done!')
    return res
  }
}

module.exports = koe
