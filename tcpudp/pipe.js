/**
 * Created by shuiqin on 8/18/17.
 */
var net = require('net');
var file = require('fs').createWriteStream('./message.txt');
var server = net.createServer();
server.on('connection', function (socket) {
  socket.pipe(file, {end:false}); // 将socket内容写到文件里
  // 当end属性值为false时, 当客户端不在发送新数据时, 不会立即结束目标对象的写操作, 可以补充写入一些数据
  socket.on('end', function () {
    file.end('再见。。');
  });

  setTimeout(function () {
    file.end('hi, 再见。');
    socket.unpipe(file);
  }, 50000);
});

server.listen(8441, 'localhost');

/****
 *
 * ==== .txt文件内容 ====
 * sasa
 ada
 kkla
 hi, 再见。

====实际写入==== unpipe后 dsdada及rerew未被写入
 sasa
 ada
 kkla
 dsdada
 rwrew



 **/