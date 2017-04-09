import test from 'ava'
import ware from 'ware'
import { addPlugin } from '../lib/plugin'

const mockHooks = {
  registry: {
    test: ware(),
    anotherTest: ware()
  }
}

test('plugins with one hook are registered and executed', async t => {
  const mockPlugin = {
    test: site => { site.a = 'foo' }
  }

  addPlugin(mockHooks, mockPlugin)
  t.is(mockHooks.registry.test.fns.length, 1)

  let result = {}
  mockHooks.registry.test.run(result)
  t.is(result.a, 'foo')
})

test('plugins with multiple hooks are registered and executed', async t => {
  const mockPlugin = {
    test: site => { site.a = 'foo' },
    anotherTest: site => { site.b = 'bar' }
  }

  addPlugin(mockHooks, mockPlugin)
  t.is(mockHooks.registry.test.fns.length, 1)
  t.is(mockHooks.registry.anotherTest.fns.length, 1)

  let result = {}
  mockHooks.registry.test.run(result)
  mockHooks.registry.anotherTest.run(result)
  t.deepEqual(result, { a: 'foo', b: 'bar' })
})
