var routes = []

// Dont forget to encode user input!
// reply('Hello, ' + encodeURIComponent(request.params.name) + '!')

routes.push({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!')
  }
})

routes.push({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!')
  }
})

routes.push({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    reply.file('./public/hello.html')
  }
})

module.exports = routes
