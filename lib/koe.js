const ware = require('ware')
const config = require('./config')

function koe (config) {
  return new Koe(config)
}

class Koe {
  constructor (conf) {
    this.config = config.generateConfig(conf)
    this.middleware = ware()
  }

  use (fn) {
    this.middleware.use(fn)
  }

  build () {
    return new Promise((resolve, reject) => {
      this.middleware.run(this.config, (err, config) => {
        if (err) reject(err)
        resolve(config)
      })
    })
  }
}

module.exports = koe
