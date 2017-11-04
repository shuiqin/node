/**
 * Created by shuiqin on 8/19/17.
 */
var net = require('net');
var file = require('fs').createWriteStream('./setTimeout.txt');
var server = net.createServer();

server.on('connection', function (socket) {
  socket.setTimeout(10*1000);
  socket.pause();
  socket.pipe(file);
  socket.on('timeout', function () {
    socket.resume();
    console.log('客户端连接已超时。');
    socket.setTimeout(0);
  })
  socket.on('data', function (data) {
    socket.pause();
  })
});

server.listen(8431, 'localhost');