/**
 * Created by shuiqin on 10/18/17.
 */
var http = require('http');
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');

var pk = fs.readFileSync('./privatekey.pem'); //这个相对路径是相对运行目录 不是该文件的相对目录
var pc = fs.readFileSync('./certificate.pem');
var opts = {
  key: pk,
  cert: pc,
  rejectUnauthorized: false //
}
app.get('/index.html/:id(\\d+)', function (req, res, next) {
  //res.send('ID 参数值必须大于11'); //不会自动走下一个 需显示调用next
  if (req.params.id > 10){
    next() ;
  } else {
    res.send('ID 参数值必须大于10');
  }
});

app.get('/index.html/:id(\\d+)', function (req, res, next) {
    res.send('你好');
});

// http服务器被隐式闯将
app.listen(1337, '127.0.0.1');

// 创建http服务器并指定服务器监听地址及端口
http.createServer(app).listen(1338);

//创建https服务器并指定服务器监听地址及端口号
//https.createServer(opts, app).listen(443); // opts 必须指定
