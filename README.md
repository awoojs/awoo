<h1 align="center">koe</h1>

<div align="center">
  a general, lightweight framework for parsing loads of files
</div>
<div align="center">
  <i>by extension, a static site generator</i>
</div>

<br />

<div align="center">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
</a>
  <!-- travis ci -->
  <a href="https://travis-ci.org/koe/koe">
    <img src="https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square"
      alt="test coverage" />
  </a>
  <!-- npm version -->
  <a href="https://npmjs.org/package/koe">
    <img src="https://img.shields.io/npm/v/koe.svg?style=flat-square"
      alt="npm version" />
  </a>
  <!-- code style -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-blue.svg?style=flat-square"
      alt="code style: standard" />
  </a>
</div>

## Features

- __extremely simple__: the API exposes 3 functions!
- __easy to understand__: only ~170 SLOC!
- __very modern__: works very well with async functions (node 7.6+)
- __extendable as h*ck__: provides hooking mechanisms to serve your every need
- __fun__: by which I mean to say, Promises are fun. async functions are fun.
  funnnnnn

## Example

Let's write a simple program that changes the content of all files in a
directory to "hey, what's up":

```js
const koe = require('koe')

// specify the source directory
const config = {
  source: 'example_dir'
}

// the middleware that's going to run
function middleware (site) {
  for (let file in site.files) {
    site.files[file].contents = Buffer.from('hey, what\'s up')
  }
}

// our main execution function
async function main () {
  const site = koe(config)
  site.use(middleware)

  return site.build()
}

main().then(final_site => {
  // do some more stuff, maybe?
}).catch(err => {
  throw new Error(err)
})
```

Let's save this as `example.js`. To run it, you need Node.js version 7.6 or
higher. The latest stable version will work.

```sh
node example.js
```

`koe` outputs logs in _JSON formatting_ by default. If you want nice and cute
logs, I recommend using [pino-colada](http://npm.im/pino-colada):

```sh
yarn global add pino-colada
# or
npm i -g pino-colada

# pipe the script output into pino-colada
node example.js | pino-colada
```

## How does it work?

It's fairly simple! What `koe` does can be split up into two things:

- First, it reads a directory and saves all of the information about each file
  into a gigantic object. That object can be manipulated by _middleware_, which
  makes `koe` actually do things.
- After most middleware is run, `koe` writes the files as they are described
  in the gigantic object to disk.

It's that simple! Static site generators aren't rocket science or whatever.
If you got confused by looking at the Jekyll source code once, that's because
Jekyll is more fully fledged than `koe` is, that is, it provides some defaults.

But static site generators, at their core, are just programs that take a set of
files, do something to them, and then output those files. That's it. The rest is just _transformations_ on those files.

`koe`'s goal is to reduce that essence to its very base, and to give you a
bunch of building blocks with which you can make your ideal site, using only
the stuff you need!

## API Documentation

See [API.md](https://github.com/koe/koe/blob/master/API.md).

## How does it compare?

This section is a little bit about how `koe` compares to other static site
generators (even though it isn't really that):

- __jekyll__: Jekyll is a whole lot different. First off, it provides a whole
  lot of defaults (such as YAML Front-Matter, the Liquid language, etc) to
  help you build your static site extremely quickly. It's also massively
  geared for security, since it runs on GitHub's Pages platform. Stuff like
  custom plugins isn't even available there (not like that's a bad thing!).
- __ghost__: Ghost is just straight up a blogging platform. I don't even know
  why it's on AlternativeTo.
- __hugo__: Hugo, a bit like Jekyll, has predefined concepts like "pages" and
  "tags". It's also way more stable and faster than `koe`. Why am I still writing this?
- __metalsmith__: Metalsmith is probably the thing that's most like `koe`, and
  as a matter of fact, its main inspiration. It's also plugin-based, and works
  with roughly the same concepts. The major difference is that `koe` is more
  up-to-date (I like promises a lot) and that the API is fairly different.
  Also, it's just not really an active project with an active ecosystem
  anymore (sadly!).
- __koa__: `koe` is NOT koa please stop sending me e-mails about this

## What does the name mean?

Koe, or, in its german spelling, Kö (= Königsallee), is one of the busiest
luxury shopping streets in Germany, located in the city of Düsseldorf
(which is where I live what a surprise haha). Also, it was free on npm.

## What dependencies does it have?

- [`deepmerge`](http://npm.im/deepmerge) - used to merge the user-defined
  config into the predefined config object
- [`walk`](http://npm.im/walk) - walks through directories
- [`ware`](http://npm.im/ware) - handles middleware chains
- [`write-file-promise`](http://npm.im/write-file-promise) and
  [`fs-readfile-promise`](http://npm.im/fs-readfile-promise) - promise-based
  versions of the standard `fs` methods
- [`pino`](http://npm.im/pino) - used for logging

If you have any ideas as to how to eliminate a dependency, you're more than
welcome to pitch it here!

## License

MIT (see LICENSE document)
