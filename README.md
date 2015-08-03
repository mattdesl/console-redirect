# console-redirect

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Redirects console methods to the given writable streams. For example, can be used to redirect browser `console` to `process.stdout` and `process.stderr`. 

## Install

```sh
npm install console-redirect --save
```

## Example

```js
var redirect = require('console-redirect')

// redirect browser's console.log and console.error
// to the process stdout and stderr, respectively
redirect(process.stdout, process.stderr)
```

The following entry point registers the above, hooking into `process` stdout and stderr:

```js
require('console-redirect/process')
```

## Usage

[![NPM](https://nodei.co/npm/console-redirect.png)](https://www.npmjs.com/package/console-redirect)

#### `log = redirect([stdout], [stderr], [replace])`

Directs `console` methods to the given `stdout` and `stderr` writable streams (which can be null). 

The `warn` and `error` methods are directed to `stderr`, the rest to `stdout`. 

If `replace` is true (default false), it will not trigger the original method. In the context of a browser, this means it will not print to the terminal.

Return an object with the function `release`, which can be used to reset the console log methods to their original.

```js
var redirect = require('console-redirect')

// listen for stdout
// ignore stderr
// do not write native methods
var logger = redirect(process.stdout, null, true)

// ... some time later, release it
logger.release()
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/console-redirect/blob/master/LICENSE.md) for details.
