const vfile = require('to-vfile')
const debug = require('debug')('weh:write')
const mkdirp = require('mkdirp')
const path = require('path')

async function write (site) {
  await Promise.all(site.files.map(file => {
    return writeOne(file, site._config.destination)
  }))
  return site
}

async function writeOne (file, dest) {
  file.path = path.resolve(dest, file.path)
  mkdirp(file.dirname, (err, _) => {
    if (err) {
      debug('an error occured while creating directories:')
      throw new Error(err)
    }

    vfile.write(file, (err, res) => {
      if (err) {
        debug('an error occured while writing:')
        throw new Error(err)
      }
      debug('wrote %s', file.path)
      return file
    })
  })
}

module.exports = write
