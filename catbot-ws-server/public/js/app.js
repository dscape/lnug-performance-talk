$(function() {
  var socket = Primus.connect('ws://localhost:8080')
    , sceneX = 598
    , sceneY = 378
    , slideX
    , slideY
    ;

  socket.on('open', function () {

    socket.emit('i am a person');

    $("#pointer").draggable(
      { containment: "#pointerCont"
      , scroll: false
      , drag: function (ev, ui) {
          var position = ui.position
            , posX = position.left / sceneX
            , posY = position.top / sceneY
            ;
          socket.emit('x', posX);
          socket.emit('y', posY);
        }
    });

    socket.on('laserStatus', function (laserOn) {
      console.log('laserStatus');
      $('#logo').text(laserOn ? 'Turn off Laser' : 'Turn on Laser');
      $('#logo').css('background-color', laserOn ? '#e00' : '#aaa');
    });

    socket.on('paired', function () {
      console.log('paired');
    });

    socket.on('unpaired', function () {
      $('#logo').css('background-color', '#00e');
      $('#logo').text('waiting for meow');
    });

    //
    // turn laser on and off
    //
    $('#logo').on('click', function() {
      console.log('click: switchLaser');
      socket.emit('switchLaser');
    });

  });

});