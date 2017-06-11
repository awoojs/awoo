const debug = require('debug')('weh')
const flatten = require('lodash.flatten')
const hooks = require('./hooks')
const read = require('./read')
const write = require('./write')
const { generateConfig } = require('./config')

async function siteUse (fn, opts = {}) {
  const plugin = await fn(opts)

  if (typeof plugin === 'function') {
    this.hooks.register('pre_write', plugin)
  } else {
    for (let i = 0; i < plugin.length / 2; i = i + 2) {
      const slice = flatten(plugin).slice(i, i + 2)
      this.hooks.register(slice[0], slice[1])
    }
  }
}

function siteConfig (conf = {}) {
  this.config = generateConfig(conf)
}

async function buildSite (site) {
  site.files = {}

  debug('running pre_read...')
  await site.hooks.run('pre_read', site.files)

  debug('starting read...')
  try {
    site.files = await read(site)
  } catch (errs) {
    debug('one or more errors occured while reading:')
    errs.forEach(err => { throw err })
  }

  debug('running post_read...')
  await site.hooks.run('post_read', site.files)

  debug('running pre_write...')
  await site.hooks.run('pre_write', site.files)

  if (site.config.dry_run) {
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

async function weh (fn) {
  const site = {}
  site.config = {}
  site.hooks = hooks()

  site.config = siteConfig.bind(site)
  site.use = siteUse.bind(site)

  debug('weh is ready to go!!!')

  const resSite = await fn(site)
  if (Object.keys(site.config).length === 0) {
    site.config = generateConfig({})
  }
  return buildSite(resSite)
}

module.exports = weh
