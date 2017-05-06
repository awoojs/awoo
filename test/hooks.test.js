const test = require('ava')
const ware = require('ware')
const Hooks = require('../lib/hooks')

test('hooks are initialized with a ware instance', async t => {
  const hooks = new Hooks()
  t.true(hooks.registry.pre_write instanceof ware)
})

test('hooks register properly', async t => {
  const hooks = new Hooks()
  hooks.register('pre_write', () => {})
  t.is(hooks.registry.pre_write.fns.length, 1)
})

test('hooks execute correctly', async t => {
  const hooks = new Hooks()
  hooks.register('pre_write', obj => {
    obj.a = 'test'
  })
  const res = await hooks.run('pre_write', {})
  t.is(res.a, 'test')
})
