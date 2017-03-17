const walk = require('walk')
const path = require('path')
const read = require('fs-readfile-promise')

function walkDir (config) {
  const filepath = path.resolve(config.source)

  return new Promise((resolve, reject) => {
    let result = {}
    walk.walk(filepath)
      .on('file', async function (root, stat, next) {
        const fullPath = path.join(root, stat.name)
        const data = await dataTransformer(fullPath, stat)
        result[data.path] = data
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

async function dataTransformer (path, stats) {
  const contents = await readFile(path)
  return {
    path,
    contents,
    stats
  }
}

function readFile (path) {
  return read(path)
}

module.exports = {
  walkDir
}
