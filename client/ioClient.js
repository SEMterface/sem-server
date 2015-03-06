var io = require('socket.io-client')
var $ = require('jquery')

function divEscapedContentElement (message) {
  return $('<div></div>').text(message)
}

function divSystemContentElement (message) {
  return $('<div></div>').html('<i>' + message + '</i>')
}

var socket = io()

socket.on('connect', function (data) {
  $('#messages').append(divSystemContentElement('Connected'))
})

socket.on('connect_timeout', function (data) {
  console.log('con_timeout')
  console.log(data)
  $('#messages').append(divSystemContentElement(data))
})

socket.on('reconnect', function (data) {
  console.log('reconnect')
  console.log(data)
  $('#messages').append(divSystemContentElement(data))
})

socket.on('news', function (data) {

  $('#messages').append(divSystemContentElement(data.msg))
})

socket.on('err', function (data) {
  console.log('err')
  $('#messages').append(divSystemContentElement("News: " + data))
  console.log(data)
})

socket.on('info', function (data) {
  console.log('info')
  console.log(data)
  $('#messages').append(divSystemContentElement(data))
  console.log(data)
})

socket.on('update', function (msg) {
  var target = id(msg.id + '_display')
  target.value = msg.value
})

var controls = document.getElementById('controls')

controls.addEventListener('input', sendUpdates)

function sendUpdates (eventObj) {
  socket.emit('control', {
    id: eventObj.target.parentNode.id,
    value: eventObj.target.value
  })
}

function id (idString) {
  return document.getElementById(idString)
}
