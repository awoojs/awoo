const weh = require('./index2')

const plugin = ({ value = 'hi' }) => {
  return ['pre_write', files => {
    return files.map(file => Object.assign(file, { contents: value }))
  }]
}

weh(async site => {
  site.config({ source: '_test' })
  site.use(plugin)
  return site
}).then(cool => {
  console.log(cool.files)
})
