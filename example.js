const koe = require('koe')

const config = {
  root: '.'
}

async function run () {
  const site = await koe(config)
  return site.build()
}

run().then(post => {
  console.log(`compiled in ${post.time} seconds!`)
})
