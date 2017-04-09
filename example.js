const weh = require('./index')
const path = require('path')

// define a sample config that overrides/extends some default keys
const config = {
  source: 'test/sample',
  destination: path.join(__dirname, 'dest'),
  exclude: [
    'npm-debug.log',
    'yarn.lock'
  ]
}

// define a sample middleware
function middleware (site) {
  site.files['test.md'].contents = site.config.test.replacer
}

const plugin = {
  configName: 'test',
  pre_write: middleware
}

// the main execution thread. should return a promise
async function run () {
  const site = weh(config, { verbose: true })
  site.plugin(plugin, { replacer: 'hey' })

  return site.build()
}

// execute the build process and log results
run().then(res => {
  // console.log(res.files)
}).catch(err => {
  // optionally, log errors
  throw new Error(err)
})
