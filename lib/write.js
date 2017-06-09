const writeFile = require('write-file-promise')
const debug = require('debug')('weh:write')
const path = require('path')

async function write (site) {
  for (let i = 0; i < site.files.length; i++) {
    const file = site.files[i]
    const destPath = path.resolve(site.config.destination, file.path)

    try {
      await writeFile(destPath, file.contents)
    } catch (err) {
      debug('an error occured while writing:')
      throw err
    }
    debug('wrote %s', destPath)
  }

  return site
}

module.exports = write
