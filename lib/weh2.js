const pino = require('pino')
const hooks = require('./hooks2')
const read = require('./read')
const { generateConfig } = require('./config')

function siteHook (name, fn) {
  this.hooks.register(name, fn)
}

function siteConfig (conf = {}) {
  this.config = generateConfig(conf)
}

async function buildSite (site) {
  const files = await read(site)
  console.log(files)

  site.files = files
  await site.hooks.run('pre_read', site.files)
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

  const resSite = await fn(site)
  return buildSite(resSite)
}

module.exports = weh
