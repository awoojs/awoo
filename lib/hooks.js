const trough = require('trough')

function hooks () {
  const names = [
    'pre_read',
    'post_read',
    'pre_write',
    'post_write'
  ]

  const registry = {}

  names.forEach(function (name) {
    registry[name] = trough()
  })

  return {
    register (name, fn) {
      registry[name].use(fn)
    },

    run (name, ...args) {
      return new Promise((resolve, reject) => {
        registry[name].run(...args, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
    }
  }
}

module.exports = hooks
