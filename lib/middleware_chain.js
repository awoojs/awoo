const wrap = require('wrapped')
const slice = [].slice

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
    const self = this
    return new Promise((resolve, reject) => {
      let i = 0
      let arg = slice.call(args)

      const next = err => {
        if (err) reject(err)
        const fn = this.fns[i++]
        const arr = slice.call(arg)

        if (!fn) {
          resolve.apply(null, arg)
        }

        wrap(fn).apply(self, arr.concat(next))
      }

      next()
    })
  }
}

module.exports = MiddlewareChain
