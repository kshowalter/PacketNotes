module.exports = function(server, db){
  var io = require('socket.io')(server);
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('test', function(msg){
      console.log('message: ' + msg);
      io.emit('test', msg);
    });



  });
};
