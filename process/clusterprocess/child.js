/**
 * Created by shuiqin on 9/16/17.
 */
var http = require('http');
var cluster = require('cluster');
http.createServer(function (req, res) {
  if (req.url != '/favicon.ico'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('客户端请求在子进程' + process.pid + ' ' + cluster.worker.id  +'中被处理。');
    console.log('这段代码被运行在子进程中。');
    process.stdout.write("test" + req.url);
  }
}).listen(1337);


//  进程间收发消息
process.on('message', function (msg, setHandler) {
  console.log('子进程接受到主进程的信息: '+ msg);
  process.send("Hi, I'm child!!!");
});