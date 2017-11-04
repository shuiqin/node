/**
 * Created by shuiqin on 8/22/17.
 */
var net = require('net');
var server = net.createServer(); //not ok 不起作用
var fs = require('fs');
server.on('connection', function (socket) {
  console.log('客户端与服务端连接已建立。');
  socket.setEncoding('utf-8');
  var readStream = fs.createReadStream('./tcpudp/writedrain/server.js'); // 相对于运行目录 不是当前文件的目录
  readStream.on('data', function (data) {
    var flag = socket.write(data);
    console.log('write 方法的返回值为: ' + flag);
    console.log('缓存队列中当前缓存了%j字符。', socket.bufferSize); // not ok , bufferSize不起作用
    console.log('缓存队列中当前缓存了%j字符 bytesWritten。', socket.bytesWritten); // not ok , bufferSize不起作用

  });
  socket.on('data', function (data) {
    console.log('已接受到客户端发送的数据: ' + data);
    // socket.write('确认数据: ' + data);
  });
  
  socket.on('drain', function () { // 缓存区数据已全部发送
    console.log('TCP缓存区中数据已全部发送。');
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
 客户端与服务端连接已建立。
 count: 1
 已接受到客户端发送的数据: 你好!!!
 write 方法的返回值为: false
 缓存队列中当前缓存了[Circular]字符。
 TCP缓存区中数据已全部发送。
 write 方法的返回值为: false
 缓存队列中当前缓存了[Circular]字符。
 TCP缓存区中数据已全部发送。
 write 方法的返回值为: true
 缓存队列中当前缓存了[Circular]字符。
 已接受到客户端发送的数据: 再见
 客户端连接被关闭
 socket端口被正常关闭

=============================
 客户端与服务端连接已建立。
 count: 1
 已接受到客户端发送的数据: 你好!!!
 write 方法的返回值为: true
 缓存队列中当前缓存了[Circular]字符。
 已接受到客户端发送的数据: 再见
 客户端连接被关闭
 socket端口被正常关闭
 */