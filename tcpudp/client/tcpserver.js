/**
 * Created by shuiqin on 8/22/17.
 */
var net = require('net');
var server = net.createServer({allowHalfOpen:true}); //not ok 不起作用
server.on('connection', function (socket) {
  console.log('客户端与服务端连接已建立。');
  socket.on('data', function (data) {
    console.log('已接受到客户端发送的数据: ' + data);
    socket.write('确认数据: ' + data);
  });
  socket.on('error', function (err) {  // TODO 未起作用
    console.log('error %j', err);
    socket.destory();
  });
 socket.on('end', function () {  // ok
    console.log('客户端连接被关闭');
    server.unref(); // ok 客户端连接全部关闭时退出应用程序
  });
   socket.on('close', function (had_error) {
    if (had_error){
      console.log('由于一个错误导致socket端口被关闭。');
      server.unref();
    }else {
      console.log('socket端口被正常关闭'); //ok
    }
  });
  
  server.getConnections(function (err, count) {
    console.log('count: %d', count)
    if (count == 2){
      console.log("close");//只允许两个client连接
      server.close();
    }
  });
});

server.on('close', function () { //当所有客户端连接均已关闭后,服务器自动关闭  前提客户端关闭后调用  server.unref();
  console.log('TCP 服务器被关闭');
});

server.listen(8431, 'localhost');

/**
 *
 * 客户端与服务端连接已建立。
 count: 1
 客户端与服务端连接已建立。
 count: 2
 close
 客户端连接被关闭
 socket端口被正常关闭
 客户端连接被关闭
 TCP 服务器被关闭
 socket端口被正常关闭
 */