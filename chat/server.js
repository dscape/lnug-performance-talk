var s = require('node-static')
  , http = require('http')
  , engine = require('engine.io')
  , irc = require('./irc')
  , file = new(s.Server)('./public');

var port = +(process.argv[2] || '8342');

var http_server = http.createServer(function (request, response) {
    console.log(port, request.url)
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port);

var server = engine.attach(http_server);

server.on('connection', function (socket) {
  var uuid = '#'+(~~(Math.random() * 1e9)).toString(36);
  var client = irc();
  client.register(uuid, socket);
  console.log(uuid + ' +');
  socket.on('message', function (data) {
    if(!client.connected()) return socket.close();
    console.log(uuid + '> ' + data);
    client.say(uuid, data);
  });
  socket.on('close', function () {
    console.log(uuid + ' —');
    client.unregister(uuid);
  });
});

console.log('http://localhost:' + port);
