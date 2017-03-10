const ware = require('ware')
const config = require('./config')

function koe (config) {
  return new Koe(config)
}

class Koe {
  constructor (conf) {
    this.middleware = ware()
    this.site = {}
    this.site.config = config.generateConfig(conf)
  }

  use (fn) {
    this.middleware.use(fn)
  }

  build () {
    return new Promise((resolve, reject) => {
      this.middleware.run(this.site, (err, config) => {
        if (err) reject(err)
        resolve(config)
      })
    })
  }
}

module.exports = koe
