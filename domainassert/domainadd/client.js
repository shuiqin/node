/**
 * Created by shuiqin on 9/19/17.
 */
var http = require('http');
var options = {
  hostname: 'localhost',
  port: 1337,
  path: '/',
  method: 'POST'
};

var req = http.request(options, function (res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('响应内容: ' + chunk);
  });
});

req.write('hi, I am client');
req.end('bye');