const ware = require('ware')
const config = require('./config')

function koe (config) {
  return new Koe(config)
}

class Koe {
  constructor (conf) {
    this.config_middleware = ware()
    this.config_middleware.use(config.generateConfig)
    this.middleware = ware()
    this.site = {}
  }

  use_config (fn) {
    this.config_middleware.use(fn)
  }

  configure (conf) {
    this.site.config = conf
    return new Promise((resolve, reject) => {
      this.config_middleware.run(this.site, (err, result) => {
        if (err) reject(err)
        resolve(this)
      })
    })
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
