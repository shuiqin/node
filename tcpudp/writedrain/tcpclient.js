/**
 * Created by shuiqin on 8/22/17.
 */
var net = require('net');
var client =  new net.Socket();
client.setEncoding('utf-8');
client.connect(8431, 'localhost', function (socket) {
  console.log('已连接到服务器端');
  client.write('你好!!!');
  console.log('当前已发送%d字节', client.bytesWritten);
  setTimeout(function () {
    client.end('再见');// 10s后断开连接
    console.log('当前已发送%d字节', client.bytesWritten);
  }, 10000);

});
client.on('data', function (data) {
  console.log('已接受到服务起端发送的数据: '/* + data*/);
});
client.setKeepAlive(true);  //不间断发探测包 检测对方是否已断线
client.on('error', function (err) { // 未起作用
  console.log('error %j', err);
  client.destory();
});

/*
*
* shuiqins-MacBook-Pro:node shuiqin$ node tcpudp/client/tcpserver.js
 客户端与服务端连接已建立。
 已接受到客户端发送的数据: 8888

 客户端与服务端连接已建立。
 已接受到客户端发送的数据: 你好!!!
 已接受到客户端发送的数据: 999


=============================
 shuiqins-MacBook-Pro:app-m-waimai-mainchannelnew shuiqin$ telnet localhost 8431
 Trying ::1...
 telnet: connect to address ::1: Connection refused
 Trying 127.0.0.1...
 Connected to localhost.
 Escape character is '^]'.
 8888
 确认数据: 8888
 999
 确认数据: 999

 =============================


 shuiqins-MacBook-Pro:node shuiqin$ node tcpudp/client/tcpclient.js
 已连接到服务器端
 已接受到服务起端发送的数据: 确认数据: 你好!!!
* */