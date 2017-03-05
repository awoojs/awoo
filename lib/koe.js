const MiddlewareChain = require('./middleware_chain')

function koe (config) {
  return new Koe(config)
}

class Koe {
  constructor (config) {
    this.middleware = new MiddlewareChain()
  }
}

module.exports = koe
