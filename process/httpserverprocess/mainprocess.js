/**
 * Created by shuiqin on 9/15/17.
 */
var child_process = require('child_process');
var fs = require('fs');
var net = require('net');
var http = require('http');
var child = child_process.fork(__dirname + '/child.js');

var server = net.createServer();
server.on('connection', function (socket) {
  console.log('remoteaddress: ' + socket.remoteAddress);
 // console.log(JSON.stringify(socket));
  if (socket.remoteAddress !== '127.0.0.1'){
    child.send('server', server);
    return
  }
  socket.end('客户端请求被父进程处理~~');  //注: 需要tcp client连接时 socket才是对的, client连接会报错
  /*
  *
  * Error: Parse Error
   at Error (native)
   at Socket.socketOnData (_http_client.js:320:20)*/
  //socket.write('客户端请求被父进程处理');
  //
 /* socket.on('data', function (data) {
    console.log('已接受到客户端发送的数据: ' + data);
    socket.write('确认数据: ' + data);
  });*/
})

server.listen(1338, 'localhost'/*, function () {
  child.send('server', server);
  console.log('父进程中的服务器已创建')

 /!* var httpserver = http.createServer();
  httpserver.on('request', function (req, res) {
    if (req.url != '/favicon.ico'){
      var sum = 0;
      for (var i = 0 ; i < 100000; i++){
        sum += i;
      }
      res.write('客户端请求在子进程中被处理`1。');
      res.end('sum=' + sum);
    }
  });

  httpserver.listen(server); //主进程通过send发送server杜象*!/
}*/);