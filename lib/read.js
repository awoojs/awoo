const walk = require('walk')
const path = require('path')
const excluded = require('excluded')
const isTextPath = require('is-text-path')
const readFile = require('fs-readfile-promise')

function read ({ config, logger }) {
  const filepath = path.resolve(config.source)

  return new Promise((resolve, reject) => {
    let result = []
    walk.walk(filepath)
      .on('file', async function (root, stat, next) {
        const fullPath = path.join(root, stat.name)
        const relativePath = path.relative(config.source, fullPath)
        if (!excluded(relativePath, config.exclude)) {
          const data = await dataTransformer(relativePath, fullPath, stat)
          result.push(data)
          logger.debug('read %s', fullPath)
        }
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

async function dataTransformer (relpath, abspath, stats) {
  const contents = await readOneFile(abspath)
  const isText = isTextPath(abspath)
  return {
    path: relpath,
    absolutePath: abspath,
    contents: isText ? contents.toString() : contents,
    stats
  }
}

function readOneFile (path) {
  return readFile(path)
}

module.exports = read
