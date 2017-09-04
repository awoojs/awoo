const walk = require('walk')
const path = require('path')
const debug = require('debug')('weh:read')
const isTextPath = require('is-text-path')
const vfile = require('to-vfile')

function read (source, exclude = []) {
  const filepath = path.resolve(source)

  return new Promise((resolve, reject) => {
    let result = []
    walk.walk(filepath, { filter: exclude })
      .on('file', async function (root, stat, next) {
        const fullpath = path.join(root, stat.name)
        vfile.read(fullpath, (err, file) => {
          if (err) {
            throw new Error(err)
          }
          debug('read %s', file.path)
          let resFile = file
          if (isTextPath(file.path)) {
            resFile.contents = resFile.toString()
          }
          resFile.path = path.relative(source, resFile.path)
          result.push(resFile)
          next()
        })
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

module.exports = read
