const koe = require('koe')
const path = require('path')

// define a sample config that overrides/extends some default keys
const config = {
  destination: path.join(__dirname, 'dest'),
  exclude: [
    'npm-debug.log',
    'yarn.lock'
  ]
}

// define a sample middleware
function middleware (site) {
  site.log('hey!')
  site.foo = 'bar'
}

// you can also hook into specific parts of the build process
function preconfigHook (site) {
  site.config.destination = path.join(__dirname, 'dest2')
}

// the main execution thread. should return a promise
async function run () {
  const site = koe(config)
  site.use(middleware)

  // use the pre_config hook
  site.hook('pre_config', preconfigHook)

  return site.build()
}

// execute the build process and log results
run().then(res => {
  console.log(res)
}).catch(err => {
  // optionally, log errors
  throw new Error(err)
})
