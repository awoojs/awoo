const weh = require('./index2')

const plugin = ({ value = 'hi' }) => {
  return ['pre_write', files => {
    return files.map(file => Object.assign(file, { contents: value }))
  }]
}

const hook = files => files.map(file => Object.assign(file, { contents: value }))

weh(async site => {
  site.config({ source: '_test' })
  site.hook('pre_read', hook)
  return site
}).then(cool => {
  console.log(cool)
})
