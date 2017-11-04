/**
 * Created by shuiqin on 8/30/17.
 */
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('listening', function () {
  server.setMulticastTTL(128);
  server.addMembership('230.185.192.108'); //要实现数据的组播, 使用addMembership方法将socket端口对象加入到组播组中
});
setInterval(broadCast, 1000);
function broadCast() {
  var buf = new Buffer((new Date()).toLocaleString());
  server.send(buf, 0, buf.length, 8088, '230.185.192.108');
}
