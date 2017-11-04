/**
 * Created by shuiqin on 8/19/17.
 */
/**
 * Created by shuiqin on 8/18/17.
 */
var net = require('net');
var server = net.createServer();
var file = require('fs').createWriteStream('./message_socket.txt');

server.on('connection', function (socket) {
  address = socket.address();
  console.log('address: %j' , address);
  socket.pause(); // p161 将用户数据写入缓存中
  setTimeout(function () {
    socket.resume(); //恢复data事件的触发
    socket.pipe(file); // 将socket内容写到文件里
  }, 30000);
  // 未设置编码格式为binary, 设置后为string

  socket.on('data', function (data) {
    socket.pause();
    setTimeout(function () {
      socket.resume(); //恢复data事件的触发、
    }, 30000);
  });
});


server.listen(8421);

server.on('close', function () {
  console.log("server close");
});


/***
 *
 * 输入 1 3 5 7 两个窗口隔着输
 * 输入2 4 6 8
 * 1
 3
 5
 7
 2
 4
 6
 8
 1
 2
 3
 5
 7
 8




 */
