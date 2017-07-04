const debug = require('debug')('weh')
const hooks = require('./hooks')
const read = require('./read')
const write = require('./write')
const { generateConfig } = require('./config')

async function siteUse (fn, opts = {}) {
  const plugin = await fn(opts)
  this.hooks.register('pre_write', plugin)
}

function siteConfig (conf = {}) {
  this._config = generateConfig(conf)
}

async function buildSite (site) {
  site.files = []

  debug('running pre_read...')
  await site.hooks.run('pre_read', site.files)

  debug('starting read...')
  try {
    site.files = site._config.dry_run ? site._config.files : await read(site._config)
  } catch (errs) {
    debug('one or more errors occured while reading:')
    errs.forEach(err => { throw err })
  }

  debug('running post_read...')
  await site.hooks.run('post_read', site.files)

  debug('running pre_write...')
  await site.hooks.run('pre_write', site.files)

  if (site._config.dry_run) {
    debug('skipping write...')
  } else {
    debug('starting write...')
    site = await write(site)
  }

  debug('running post_write...')
  await site.hooks.run('post_write', site.files)

  debug('all done!')
  return site
}

async function wehCore (site, fn) {
  site.config = siteConfig.bind(site)
  site.use = siteUse.bind(site)

  debug('weh is ready to go!!!')
  debug(site)

  const resSite = await fn(site)
  if (Object.keys(site._config).length === 0) {
    site._config = generateConfig({})
  }
  return buildSite(resSite)
}

async function weh (fn) {
  const site = {}
  site._config = {}
  site.hooks = hooks()
  return wehCore(site, fn)
}

async function wehIntegration (fn, files) {
  const site = {}
  site._config = {
    dry_run: true,
    files
  }
  site.hooks = hooks()
  return wehCore(site, fn)
}

module.exports = weh
module.exports.integration = wehIntegration
