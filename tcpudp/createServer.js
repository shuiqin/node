/**
 * Created by shuiqin on 8/18/17.
 */
var net = require('net');
var server = net.createServer(function () {
  console.log('客户端与服务器连接已建立。');

  //制定客户端连接数量  查询当前客户端连接数并设置最大连接数
  server.getConnections(function (err, count) {
    console.log('当前存在%d个客户端连接。', count);
    server.maxConnections = 2;
    console.log('TCP服务器的最大连接数 %d.' + server.maxConnections);
  }
  );

  server.close(function () {
    console.log('TCP服务器被关闭');
  });
});

server.listen(8431, 'localhost', function () {
  console.log('服务器端开始监听。');
  var address = server.address();
  console.log('address:' + JSON.stringify(address));
  console.log('被监听的地址信息为%j', address);
});

server.on('error', function (e) { // 在两个命令窗口运行该js 会报此错
  if (e.code = 'EADDRINUSE'){ // 当地址及端口被占用时错误码为'EADDRINUSE'
    console.log('EADDRINUSE');
  }
});

server.on('close', function () {
  console.log("server close");
});
/**
 *
 服务器端开始监听。
 客户端与服务器连接已建立。
 客户端与服务器连接已建立。
 客户端与服务器连接已建立。
 客户端与服务器连接已建立

 telnet localhost 8431

 服务器端开始监听。
 客户端与服务器连接已建立。
 客户端与服务器连接已建立。
 客户端与服务器连接已建立。
 客户端与服务器连接已建立。
 客户端与服务器连接已建立。


 shuiqins-MacBook-Pro:node shuiqin$ node tcpudp/createserver.js
 服务器端开始监听。
 address:{"address":"127.0.0.1","family":"IPv4","port":8431}


 最大连接数
 Trying 127.0.0.1...
 Connected to localhost.
 Escape character is '^]'.
 Connection closed by foreign host.


 服务器端开始监听。
 address:{"address":"127.0.0.1","family":"IPv4","port":8431}
 被监听的地址信息为{"address":"127.0.0.1","family":"IPv4","port":8431}
 客户端与服务器连接已建立。
 当前存在1个客户端连接。
 TCP服务器的最大连接数 %d.2
 客户端与服务器连接已建立。
 当前存在2个客户端连接。
 TCP服务器的最大连接数 %d.2

关闭窗口关闭telnet请求
 server close
 TCP服务器被关闭
 */