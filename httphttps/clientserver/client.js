/**
 * Created by shuiqin on 9/5/17.
 */
var http = require('http');
var options = {
  hostname:'localhost',
  port: 1337,
  path: '/',
  method: 'POST'
};

var req = http.request(options);
req.on('response', function (res) { // 相当于 .request的回调函数
  console.log('状态码: ' + res.statusCode);
  console.log('res %j', res);
  console.log('响应头: ' + JSON.stringify(res.headers));

  res.on('data', function (chunk) {
    console.log("客户端");
    console.log('确认数据: ' + chunk);
  });

  res.on('end', function () {
    console.log('Trailer 头信息: %j', res.trailers);
  });
});


req.write('hi, i want juice');
req.end('再见');