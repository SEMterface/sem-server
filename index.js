var Hapi = require('hapi')

var Inert = require('inert')
var Good = {
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}

var routes = require('./routes')
var plugins = [Good, Inert]

var server = new Hapi.Server()

var config = {
  host: 'localhost',
  port: 3000
}

server.connection(config)

server.register(plugins, function (err) {
  if (err) {
    throw err // something bad happened loading the plugin
  }

  routes.forEach(handleRoutes)
  server.start(onStart)
})

function handleRoutes (route) {
  server.route(route)
}

function onStart () {
  server.log('info', 'Server running at: ' + server.info.uri)
}

module.exports = server
