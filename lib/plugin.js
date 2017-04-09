function addPlugin (hooks, plugin) {
  if (typeof plugin !== 'object') {
    throw new Error('plugin has to be an object!')
  }

  for (let k in plugin) {
    const hook = plugin[k]
    if (typeof hook !== 'function') {
      throw new Error(`${k} has to be a function!`)
    }
    hooks.register(k, hook)
  }
}

module.exports.addPlugin = addPlugin
