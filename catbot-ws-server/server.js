var s       = require('node-static')
  , Primus  = require('primus')
  , Emitter = require('primus-emitter')
  , file    = new(s.Server)('./public')
  , paired  = require('./lib/paired')
  ;

var app = require('http').createServer(function (request, response) {
  request.addListener('end', function () {
      file.serve(request, response);
  }).resume();
}).listen(8080);

var server = new Primus(app, { transformer: 'websockets', parser: 'JSON' });
server.use('emitter', Emitter);

var engine       = paired(function (sockets) {
  var cat        = sockets.cat
    , person     = sockets.person
    ;

  person.on('switchLaser', function () {
    cat.emit('switchLaser');
  });

  person.on('x', function (x) {
    cat.emit('x', x);
  });

  person.on('y', function (y) {
    cat.emit('y', y);
  });

  cat.on('laserStatus', function (status) {
    person.emit('laserStatus', status);
  });

}, ['switchLaser', 'x', 'y', 'laserStatus']);

server.on('connection', function (socket) {
  console.log('+ ' + socket.id);

  //
  // oh mah ceilin we haz kat!
  //
  socket.on('im kat', function (status) {
    console.log('meow: ' + socket.id);
    socket._type = 'cat'
    engine.pair(socket);
  });

  //
  // people are people too you know!1!
  //
  socket.on('i am a person', function () {
    console.log('hi: ' + socket.id);
    socket._type = 'person'
    engine.pair(socket);
  });
});

server.on('disconnection', function (socket) {
  console.log('- ' + socket.id);
  engine.next(socket, true);
});