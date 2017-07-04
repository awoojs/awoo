const test = require('ava')
const { integration } = require('../lib/weh')

test('correctly runs in integration mode', async t => {
  const plugin = () => {
    return files => {
      return files.map(file => Object.assign(file, {contents: 'test'}))
    }
  }

  const files = [
    {
      contents: 'aaa'
    }
  ]

  const res = await integration(site => {
    site.use(plugin)
    return site
  }, files)

  t.is(res.files[0].contents, 'test')
})
