/**
 * Created by shuiqin on 8/24/17.
 */

var dgram = require('dgram');
var server = dgram.createSocket('udp4'); // 类型

server.on('message', function (msg, rinfo) { // rinfo : port address family  size p178
  console.log('已接受客户端发送的数据: ' + msg);
  console.log('客户端地址信息为 %j', rinfo);
  var buf = new Buffer("确认信息: " +  msg);
  server.setTTL(128);// TIME TO LIVE经过多少个路由器 后数据包被废弃 值 1~255
  server.send(buf, 0, buf.length, rinfo.port, rinfo.address); // buffer,offset, length , port, address

/*
  setTimeout(function () {
    server.close(); // TODO 多个客户端在10s内同时连接会出问题
  }, 10000);
*/

  // unref会检测客户端连接数 当连接数为0时 关闭服务器
  setTimeout(function () {
    server.unref(); // TODO 多个客户端在10s内同时连接会出问题
  }, 10000);


});

server.on('listening', function () {
  var address = server.address();
  console.log('服务器开始监听, 地址信息为 %j', address);
});

server.bind(41234, 'localhost');

/*
*
* shuiqins-MacBook-Pro:node shuiqin$ node tcpudp/udp/udpserver.js
 服务器开始监听, 地址信息为 {"address":"127.0.0.1","family":"IPv4","port":41234}
 已接受客户端发送的数据: 你好。
 客户端地址信息为 {"address":"127.0.0.1","family":"IPv4","port":51955,"size":9}



 server.close();关闭后出现的问题

 dgram.js:460
 throw new Error('Not running'); // error message from dgram_legacy.js
 ^

 Error: Not running
 at Socket._healthCheck (dgram.js:460:11)
 at Socket.close (dgram.js:354:8)
 at null._onTimeout (/Users/shuiqin/Documents/workspace/app/node/tcpudp/udp/udpserver.js:15:12)
 at Timer.listOnTimeout (timers.js:92:15)
 * */