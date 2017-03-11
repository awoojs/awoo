import test from 'ava'
import ware from 'ware'
import Hooks from '../lib/hooks'

test('hooks register properly', async t => {
  const hooks = new Hooks()
  t.true(hooks.registry.pre_run instanceof ware)

  hooks.register('pre_run', () => {})
  t.is(hooks.registry.pre_run.fns.length, 1)
})

test('hooks execute correctly', async t => {
  const hooks = new Hooks()
  hooks.register('pre_run', obj => {
    obj.a = 'test'
  })
  const res = await hooks.run('pre_run', {})
  t.is(res.a, 'test')
})
