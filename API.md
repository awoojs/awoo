## weh API

### site = weh(config, opts)

Initialize a new `weh` app. Takes a [config](#config) object that is going to be
merged with the defaults. Don't worry, it'll still ignore `node_modules` even if
you didn't specify it.

`opts` is an object that takes the following keys:

- `verbose` (Boolean, default false): whether to log debug operations
  (file reads/writes, hooks)
- `silent` (Boolean, default false): whether to log anything at all

### site.use(hook)

Registers a piece of middleware in the `pre_write` hook (the one you'd want to
put most middleware into). More info on hook middleware can be found
[here](#middleware).

### site.hook(name, hook)

Registers a custom hook. This works exactly the same as `site.use`
(`site.use` actually uses `site.hook` internally), but allows you to hook into
any part of the build process. `name` can be any of the following:

```
pre_read
post_read
pre_write (aliased to site.use)
post_write
```

### site.build() -> Promise

Runs through the build process, calling all hooks. Returns a promise with the
finished site object as its parameter.

### Middleware

Middleware is just a function that takes the entire site object. Yeah, the whole
thing. It basically consists of this:

- __site.config__: The site [configuration](#config).
- __site.files__: This is the good part. This is the gigantic object that
  contains all the files `weh` has read during the first part. It looks a little
  bit like this:

```js
{
  'file.md': {
    path: '/Users/username/myproject/file.md',
    contents: <Buffer ...>,
    stats: [Object]
  },
  'directory/another_file.js': {
    path: '/Users/username/myproject/directory/another_file.js',
    contents: <Buffer ...>,
    stats: [Object]
  }
}
```

And that's really it. You can do whatever you want with the object, it'll
magically get carried over to the rest of the middleware. You don't even need
to return anything! ~JS magic~

So, to recap, your middleware function might look a little like this:

```js
function my_middleware (site) {
  site.my_custom_stuff = process_some_things(site.files)
  // that's it? yep
}
```

### Config

Configuration is done using a simple config object that takes the following
values:

- __source__: The source directory where files are being read from. The default
  is the directory you're running `weh` from.
- __destination__: The directory `weh` will compile files into. The default is
  the directory you're in + `_site` (just like Jekyll!)
- __exclude__: Files and directories to exclude while reading. The default is:

```
node_modules/
package.json
bower_components/
coverage/
```

If you have any suggestions on what should be excluded by default, please open
an issue!
