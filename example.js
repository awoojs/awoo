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

// the main execution thread. should return a promise
async function run () {
  const site = koe(config)
  site.use(middleware)
  return site.build()
}

// execute the build process and log results
run().then(res => {
  console.log(res)
}).catch(err => {
  // optionally, log errors
})
