/**
 * Created by shuiqin on 9/6/17.
 */
var fs = require('fs');
var https = require('https');

var pk = fs.readFileSync('./privatekey.pem'); //这个相对路径是相对运行目录 不是该文件的相对目录
var pc = fs.readFileSync('./certificate.pem');
var opts = {
  key: pk,
  cert: pc,
  rejectUnauthorized: false //
}

var server = https.createServer(opts, function (req, res) {
  console.log(req.url);
  if (req.url !== '/favicon.ico'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><meta charset="utf-8"/></head>');
    res.write('你好!');
    res.end();
  }
});

server.listen(443, 'localhost', function () {
  console.log('服务器开始监听');
});

server.on('listening', function () {
  console.log('服务器开始监听~');
  //server.close(); //关闭服务器 会触发close事件
});

server.on('close', function () {
  console.log('服务器被关闭')
});

/*
*
* Error: listen EACCES 0.0.0.0:443
* 没权限 加sudo   ----- sudo node httpsserver.js
* */