const test = require('ava')
const rimraf = require('rimraf')
const fs = require('fs')
const write = require('../lib/write')

test.after.always(t => {
  rimraf.sync('test/sample_dest')
})

test.serial('writes regular files', async t => {
  const site = {
    _config: { destination: 'test/sample_dest' },
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

test.serial('writes multiple files', async t => {
  const site = {
    _config: { destination: 'test/sample_dest' },
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

test.serial('writes binary files', async t => {
  const site = {
    _config: { destination: 'test/sample_dest' },
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
