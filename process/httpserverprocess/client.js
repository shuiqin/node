/**
 * Created by shuiqin on 9/15/17.
 */
var http = require('http');
var options = {
  hostname: 'localhost',
  port: 1338,
  path: '/',
  method: 'GET'
}

for(var i = 0 ; i < 10 ; i++){
  var req = http.request(options, function (res) {
    res.on('data', function (chunk) {
      console.log('响应内容: ' + chunk);
    })
  });
  req.end();
}