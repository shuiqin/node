/**
 * Created by shuiqin on 10/23/17.
 */
var express = require('express');
var middleware = require(__dirname + '/middleware');
var app = express();
//app.use(middleware.setHeader());
// 方法1
/*app.use('/static', middleware.setHeader());

app.get('/!*', /!* middleware.setHeader(), *!/function (req, res) {
  if (res.head){
    res.writeHead(res.statusCode, res.header);
    res.write(res.head);
    res.end('你好');
  }
  res.end();
});*/

// 方法2
app.get('/static',  middleware.setHeader(), function (req, res) {
  if (res.head){
    res.writeHead(res.statusCode, res.header);
    res.write(res.head);
    res.end('你好');
  }
  res.end();
});
app.listen(1337);