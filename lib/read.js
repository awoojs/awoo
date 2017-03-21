const walk = require('walk')
const path = require('path')
const readFile = require('fs-readfile-promise')

function read ({ config, logger }) {
  const filepath = path.resolve(config.source)

  return new Promise((resolve, reject) => {
    let result = {}
    walk.walk(filepath)
      .on('file', async function (root, stat, next) {
        const fullPath = path.join(root, stat.name)
        const relativePath = path.relative(config.source, fullPath)
        const data = await dataTransformer(fullPath, stat)
        result[relativePath] = data
        logger.debug('read %s', fullPath)
        next()
      })
      .on('end', () => {
        resolve(result)
      })
      .on('errors', (root, statsArr, next) => {
        const errors = statsArr.map(stat => stat.error)
        reject(errors)
      })
  })
}

async function dataTransformer (filepath, stats) {
  const contents = await readOneFile(filepath)
  return {
    path: filepath,
    contents,
    stats
  }
}

function readOneFile (path) {
  return readFile(path)
}

module.exports = read
