/**
 * Created by shuiqin on 8/28/17.
 */
var dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('message', function (msg) {
  var buf = new Buffer('已接受到客户端发送的数据: ' + msg);
  server.setBroadcast(true);

  //客户端需降端口号设定为41235
  server.send(buf, 0, buf.length, 41235, '192.168.1.255'); //'192.168.1.255'为广播地址
});
server.bind(41234, '192.168.1.100'); //TODO 此处ip地址为实际ip地址