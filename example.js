const koe = require('./lib/koe')

const config = {
  exclude: ['aaa']
}

function middleware (site) {
  console.log(site)
  site.test = 'a'
}

async function run () {
  const site = await koe().configure(config)
  site.use(middleware)
  return site.build()
}

run().then(res => {
  console.log(res.test)
})
