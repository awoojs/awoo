const test = require('ava')
const hooks = require('../lib/hooks2')

test('one hook is executed correctly', async t => {
  const h = hooks()
  h.register('pre_write', _ => 'test')
  const res = await h.run('pre_write', 'a')
  t.is(res, 'test')
})

test('multiple hooks are executed correctly', async t => {
  const h = hooks()
  h.register('post_write', str => `${str}ttt`)
  h.register('pre_read', str => `${str}sss`)
  const res1 = await h.run('pre_read', 'te')
  const res2 = await h.run('post_write', res1)
  t.is(res1, 'tesss')
  t.is(res2, 'tesssttt')
})
