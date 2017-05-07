const pino = require('pino')
const hooks = require('./hooks2')

function siteHook (name, fn) {
  console.log(this)
  this.register(name, fn)
}

async function buildSite (site) {
  console.log(site)
  await site.hooks.run('pre_read', site)
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
  site.hook = siteHook.bind(site.hooks)

  const resSite = await fn(site)
  return buildSite(resSite)
}

module.exports = weh
