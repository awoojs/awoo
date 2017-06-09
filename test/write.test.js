const test = require('ava')
const { spy } = require('sinon')
const rimraf = require('rimraf')
const fs = require('fs')
const write = require('../lib/write')

test.after.always(t => {
  rimraf.sync('test/sample_dest')
})

test('writes regular files', async t => {
  const site = {
    config: { destination: 'test/sample_dest' },
    files: [
      {
        path: 'test.md',
        contents: 'aaaa'
      }
    ]
  }

  await write(site)
  t.true(fs.readFileSync('test/sample_dest/test.md', 'utf-8') === 'aaaa')
})

test('writes multiple files', async t => {
  const site = {
    config: { destination: 'test/sample_dest' },
    files: [
      {
        path: 'test.md',
        contents: 'aaaa'
      },
      {
        path: 'test-two.txt',
        contents: 'text'
      }
    ]
  }

  await write(site)
  t.true(fs.readFileSync('test/sample_dest/test.md', 'utf-8') === 'aaaa')
  t.true(fs.readFileSync('test/sample_dest/test-two.txt', 'utf-8') === 'text')
})

test('writes binary files', async t => {
  const site = {
    config: { destination: 'test/sample_dest' },
    files: [
      {
        path: 'binary',
        contents: Buffer.from([0x11, 0x20b0])
      }
    ]
  }

  await write(site)
  t.true(Buffer.byteLength(fs.readFileSync('test/sample_dest/binary')) === 2)
})
