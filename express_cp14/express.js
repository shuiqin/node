/**
 * Created by shuiqin on 10/17/17.
 */
var express = require('express');
var http = require('http');
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

//路由指定参数
// ? 允许客户端不指定id参数值或name参数值 ?
// 注 (\\d) 指定参数类型必须为数字
//:id?(\\d) 这样组合会出问题
app.get('/index.html/:id?/:name?', function (req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<head><meta charset="UTF-8"/></head>');
  var str = '';
  console.log(req.params);  // http://localhost:1337/index.html/89 { '0': 'ndex', id: '89', name: undefined }
  for(key in req.params){
    if (str != ''){
      str += '<br/>';
    }
    if (req.params[key]) {
      str += '参数名:' + key;
      str += String.fromCharCode(9) + '参数值: ' + req.params[key];
    }

  }
  console.log("ksdklsd");
  res.end('你好啦啦啦\n' + str);
  //next();
});

//路由指定参数
app.get('/index.html', function (req, res) {
 // res.writeHead(200, {'Content-Type': 'text/html'});
  //res.write('<head><meta charset="UTF-8"/></head>');
  var str = '';
  res.end('你好啦啦啦111\n' + str);
});

//路由正则表达式  路径必须以数字开头 /\/(\d+)/   /\/(\d+)$/ 以数据结尾  结束符 $
app.get( /\/(\d+)$/, function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<head><meta charset="UTF-8"/></head>');
  var str = '';
  res.end('你好啦啦啦1333\n' + str);
});


// http服务器被隐式闯将
app.listen(1337, '127.0.0.1');

// 创建http服务器并指定服务器监听地址及端口
http.createServer(app).listen(1338);

//创建https服务器并指定服务器监听地址及端口号
https.createServer(opts, app).listen(443); // opts 必须指定

/*
*http://localhost:1337/index.html/23/shuiqin
* 你好啦啦啦 参数名:id	参数值: 23
 参数名:name	参数值: shuiqin


 http://localhost:1337/index.html
 你好啦啦啦

* */