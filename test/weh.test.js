const test = require('ava')
const rimraf = require('rimraf')
const fs = require('fs')
const weh = require('../lib/weh')

test.after.always(t => {
  rimraf.sync('test/sample_dest')
})

test('runs on test data', async t => {
  const plugin = () => {
    return files => {
      return files.map(file => Object.assign(file, {contents: 'test'}))
    }
  }

  await weh(site => {
    site.config({
      source: 'test/sample',
      destination: 'test/sample_dest'
    })
    site.use(plugin)
    return site
  })

  t.is(fs.readFileSync('test/sample_dest/test.md', 'utf-8'), 'test')
})

test('correctly runs in integration mode', async t => {
  const plugin = () => {
    return files => {
      return files.map(file => Object.assign(file, {contents: 'test2'}))
    }
  }

  const files = [
    {
      contents: 'aaa'
    }
  ]

  const res = await weh.integration(site => {
    site.use(plugin)
    return site
  }, files)

  t.is(res.files[0].contents, 'test2')
  t.true(!fs.existsSync('test/sample_dest'))
})
