var test = require('tape')
var app = require('../app')
var portfinder = require('portfinder')
var server = http.createServer(app)

test('start server', function(t) {
   portfinder.getPort(function (err, port) {
    t.error(err, 'port found without error')
    app.set('port', port)
    app.listen(port, function(err))
   }
})
