# @elunic/debug-levels

Thin wrapper around the `visionmedia/debug` module, providing support for both:
* debug levels (fatal, error, warn, info, debug, trace)
* easy creation of child namespaces

<img width="666" src="https://raw.githubusercontent.com/elunic/debug-levels/master/examples/example.png">

The decision to write a new wrapper rather than use an existing one 
(such as `debug-level`, `debug-levels`) was made because of the requirement
for child namespaces within the `debug` "namespace" concept. Currently, to our
knowledge, no module providing both easy creation of child namespaces and debug
levels exists.


## Table of Contents

- [Installation](#installation)
- [Log levels](#log-levels)
- [Usage](#usage)
  * [Child namespaces](#child-namespaces)
  * [Global API](#global-api)
  * [Per-logger log level](#per-logger-log-level)
  * [Environment variables](#environment-variables)
- [License](#license)


## Installation

```bash
$ npm install @elunic/debug-levels
```


## Log levels

`@elunic/debug-levels` provides the `bunyan` log levels: `fatal`, `error`, `warn`, `info`, `debug`, `trace`.

A description of these levels can be found on the [`bunan` GitHub page](https://github.com/trentm/node-bunyan#levels).


## Usage

`@elunic/debug-levels`, like `debug`, exposes a function, which takes one argument: the debug namespace.

Like `debug`, this returns a function which can be used to log. In contrast to `debug`, however,
this logging function will log with the default logging level 'INFO'.

This is intended to make `@elunic/debug-levels` a progressive enhancement and drop-in
replacement for `debug`.

Additionally, the returned function object has method properties for each logging level.

Example:

```js
const logger = require('@elunic/debug-levels')('http');

logger('information about regular operation');
// INFO http information about regular operation

logger.fatal('unrecoverable error, an operator should look at this as soon as possible');
// FATAL http unrecoverable error, an operator should look at this as soon as possible

logger.error('recoverable error');
// ERROR http recoverable error

logger.warn('warning');
// WARNING http warning

logger.info('information about regular operation');
// INFO http information about regular operation

logger.debug('debug information, perhaps useful during development or troubleshooting');
// DEBUG http debug information, perhaps useful during development or troubleshooting

logger.trace('highly detailed information');
// TRACE http highly detailed information
```


### Child namespaces

Each logger exposes a `createLogger` function, which creates a child namespace.

```js
const logger = require('@elunic/debug-levels')('http');
const getLogger = logger.createLogger('get');

getLogger.info('200 /index.js');
// INFO http:get 200 /index.js
```

The same can be achieved through an initial declaration of the namespace using
the `debug` syntax:

```js
const getLogger = require('@elunic/debug-levels')('http:get');
```

However, using `logger.createLogger()` is useful if you do not want to repeat
yourself by writing out the parent namespace throughout your module.


### Global API

`@elunic/debug-levels` exposes the underlying `debug` API with two additions: `setLevel()` and `getLevel()`, used to set or get
the current global debug level. Note that this level may be overriden on a per-logger basis using `logger.setLevel()`.

For all other configuration options/APIs, consult the `debug` documentation. The API can be applied to `debuglevels.debug`
(see below).

```js
const debuglevels = require('@elunic/debug-levels');

// Output "warn" and above levels only
debuglevels.setLevel('warn');

debuglevels.getLevel();
// "warn"

// Convenience assignments
debuglevels.level = 'warn'; // set
debuglevels.level; // get

// debuglevels exposes debug's enable() and disable() methods
debuglevels.enable('http');
debuglevels.enable('http,socket.io');
debuglevels.enable('http:get');
debuglevels.enable('*');

// ... as well as the underlying debug object
debuglevels.debug.enable('http');
```


### Per-logger log level

Each logger may have its debug level set on an individual basis. This setting overrides the global debug level, so it
is possible to have a logger that logs everything on `trace` while the global level is set to `fatal`.

```js
const debuglevels = require('@elunic/debug-levels');

const logger = debuglevels('http');
const getLogger = debuglevels('http:get');

debuglevels.setLevel('fatal');
getLogger.setLevel('trace');

// Silent
logger.info('generic http info');

// Produces output
getLogger.info('get request');

// Convenience assignments
getLogger.level; // get; "trace"
getLogger.level = 'trace'; // set
```

To remove a child logger's individual log level, call it with a falsy value:

```js
getLogger.setLevel(null);
```


### Environment variables

As a wrapper around `debug`, `@elunic/debug-levels` provides all its environment variables
(see [the `debug` documentation](https://www.npmjs.com/package/debug#environment-variables)),
with one addition: `DEBUG_LEVELS`.

`DEBUG_LEVELS` can be set to either of the supported debug levels.

Example usage:
```cmd
DEBUG_LEVEL=debug DEBUG=* node index.js
```


## License

(The MIT License)

Copyright (c) 2014-2018 elunic &lt;wh@elunic.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
