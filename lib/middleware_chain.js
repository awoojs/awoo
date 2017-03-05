class MiddlewareChain {
  constructor () {
    this.fns = []
  }

  add (fn) {
    if (Array.isArray(fn)) {
      fn.forEach(e => this.add(e))
      return
    }

    this.fns.push(fn)
  }

  run (...args) {
    // implement
  }
}

module.exports = MiddlewareChain
