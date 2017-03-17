const writeFile = require('write-file-promise')
const path = require('path')

async function write (site) {
  for (let filepath in site.files) {
    const file = site.files[filepath]
    const destPath = path.join(site.config.destination, file.path)

    await writeFile(destPath, file.contents)
  }

  return site
}

module.exports = write
