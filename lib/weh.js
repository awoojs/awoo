const pino = require('pino')
const flatten = require('lodash.flatten')
const hooks = require('./hooks')
const read = require('./read')
const write = require('./write')
const { generateConfig } = require('./config')

async function siteUse (fn, opts = {}) {
  const plugin = flatten(await fn(opts))

  for (let i = 0; i < plugin.length / 2; i = i + 2) {
    const slice = plugin.slice(i, i + 2)
    this.hooks.register(slice[0], slice[1])
  }
}

function siteConfig (conf = {}) {
  if (conf.loglevel) this.logger.level = conf.loglevel
  this.config = generateConfig(conf)
}

async function buildSite (site) {
  site.files = {}

  site.logger.debug('running pre_read...')
  await site.hooks.run('pre_read', site.files)

  site.logger.info('starting read...')
  try {
    site.files = await read(site)
  } catch (errs) {
    site.logger.error('uh oh! one or more errors occured while reading:')
    errs.forEach(err => { throw err })
  }

  site.logger.debug('running post_read...')
  await site.hooks.run('post_read', site.files)

  site.logger.debug('running pre_write...')
  await site.hooks.run('pre_write', site.files)

  site.logger.info('starting write...')
  site = await write(site)

  site.logger.debug('running post_write...')
  await site.hooks.run('post_write', site.files)

  site.logger.info('all done!')
  return site
}

async function weh (fn) {
  const site = {}
  site.config = {}
  site.logger = pino({
    name: 'weh',
    level: 'info'
  })
  site.hooks = hooks()

  site.config = siteConfig.bind(site)
  site.use = siteUse.bind(site)

  site.logger.info('weh is ready to go!!!')

  const resSite = await fn(site)
  if (Object.keys(site.config).length === 0) {
    site.config = generateConfig({})
  }
  return buildSite(resSite)
}

module.exports = weh
