var format = require('util').format
var sliced = require('sliced')
var isDom = require('is-dom')

module.exports = consoleRedirect
function consoleRedirect (stdout, stderr, replace) {
  var methods = ['error', 'info', 'log', 'warn']
  if (typeof console.debug === 'function') { 
    // only exists in browser
    methods.push('debug')
  }
  
  var nativeConsole = {}
  methods.forEach(function (k) {
    var nativeMethod = console[k]
    nativeConsole[k] = nativeMethod.bind(console)

    console[k] = function () {
      var args = sliced(arguments)
      var isError = k === 'error' || k === 'warn'
      var writable = isError ? stderr : stdout
      write(writable, args)
      if (!replace) {
        return nativeMethod.apply(this, args)
      }
    }
  })
  
  return {
    release: release
  }
  
  function release () {
    methods.forEach(function (k) {
      console[k] = nativeConsole[k]
    })
  }
}

function write (writable, args) {
  var cleanArgs = args.map(function (arg) {
    return arg && isDom(arg) ? arg.toString() : arg
  })
  var output = format.apply(null, cleanArgs)
  if (writable) {
    writable.write(output + '\n')
  }
}
