var alloc = require('tcp-bind')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  alias: { p: 'port', u: 'uid', g: 'gid' },
  default: { port: require('is-root')() ? 80 : 8000 }
})
var fd = alloc(argv.port)
if (argv.gid) process.setgid(argv.gid)
if (argv.uid) process.setuid(argv.uid)

var http = require('http')
var st = require('st')
var body = require('body/any')
var xtend = require('xtend')
var trumpet = require('trumpet')
var through = require('through2')
var encode = require('he').encode
var fs = require('fs')
var path = require('path')
var HttpHashRouter = require('http-hash-router')
var methods = require('http-methods')
var path = require('path')
var favicon = require('serve-favicon')

var router = HttpHashRouter()

var static = path.join(__dirname, 'static')

router.set('/static/*', st({
  path: static,
  url: '/static'
}))

router.set('/favicon.ico', function serverFavicon(req, res, opts, cb) {
  var iconPath = path.join(static, 'favicon.ico')
  favicon(iconPath)(req, res, cb)
})

var server = http.createServer(function (req, res) {
  router(req, res, xtend({}, {beep: 'boop'}), onError)

  function onError (err) {
    if (err) {
      res.statusCode = err.statusCode || 500
      res.end(err.message)
    }
  }
})

server.listen({ fd: fd }, function () {
  console.log('listening on :' + server.address().port)
})
