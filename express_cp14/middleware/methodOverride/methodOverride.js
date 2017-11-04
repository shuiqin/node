/**
 * Created by shuiqin on 10/26/17.
 */
var http = require('http');
var fs = require('fs');
var out = fs.createWriteStream(__dirname + '/messageout.txt');  //文件out
var mysql = require('mysql');

var express = require('express');
var app = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var methodOverride = require('method-override'); //配合中间件bodyparser使用 提供伪http方法支持
var responseTime = require('response-time'); // 服务期端生成响应数据的时间

app.use(multipartMiddleware);

app.use(methodOverride('_method'));  // 发送post实际转成put被服务器处理 p458 书上有问题 必须有'index.html?_method=put',  form中不需要加_method
app.use(responseTime());
var pool = mysql.createPool({
  host: '10.5.233.40',
  port: 3306,
  database: 'shuiqindb',
  user: 'root',
  password: '123456_t',
  createConnection: mysql.createConnection, // 建立连接池后 默认使用该方法
  waitForConnections: true, // 当连接池无可用连接时 等待, 否则抛出错误
  connectionLimit: 2 , // 默认 10
  queueLimit: 0 //指定允许挂起的最大连接数 若超过 抛错。  默认为0 不指定允许被挂起的最大连接数
});

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
// app.post
app.put('/index.html', function (req, res) {
  console.log(req.originalMethod);
  pool.getConnection(function (err, connection) {
    if (err){
      console.log('与数据库连接失败');
    } else {
      var str;
      console.log(req.body);
      //{ username: 'dsds', firstname: 'sdsds' }

      connection.query('INSERT INTO users set ?',
        {username: req.body.username, firstname: req.body.firstname},
        function (err, result) {
          if (err){
            str = '在服务器端MYSQ数据库中插入数据失败。';
          } else {
            str = '在服务器端MYSQ数据库中插入数据成功。';
          }
          connection.release();
          res.send(str);
        });
    }
  });
});
app.listen(1337);

/**
 *Response Header
 *
 * Accept-Ranges:bytes
 Cache-Control:public, max-age=0
 Connection:keep-alive
 Content-Length:1328
 Content-Type:text/html; charset=UTF-8
 Date:Mon, 30 Oct 2017 09:24:07 GMT
 ETag:W/"530-15f6c9165c8"
 Last-Modified:Mon, 30 Oct 2017 09:16:29 GMT
 X-Powered-By:Express



 Accept-Ranges:bytes
 Cache-Control:public, max-age=0
 Connection:keep-alive
 Content-Length:1328
 Content-Type:text/html; charset=UTF-8
 Date:Mon, 30 Oct 2017 09:25:35 GMT
 ETag:W/"530-15f6c9165c8"
 Last-Modified:Mon, 30 Oct 2017 09:16:29 GMT
 X-Powered-By:Express
 X-Response-Time:1.605ms   ///加了var responseTime = require('response-time'); // 服务期端生成响应数据的时间 中间件

 * */