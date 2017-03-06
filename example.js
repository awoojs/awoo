const koe = require('./lib/koe')

const config = {
  title: 'this is a cool title'
}

async function run () {
  const output = await koe(config)
  output.use(site => site.title = 'haha! i hereby overwrite your title')
  return output.build()
}

run().then(post => {
  console.log(post)
})
