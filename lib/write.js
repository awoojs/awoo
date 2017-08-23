const vfile = require('to-vfile')
const debug = require('debug')('weh:write')
const mkdirp = require('mkdirp')
const path = require('path')

async function write (site) {
  await Promise.all(site.files.map(file => {
    return writeOne(file, site)
  }))
  return site
}

async function writeOne (file, site) {
  file.path = path.resolve(site._config.destination, file.path)
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
      debug('write %s', file.path)
      return file
    })
  })
}

module.exports = write
