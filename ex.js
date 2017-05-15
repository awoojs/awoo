const weh = require('./index')

function plugin (opts) {
  return files => files
}

weh(async site => {
  site.config({loglevel: 'debug'})
  site.use(plugin)
  return site
}).catch(err => {
  console.log(err)
})
