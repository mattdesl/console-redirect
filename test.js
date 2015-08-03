var redirect = require('./')
var test = require('tape')
var through = require('through2')

test('redirect console methods to streams', function(t) {
  t.plan(2)
  var logger = redirect(through(function (body) {
    t.equal(body.toString(), 'hello world!\n')
  }), through(function (body) {
    t.equal(body.toString(), 'foo bar\n')
    logger.release()
  }), true)
  console.log('hello world!')
  console.error('foo bar')  
})

test('allow empty streams', function(t) {
  t.plan(1)
  var logger = redirect(through(function (body) {
    t.equal(body.toString(), 'hello world!\n')
    logger.release()
  }), null, true)
  console.log('hello world!')
  console.error('foo bar')  
})