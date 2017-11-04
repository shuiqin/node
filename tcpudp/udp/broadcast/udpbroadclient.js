/**
 * Created by shuiqin on 8/28/17.
 */
var dgram = require('dgram');

var client = dgram.createSocket('udp4');
client.bind(41235, '192.168.1.102');

var buf = new Buffer('你好!');
client.send(buf, 0, buf.length, 41234, '192.168.1.100'); // TODO 此处ip地址为实际ip地址
client.on('message', function (msg) {
  console.log('已接受到服务器端发送的数据%s', msg);
});