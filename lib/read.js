const walk = require('walk')
const path = require('path')
const readFile = require('fs-readfile-promise')

function read (config) {
  const filepath = path.resolve(config.source)

  return new Promise((resolve, reject) => {
    let result = {}
    walk.walk(filepath)
      .on('file', async function (root, stat, next) {
        const fullPath = path.join(root, stat.name)
        const data = await dataTransformer(config.source, fullPath, stat)
        result[fullPath] = data
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

async function dataTransformer (source, filepath, stats) {
  const contents = await readOneFile(filepath)
  return {
    path: path.relative(source, filepath),
    contents,
    stats
  }
}

function readOneFile (path) {
  return readFile(path)
}

module.exports = read
