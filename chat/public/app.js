$(function() {
  var sayCheese = new SayCheese('#video_div', { snapshots: true })
    , socket    = new eio.Socket()
    , sadpanda  = true
    ;

  function renderStatus(imgUri) {
    $('.content li:last-child span').html('&nbsp;');
    $('.content li:last-child span').css('background', '#fff url(' +
     (imgUri || 'foo.png') + ') no-repeat left top');
    $('.content li:last-child span').css('background-size', '100% 100%');
    $('.content').scrollTop($(".content li:last-child").offset().top);
  }

  sayCheese.on('start', function() {
    $('#input_say').focus();
    sadpanda=false;
  });

  sayCheese.on('error', function(error) {
    $('#input_say').focus();
    sadpanda=true;
  });

  sayCheese.on('snapshot', function(snapshot) {
    var img = document.createElement('img');

    $(img).on('load', function() {
      renderStatus(snapshot.toDataURL('image/png'));
    });

    img.src = snapshot.toDataURL('image/png');
  });

  sayCheese.start();

  socket.on('open', function () {
    $('#say').submit(function(e) {
      var wat = $("#input_say").val();

      e.preventDefault();

      $('#messages').append('<li class="me">' + wat +
        '<span class="count">you</span></li>');
      $("#input_say").val('');

      if(!sadpanda) {
        sayCheese.takeSnapshot();
      }

      socket.send(wat);
    });

    socket.on('message', function (msg) {
      $('#messages').append('<li class="other">' + msg +
        '<span class="count">krtc.eu</span></li>');
      renderStatus();
    });

    socket.on('close', function () {
      $('#messages').append('<li class="warn">fuuuuu<br/> We are having ' +
        'connectivity issues, please refresh the page'+
        '</li>');
      $("#input_say").prop('disabled', true);
    });

  });

});