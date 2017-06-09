const test = require('ava')
const path = require('path')
const read = require('../lib/read')

test('reads files correctly', async t => {
  const config = {
    source: 'test/sample',
    exclude: []
  }
  const args = {
    config
  }
  const res = await read(args)
  const expectedPath = path.join(__dirname, 'sample/test.md')

  const file = res.find(f => f.path === 'test.md')
  t.true(file.absolutePath === expectedPath)
  t.true(file.contents.trim() === 'Hello!')
})

test('reads binary files as buffers', async t => {
  const config = {
    source: 'test/sample',
    exclude: []
  }
  const args = {
    config
  }
  const res = await read(args)
  const file = res.find(f => f.path === 'picture.png')
  t.true(Buffer.isBuffer(file.contents))
  t.true(Buffer.byteLength(file.contents) === 1119)
})

test('throws on nonexistent path', async t => {
  const config = {
    source: 'test/fakepath'
  }
  const args = {
    config
  }

  try {
    await read(args)
  } catch (err) {
    t.truthy(err[0])
    t.is(err[0].code, 'ENOENT')
  }
})
