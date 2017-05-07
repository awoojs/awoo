const pino = require('pino')
const hooks = require('./hooks')
const read = require('./read')
const write = require('./write')
const { generateConfig } = require('./config')

function siteHook (name, fn) {
  this.hooks.register(name, fn)
}

function siteUse (fn, opts = {}) {
  const plugin = fn(opts)
  this.hooks.register(plugin[0], plugin[1])
}

function siteConfig (conf = {}) {
  this.config = generateConfig(conf)
}

async function buildSite (site) {
  site.files = {}
  await site.hooks.run('pre_read', site.files)
  site.files = await read(site)
  await site.hooks.run('post_read', site.files)
  await site.hooks.run('pre_write', site.files)
  site = await write(site)
  await site.hooks.run('post_write', site.files)
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

  site.hook = siteHook.bind(site)
  site.config = siteConfig.bind(site)
  site.use = siteUse.bind(site)

  const resSite = await fn(site)
  return buildSite(resSite)
}

module.exports = weh
