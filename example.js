const koe = require('./index')
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
  site.files['test.md'].contents = 'hey test'
}

// the main execution thread. should return a promise
async function run () {
  const site = koe(config, { verbose: true })
  site.use(middleware)

  return site.build()
}

// execute the build process and log results
run().then(res => {
  console.log(res.files)
}).catch(err => {
  // optionally, log errors
  throw new Error(err)
})
