const writeFile = require('write-file-promise')
const path = require('path')

async function write (site) {
  for (let i = 0; i < site.files.length; i++) {
    const file = site.files[i]
    const destPath = path.resolve(site.config.destination, file.path)

    try {
      await writeFile(destPath, file.contents)
    } catch (err) {
      site.logger.error('uh oh! an error occured while writing:')
      throw err
    }
    site.logger.debug(`wrote ${destPath}`)
  }

  return site
}

module.exports = write
