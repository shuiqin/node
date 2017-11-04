/**
 * Created by shuiqin on 9/17/17.
 */
var http = require('http');
var cluster = require('cluster');
var net = require('net');
cluster.setupMaster({
  exec: __dirname + '/child.js'
});

var worker = cluster.fork();
var server = require('net').createServer();
server.on('connection', function (socket) {
  if(socket.remoteAddress !== '192.168.1.100'){
    worker.send('socket', socket);
    return;
  }
  socket.send('客户端请求被主进程处理!。');
});

server.listen(43267);
worker.on('message', function (m, socket) {
  socket.end('子进程中返回消息: '+ m);
 // 注 worker.kill('SIGTERM');  //子进程自动退出
  worker.send('disconnect1')
  worker.disconnect();
  setTimeout(function () {
    worker.send('disconnect2') //这个未发出去
  }, 2000);
});
worker.on('disconnect', function () {
  console.log('disconnect~~~~');
});

//子进程退出是, 触发worker对象的exit事件,
worker.on('exit', function (code, singal) {
  console.log('子进程退出code :' + code + ", signal: " + singal);
  //自动退出 true , 未退出 undefined , 强制退出: false
  if (worker.suicide == true){
    console.log('子进程%d自动退出。', worker.id);
  } else {
    console.log('子进程%d异常退出, 退出代码为%d,', worker.id, code);
  }

  if (singal){
    console.log('退出信号为%s', singal);
  }
});