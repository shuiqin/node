/**
 * Created by shuiqin on 8/18/17.
 */
var net = require('net');
var server = net.createServer();
var file = require('fs').createWriteStream('./message_socket.txt');

server.on('connection', function (socket) {
  address = socket.address();
  console.log('address: %j' , address);

  socket.pipe(file, {end:false}); // 将socket内容写到文件里
  // 未设置编码格式为binary, 设置后为string
 // socket.setEncoding('utf-8');
  console.log('socket.remoteAddress %j', socket.remoteAddress);
  console.log('socket.remotePort %j', socket.remotePort);
  console.log('socket.localAddress %j', socket.localAddress);
  console.log('socket.localPort %j', socket.localPort);
  /*
  * socket.remoteAddress "::1"
   socket.remotePort 61374
   socket.localAddress "::1"
   socket.localPort 8421
  * */
  socket.on('data', function (data) {
    console.log(data.toString());  //返回string 或者设置encoding
    console.log('data: %j' , data);
    console.log('已接受到%d字节数据。', socket.bytesRead);
  });
});

server.listen(8421);

server.on('close', function () {
  console.log("server close");
});

/**
 * address: {"address":"::ffff:127.0.0.1","family":"IPv6","port":8421}
 *
 *
 *
 *
 * shuiqins-MacBook-Pro:reduxbuild shuiqin$ telnet localhost 8421
 Trying 127.0.0.1...
 Connected to localhost.
 Escape character is '^]'.
 sfdss
 fdsfs  // 输入的数据


 shuiqins-MacBook-Pro:node shuiqin$ node tcpudp/socket.js
 address: {"address":"::ffff:127.0.0.1","family":"IPv6","port":8421}
 data: {"type":"Buffer","data":[115,102,100,115,115,13,10]}
 data: {"type":"Buffer","data":[102,100,115,102,115,13,10]}  // data事件返回的data


#########socket.setEncoding('utf-8');##############
 设置啦encoding为utf-8后
 shuiqins-MacBook-Pro:reduxbuild shuiqin$ telnet localhost 8421
 Trying 127.0.0.1...
 Connected to localhost.
 Escape character is '^]'.
 fff
 sss


 shuiqins-MacBook-Pro:node shuiqin$ node tcpudp/socket.js
 address: {"address":"::ffff:127.0.0.1","family":"IPv6","port":8421}
 data: "fff\r\n"
 data: "sss\r\n"
 #######################
 */