/**
 * Created by shuiqin on 9/6/17.
 */
var https = require('https');
var fs = require('fs');

/*
* TODO
* hostname设为localhost时出错
* shuiqins-MacBook-Pro:httpscertificate shuiqin$ node httpsclient.js
 在请求数据过程中发生错误, 错误代码为: DEPTH_ZERO_SELF_SIGNED_CERT
* **/
var options = {
  hostname: 'www.baidu.com',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./certificate.pem'),
  rejectUnhauthorized : false,
  //agent: false //自动从连接池中挑选一个当前连接状态为关闭的用户代理
};
//options.agent = new https.Agent(options);// 将用户代理制定为一个新建的http代理
var req = https.request(options, function (res) { // request get
  console.log('请求服务');
  console.log('状态码: ' + res.statusCode);
  console.log('响应头: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (data) {
    console.log('响应内容: ' + data);
  });
});

req.on('response', function (res) {

});
req.on('socket', function (socket) {
  //为连接分配端口时 触发socket事件
  socket.setTimeout(1000);
  socket.on('timeout', function () {
    req.abort();
  });
});

/*
* shuiqins-MacBook-Pro:httpscertificate shuiqin$ node httpsclient.js
 在请求数据过程中发生错误, 错误代码为: ECONNRESET
 socket超时终止请求将触发ECONNRESET错误
* */

req.on('error', function (err) {
  if(err.code === 'ECONNRESET'){
    console.log('socket连接超时');
  }else {
    console.log('在请求数据过程中发生错误, 错误代码为: ' + err.code);
  }
});
req.end(); //使用get方法后不需要使用end , request需要使用