const pino = require('pino')
const config = require('./config')
const Hooks = require('./hooks')
const read = require('./read')
const write = require('./write')
const { addPlugin } = require('./plugin')
const { version } = require('../package.json')

function weh (config, opts) {
  return new Weh(config, opts)
}

class Weh {
  constructor (conf, { silent = false, verbose = false } = {}) {
    let loggingLevel = 'info'
    if (silent) loggingLevel = 'silent'
    if (verbose) loggingLevel = 'debug'

    this.site = {}
    this.site.config = config.generateConfig(conf)
    this.site.logger = pino({
      name: 'weh',
      level: loggingLevel
    })
    this.hooks = new Hooks()
  }

  plugin (plugin, opts) {
    if (opts && !plugin.configName) {
      throw new Error('this plugin does not support options!')
    }
    if (opts) {
      opts[plugin.configName] = opts
      this.site.config = config.mergeConfigs(this.site.config, opts[plugin.configName])
    }

    addPlugin(this.hooks, plugin)
  }

  use (fn) {
    this.hooks.register('pre_write', fn)
  }

  hook (hookName, fn) {
    this.hooks.register(hookName, fn)
  }

  async build () {
    this.site.logger.info(`weh v${version} ready!`)

    this.site.logger.debug('running pre_read...')
    await this.hooks.run('pre_read', this.site)

    this.site.logger.info('starting read...')
    try {
      this.site.files = await read(this.site)
    } catch (errs) {
      this.logger.warn('uh oh! one or more errors occured while reading:')
      errs.forEach(err => {
        this.logger.warn(err.stack)
        throw err
      })
    }

    this.site.logger.debug('running post_read...')
    await this.hooks.run('post_read', this.site)

    this.site.logger.debug('running pre_write...')
    await this.hooks.run('pre_write', this.site)

    this.site.logger.info('starting write...')
    try {
      this.site = await write(this.site)
    } catch (err) {
      this.site.logger.warn('oh no! there was an error while writing:')
      this.site.logger.warn(err.stack)
      throw err
    }

    this.site.logger.debug('running post_write...')
    const res = await this.hooks.run('post_write', this.site)

    this.site.logger.info('all done!')
    return res
  }
}

module.exports = weh
