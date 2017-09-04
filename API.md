## weh API

### weh(function (site))

Builds a site. This function takes another function that describes how the site
is built. Basically, it looks like this:

```js
weh(async site => {
  // your site definition here
  return site
})
```

This function takes a `site` parameter. This parameter is responsible for
configuring your entire site, and all of its methods are documented below.

This function needs to return `site`, wrapped in a promise. Thankfully,
making it return a promise is as easy as using the `async` keyword
(see the above example).

### weh.integration(function (site), files)

Basically the same as `weh()`, but sets `dry_run` to true and accepts an array
of files to set as `config.files`, in order to override the read process.
Used in integration tests for plugins.

### site.config(conf)

Configures your site with either a specified config object or the default config.
You don't _need_ to call this function in your build process - if you omit it,
`weh` will use the [default config] instead, though you'd probably want to
adjust your source and destination paths.

### site.use(plugin, [options])

Registers a plugin to be used in the build process. See [plugin structure] for
more information on how to write plugins.

The `options` argument is optional and can be used to pass plugin-specific
options. It should be an object, although that is up to each plugin to
decide.

### Default Configuration

This is an exhaustive list of all `weh` config options:

- __source__: The source directory where files are being read from. The default
  is the directory you're running `weh` from.
- __destination__: The directory `weh` will place built files into. The default
  is the directory you're in + `_site` (just like Jekyll!)
- __no_read__: Whether to skip reading. This should be coupled with using `config.files`.
- __no_write__: Whether to skip writing completely. This is useful if you want to run
  automated tests without writing to disk. Default is `false`.
- __files__: An array that will override `site.files` when `dry_run` is also set to true.
- __exclude__: Files and directories to exclude when reading. The default is:

```
node_modules/
package.json
bower_components/
coverage/
```

If you have any suggestions on what should be excluded by default, please open
an issue!

## Plugin Structure

The plugin itself is a function. It can take an optional `options`
parameter, which the user can pass through in the `site.use` call:

```js
const plugin = (opts = {}) => {
  // do something cool
}
```

It's best to set this to `{}` as a default to prevent unwanted errors, even
if your plugin isn't taking any options.

The function receives one parameter, namely the `files` parameter. This is a big
array that contains all of the data collectible from the source fileset. The files
are stores as [`vfile`](vfile)s, which is a virtual file format used to easily
serialize and deserialize files to and from the disk, and also through middleware.

Thankfully, `vfiles`s are just normal objects (with a bit of sugar on top), which
means you can easily modify every aspect of the file. A couple of important attributes
that every `vfile` has:

- `contents`
- `path` (this is a path relative to the source directory, e.g. `test.md`)
- `extname` (the name of the file extension)
- `dirname` (the name of the parent directory)
- `data` (this is where you store custom data related to the file)

If `weh` stumbles upon a binary file, it is kept in a buffer structure, because
converting it to a string would effectively break the file. You can filter
binary files from your fileset like this:

```js
const onlyTextFiles = files.filter(file => typeof file.contents === 'string')
```

And that's it! You can modify all of the parts you want, just be sure to return
the (modified) `files` object at the end.

So, to recap, your plugin might look a little like this:

```js
const plugin = opts => {
  return files => files.map(file => {
    file.contents = opts | 'test'
    return file
  })
}

// ...omit weh initialization
site.use(plugin, `haha i\'ve replaced your file!`)
// ...omit other weh stuff
```

Of course, you can put this into a npm module and publish it for the world to
see! I advise that you add the `weh` tag to your package so that it remains
discoverable.

[default config]: #default-configuration
[plugin structure]: #plugin-structure
[fs-stats]: https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_class_fs_stats
[vfile]: https://github.com/vfile/vfile
