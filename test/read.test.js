import test from 'ava'
import path from 'path'
import read from '../lib/read'

test('reads files correctly', async t => {
  const config = {
    source: 'test/sample'
  }
  const res = await read(config)
  const expectedPath = path.join(__dirname, 'sample/test.md')

  t.true(res[expectedPath].path === 'test.md')
})

test('throws on nonexistent path', async t => {
  const config = {
    source: 'test/fakepath'
  }

  try {
    await read(config)
  } catch (err) {
    t.truthy(err[0])
    t.is(err[0].code, 'ENOENT')
  }
})
