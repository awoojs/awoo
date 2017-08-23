const vfile = require('to-vfile')
const debug = require('debug')('weh:write')
const mkdirp = require('mkdirp')
const path = require('path')

async function write (site) {
  for (let i = 0; i < site.files.length; i++) {
    const file = site.files[i]
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
        debug('wrote %s', file.path)
      })
    })
  }

  return site
}

module.exports = write
