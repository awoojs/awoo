const writeFile = require('write-file-promise')
const path = require('path')

async function write (site) {
  for (let filepath in site.files) {
    const file = site.files[filepath]
    const destPath = path.resolve(site.config.destination, filepath)

    if (!Buffer.isBuffer(file.contents)) {
      file.contents = Buffer.from(file.contents)
    }

    await writeFile(destPath, file.contents)
    site.logger.debug('wrote %s', destPath)
  }

  return site
}

module.exports = write
