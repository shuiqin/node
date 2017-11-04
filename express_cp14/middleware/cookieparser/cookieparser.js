/**
 * Created by shuiqin on 10/25/17.
 */
var express = require('express');
var fs = require('fs');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/index.html', function (req, res) {
  for (var key in req.cookies) {
    res.write('cookie名: ' + key);
    res.write(',cookie值:' +  decodeURIComponent(req.cookies[key]) + '<br/>');  // 乱码问题
  }
  //req.end()
  /*
  * index.html:17 POST http://localhost:1337/index.html net::ERR_INCOMPLETE_CHUNKED_ENCODING
  * */
  res.end();
});

app.listen(1337);