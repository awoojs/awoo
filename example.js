const koe = require('./lib/koe')

const config = {
  exclude: ['aaa']
}

function middleware (site) {
  console.log(site)
}

function run () {
  const output = koe(config)
  output.use(middleware)
  return output.build()
}

run()
