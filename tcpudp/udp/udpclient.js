/**
 * Created by shuiqin on 8/24/17.
 */
var dgram = require('dgram');
var message = new Buffer('你好。');
var client = dgram.createSocket('udp4');

client.send(message, 0 , message.length, 41234, 'localhost', function (err, bytes) {
  if (err){
    console.log('发送数据失败。');
  } else {
    console.log('已发送%d 字节数据 。' , bytes);
  }
});

client.on('message', function (msg, rinfo) {
  console.log('已接受服务器端发送的数据: ' + msg);
  console.log('服务器端地址信息为 %j', rinfo);

  client.close();
});

client.on('close', function () {
  console.log('socket端口被关闭')
});

/**
 * 
 * shuiqins-MacBook-Pro:node shuiqin$ node tcpudp/udp/udpclient.js
 已发送9 字节数据 。
 已接受服务器端发送的数据: 确认信息: 你好。
 服务器端地址信息为 {"address":"127.0.0.1","family":"IPv4","port":41234,"size":23}
 * */