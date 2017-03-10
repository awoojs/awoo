const ware = require('ware')

class Hooks {
  constructor () {
    const names = [
      'pre_read',
      'post_read',
      'pre_run',
      'post_run',
      'pre_write',
      'post_write'
    ]

    this.registry = {}

    names.forEach(name => {
      this.registry[name] = ware()
    })
  }

  register (name, fn) {
    this.registry[name].use(fn)
  }

  run (name, ...args) {
    return new Promise((resolve, reject) => {
      this.registry[name].run(...args, (err, config) => {
        if (err) reject(err)
        resolve(config)
      })
    })
  }
}

module.exports = Hooks
