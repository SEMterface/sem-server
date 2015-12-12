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
// var body = require('body/any')
var assign = Object.assign
var trumpet = require('trumpet')
// var through = require('through2')
var fs = require('fs')
var path = require('path')
// var encode = encodeURIComponent
// var methods = require('http-methods')
var HttpHashRouter = require('http-hash-router')
var favicon = require('serve-favicon')
var finalhandler = require('finalhandler')
var logger = require('morgan')
var series = require('run-series')
var router = HttpHashRouter()

var React = require('react')
var createStore = require('redux').createStore
var Provider = require('react-redux').Provider
var renderToString = require('react-dom/server').renderToString
var semterface = require('semterface')
var reducer = semterface.reducer
var container = semterface.container

var staticPath = path.join(__dirname, 'static')
var iconPath = path.join(staticPath, 'favicon.ico')


router.set('/static/*', st({ path: staticPath, url: '/static' }))

function layout (res) {
  res.setHeader('content-type', 'text/html')
  var tr = trumpet()
  read('layout.html').pipe(tr).pipe(res)
  return tr.createWriteStream('#body')
}

function read (file) {
  return fs.createReadStream(path.join(staticPath, file))
}

router.set('/', )

function handleRender(req, res, opts, cb) {
  var store = createStore
}

var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res)

  series([
    (cb) => logger('dev')(req, res, cb),
    (cb) => favicon(iconPath)(req, res, cb),
    (cb) => router(req, res, assign({}, {beep: 'boop'}), cb)
  ], done)
})

server.listen({ fd: fd }, function () {
  console.log('listening on :' + server.address().port)
})
