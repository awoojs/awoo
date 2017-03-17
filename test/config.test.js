import test from 'ava'
import deepmerge from 'deepmerge'
import config from '../lib/config'

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
