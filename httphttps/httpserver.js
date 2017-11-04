/**
 * Created by shuiqin on 8/30/17.
 */
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    // 暂不指定接收到客户端请求时的处理
}).listen(1337, '127.0.0.1', function () { // 监听端口及地址
  console.log('服务器开始监听')
});
server.on('request', function (req, res) {
  // 暂不指定接收到客户端请求时的处理
  console.log('request %j', req);
  console.log('request method: %s', req.method);
  console.log('request url: %s', req.url);
  console.log('request headers: %j', req.headers);
  console.log('request http version: %j', req.httpVersion);// http版本 '1.1, 1.0'
  console.log('request trailers %j', req.trailers); //客户端附件的http头信息
  console.log('request socket %j', req.socket); //客户端附件的http头信息
  if (req.url !== '/favicon.ico'){
    var out = fs.createWriteStream('./httprequest.log');
    out.write('客户端请求所用方法为: ' + req.method + '\r\n');
    out.write('客户端请求所用url为: ' + req.url + '\r\n');
    out.write('客户端请求headers为 '+ JSON.stringify(req.headers) +' \r\n');
    req.on('data', function (data) { //data数据
      console.log('服务器接收到数据: ' + decodeURIComponent(data));
    })
    req.on('end', function () {
      console.log('客户端请求数据已全部接受完毕。');
    });
    /*
    打开serverform.html  提交表单
    * 服务器接收到数据: name=水芹&hobby=球
     客户端请求数据已全部接受完毕。
    * */
    res.end();
  }
});

/*
 request method: GET
* request url: /
* request http version: "1.1"
* */
server.on('listening', function () {
  console.log('服务器开始监听~~');
 // server.close();// 关闭服务器
});

server.on('close', function () {
  //  回调函数
  console.log('服务器被关闭!')
});

// 当指定的端口及地址被占用后错误代码是 EADDRINUSE
server.on('error', function (e) {
  if (e.code = 'EADDRINUSE'){
    console.log('服务器地址及端口被占用');
  }
});

//客户端与服务器连接后触发connection时间
server.on('connection', function (socket) {
  //回调函数代码略
  console.log('客户端连接已建立');
});

console.log(server.timeout);
server.setTimeout(1000*60*3, function (socket) { // 默认超时时间2分
  console.log('超时!!');
});
server.on('timeout', function (socket) {
  console.log('超时!!~~');
});
console.log(server.timeout);
server.timeout = 1000*60*4;
console.log(server.timeout);
/*timeout值
* 120000  默认
 180000   函数设置
 240000    属性设置
* */
/*
* 浏览器访问http://localhost:1337/
* 服务器开始监听
 服务器开始监听~~
 客户端连接已建立
 客户端连接已建立

 两次连接建立 浏览器发出两次客户请求:
 1) 用户发出的请求
 2) 浏览器在页面收藏夹中的显示图标 (默认favicon.ico)而自动发出的请求
* */