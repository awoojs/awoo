const test = require('ava')
const vfile = require('vfile')
const weh = require('../lib/weh')

test('correctly runs in integration mode', async t => {
  const plugin = () => {
    return files => {
      return files.map(file => Object.assign(file, {contents: 'test2'}))
    }
  }

  const files = [
    vfile({ path: 'a', contents: 'aaa' })
  ]

  const res = await weh.integration(site => {
    site.use(plugin)
    return site
  }, files)

  t.is(res.files[0].contents, 'test2')
})

test('generates a sample config if none is found', async t => {
  const res = await weh.integration(site => {
    site.config({})
    return site
  }, [])
  t.is(res._config.source, process.cwd())
})
