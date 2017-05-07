const weh = require('../index')

const plugin = ({ value = 'hi' }) => {
  return ['pre_write', files => {
    return files.map(file => Object.assign(file, { contents: value }))
  }]
}

weh(async site => {
  site.use(plugin)
}).then(() => {
  console.log('done!')
})
