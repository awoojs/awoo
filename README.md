<h1 align="center">
  <img src="logo.gif" width="150" alt="awoo logo" />
</h1>

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
    <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square"
      alt="API stability" />
  </a>

  <!-- travis ci -->
  <a href="https://travis-ci.org/awoojs/awoo">
    <img src="https://img.shields.io/travis/awoojs/awoo.svg?style=flat-square"
      alt="test status" />
  </a>

  <!-- npm version -->
  <a href="https://npmjs.org/package/awoo">
    <img src="https://img.shields.io/npm/v/awoo.svg?style=flat-square"
      alt="npm version" />
  </a>

  <!-- package size -->
  <a href="https://packagephobia.now.sh/result?p=awoo">
    <img src="https://packagephobia.now.sh/badge?p=awoo"
      alt="package size" />
  </a>
</div>
<br />

**Table of Contents**

- [Installation](#installation)
- [Example](#example)
- [How does it work?](#how-does-it-work)
- [API Documentation](#api-documentation)
- [Plugins](#plugins)
- [Development Setup](#development-setup)
- [How does it compare?](#how-does-it-compare)
- [What dependencies does it have?](#what-dependencies-does-it-have)
- [License](#license)

## Features

- __extremely simple__: the API exposes _one function_!
- __easy to understand__: only ~180 SLOC!
- __very modern__: works very well with async functions (node 7.6+)
- __fast as lightning__: because it's so simple, it takes almost no time to build a site!

## Installation

You need Node.js __7.6__ or higher.

```sh
npm install --save awoo
```

## Example

Let's write a simple program that changes the content of all files in a
directory to "hey, what's up":

```js
const awoo = require('awoo')

// this is the simplest plugin you can build!
// conveniently, plugins are just normal functions
const plugin = () => {
  // replace all file contents with the string
  return files => files.map(file => {
    file.contents = `hey, what's up`
    return file
  })
}

// enter our main function:
// the main function should be an async function so that
// it automatically returns a promise
awoo(async site => {
  // we register our plugin...
  site.use(plugin)
  // ...and initiate the build process
  return site
})
```

Let's save this as `example.js`. To run it, you need Node.js version 7.6 or
higher. The latest stable version will work.

```sh
node example.js
```

`awoo` doesn't output logs by default. If you want logs
(for example, for debugging), you can set the `DEBUG` environment variable to:

```sh
awoo # for base logs
awoo:read # for specific read logs
awoo:write # for specific write logs

# you can also combine any of the three
awoo,awoo:read
```

To get all logs at once, you can just set the variable to `awoo*`.

```bash
DEBUG=awoo* node my_script # full logging!
```

`awoo` plugins may implement logging with different `DEBUG` names.

## How does it work?

It's fairly simple! What `awoo` does can be split up into two things:

- First, it reads a directory and saves all of the information about each file
  into a gigantic array. That object can be manipulated by _plugins_, which
  makes `awoo` actually do things.
- After most plugins are run, `awoo` writes the files as they are described
  in the gigantic array to disk.

It's that simple! Static site generators aren't rocket science or whatever.
If you got confused by looking at the Jekyll source code once, that's because
Jekyll is more fully fledged than `awoo` is, that is, it provides some defaults.

But static site generators, at their core, are just programs that take a set of
files, do something to them, and then output those files. That's it. The rest is just _transformations_ on those files.

`awoo`'s goal is to reduce that essence to its very base, and to give you a
bunch of building blocks with which you can make your ideal site, using only
the stuff you need!

## API Documentation

The [docs](https://awoo.js.org/docs) are published on our website.

## Plugins

Official plugins are kept at [awoojs/core](http://github.com/awoojs/core)!

Since it's really easy to write `awoo` plugins, anyone can make and publish one!
If you make a plugin, you should add a GitHub topic `awoo` and probably also
add `awoo` as a keyword in your `package.json`.

[Here's a list of all awoo plugins on GitHub](https://github.com/search?utf8=%E2%9C%93&q=topic%3Aawoo&type=)

## Development

To work on this repository, clone it and install the npm dependencies:

```sh
git clone https://github.com/awoojs/awoo.git
cd awoo
npm install
```

There are a couple of npm scripts provided for convenience:

- `npm test` - runs linters and ava in ci mode
- `npm run lint` - runs linters
- `npm run ava` - only runs ava once
- `npm run ava:ci` - runs ava in ci mode (generates coverage data)
- `npm run ava:watch` - runs ava in watch mode
- `npm run coverage` - generates coverage data
- `npm run update-coc` - pulls the latest `weallbehave` code of conduct
- `npm run deploy` - publishes npm package using `np`

## How does it compare?

This section is a little bit about how `awoo` compares to other static site
generators (even though it isn't really that):

- __jekyll__: Jekyll is a whole lot different. First off, it provides a whole
  lot of defaults (such as YAML Front-Matter, the Liquid language, etc) to
  help you build your static site extremely quickly. It's also massively
  geared for security, since it runs on GitHub's Pages platform. Stuff like
  custom plugins isn't even available there (not like that's a bad thing!).
- __hugo__: Hugo, a bit like Jekyll, has predefined concepts like "pages" and
  "tags".
- __metalsmith__: Metalsmith is probably the thing that's most like `awoo`, and
  as a matter of fact, its main inspiration. It's also plugin-based, and works
  with roughly the same concepts. The major difference is that `awoo` is more
  up-to-date (I like promises a lot) and that the API is fairly different.
  Also, it's just not really an active project with an active ecosystem
  anymore (sadly!).

## What dependencies does it have?

- [`deepmerge`](http://npm.im/deepmerge) - used to handle configuration management
- [`walk`](http://npm.im/walk) - walks through directories to read them
- [`trough`](http://npm.im/trough) - handles middleware chains
- [`debug`](http://npm.im/debug) - used for logging
- [`to-vfile`](http://npm.im/to-vfile) - converts to `vfile`, the virtual file format used by `awoo`
- [`mkdirp`](http://npm.im/mkdirp) - creates directories when writing to disk
- [`is-text-path`](http://npm.im/is-text-path) - provides logic to correctly read binary files

If you have any ideas as to how to eliminate a dependency, you're more than
welcome to pitch it in a new issue!

## Maintainers

- Olivia Hugger <[olivia@fastmail.com](mailto:olivia@fastmail.com)>

## Code of Conduct

This repository operates under the [`weallbehave`](https://github.com/wealljs/weallbehave) Code of Conduct. Its contents can be found in [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## License

GNU AGPLv3 (see LICENSE document)
