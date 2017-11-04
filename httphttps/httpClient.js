/**
 * Created by shuiqin on 9/5/17.
 */

var http = require('http');
var options = {
  host: 'www.microsoft.com',
  hostname: 'www.microsoft.com',
  //port: 80,
  path: '/',
  method: 'GET',
  headers: {'test': 1}
}

var req = http.get(options, function (res) { // http.request http.get get区别 get方法自动调用end方法 不需要显式调用request方法
  console.log('状态码: ' + res.statusCode);
  console.log('res %j', res);
  console.log('响应头: ' + JSON.stringify(res.headers));
  res.setEncoding('utf-8');
  res.on('data', function (chunk) {
    console.log('响应内容: '+ chunk);
  });
});

req.on('error', function (err) {
  if (err.code === 'ECONNRESET'){
    console.log('socket端口超时.');
  } else {
    console.log('在请求数据过程中发生错误, 错误代码为: ' + err.code); // 在请求数据过程中发生错误, 错误代码为: ENOTFOUND
  }
});
req.on('socket', function (socket) {
  socket.setTimeout(1000);
  socket.on('timeout', function () {
    req.abort();
  });
});
//req.end();  // 走超时时要注调这行