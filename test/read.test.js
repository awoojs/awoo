const test = require('ava')
const { spy } = require('sinon')
const path = require('path')
const read = require('../lib/read')

test('reads files correctly', async t => {
  const config = {
    source: 'test/sample',
    exclude: []
  }
  const args = {
    config,
    logger: {
      debug: spy()
    }
  }
  const res = await read(args)
  const expectedPath = path.join(__dirname, 'sample/test.md')

  const file = res.find(f => f.path === 'test.md')
  t.true(file.absolutePath === expectedPath)
  t.true(args.logger.debug.callCount === 2)
})

test('throws on nonexistent path', async t => {
  const config = {
    source: 'test/fakepath'
  }
  const args = {
    config,
    logger: {
      debug: spy()
    }
  }

  try {
    await read(args)
  } catch (err) {
    t.truthy(err[0])
    t.is(err[0].code, 'ENOENT')
    t.is(args.logger.debug.callCount, 0)
  }
})
