/**
 * Created by shuiqin on 10/18/17.
 */
var express = require('express');
var fs = require('fs');
var queryString = require('querystring');
var app = express();
var mysql = require('mysql');
var http = require('http');
var https = require('https');
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
var pk = fs.readFileSync('./privatekey.pem'); //这个相对路径是相对运行目录 不是该文件的相对目录
var pc = fs.readFileSync('./certificate.pem');
var opts = {
  key: pk,
  cert: pc,
  rejectUnauthorized: false //
}
app.get('/index.html', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<head><meta charset="UTF-8"/><title>使用post方法向服务器端提交数据</title></head>');
  var file = fs.createReadStream('index.html');
  file.pipe(res);
});

app.post('/index.action', function (req, res) {
  req.on('data', function (data) {
    console.log(data);
    /*
    * <Buffer 75 73 65 72 6e 61 6d 65 3d 25 45 36 25 42 30 25 42 34 25 45 37 25 39 30 25 42 34 26 66 69 72 73 74 6e 61 6d 65 3d 25 45 34 25 42 44 25 41 30 25 45 35 ... >
     <Buffer 75 73 65 72 6e 61 6d 65 3d 25 45 36 25 42 30 25 42 34 25 45 37 25 39 30 25 42 34 26 66 69 72 73 74 6e 61 6d 65 3d 25 45 34 25 42 44 25 41 30 25 45 35 ... >
     <Buffer 75 73 65 72 6e 61 6d 65 3d 25 45 36 25 42 30 25 42 34 25 45 37 25 39 30 25 42 34 26 66 69 72 73 74 6e 61 6d 65 3d 25 45 34 25 42 44 25 41 30 25 45 35 ... >
     <Buffer 75 73 65 72 6e 61 6d 65 3d 78 75 73 68 75 69 71 69 6e 26 66 69 72 73 74 6e 61 6d 65 3d 79 79 79>
     * */
    var obj = queryString.parse(data.toString());
    console.log(obj);
    /*
    * { username: 'hello', firstname: 'yy' }
    * */
    pool.getConnection(function (err, connection) {
      if (err){
        console.log('与数据库连接失败');
      } else {
        var str;
        connection.query('INSERT INTO users set ?', 
          {username: obj.username, firstname: obj.firstname},
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
});

// http服务器被隐式闯将
app.listen(1337, '127.0.0.1');

// 创建http服务器并指定服务器监听地址及端口
http.createServer(app).listen(1338);

//创建https服务器并指定服务器监听地址及端口号
https.createServer(opts, app).listen(443); // opts 必须指定
