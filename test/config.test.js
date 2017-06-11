const test = require('ava')
const deepmerge = require('deepmerge')
const config = require('../lib/config')

test('config is merged correctly', async t => {
  const conf1 = config.generateConfig()
  t.deepEqual(conf1, config.DEFAULT_CONFIG)

  const modifier = {
    exclude: ['deps/'],
    custom_key: 'test'
  }
  const conf2 = config.generateConfig(modifier)
  t.deepEqual(conf2, deepmerge(config.DEFAULT_CONFIG, modifier))
})

test('destination is automatically excluded', async t => {
  const modifier = {
    destination: 'test_blah'
  }
  const conf = config.generateConfig(modifier)
  t.true(conf.exclude.includes('test_blah'))
})
