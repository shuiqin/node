/**
 * Created by shuiqin on 10/26/17.
 */
var express = require('express');
var fs = require('fs');
var out = fs.createWriteStream(__dirname + '/messageout.txt');  //文件out

var app = express();
var mysql = require('mysql');
var morgan = require('morgan');
var queryString = require('querystring');

app.use(morgan('default', {
  stream: out//process.stdout
}));


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
var pk = fs.readFileSync(__dirname + '/privatekey.pem'); //这个相对路径是相对运行目录 不是该文件的相对目录
var pc = fs.readFileSync(__dirname + '/certificate.pem');
var opts = {
  key: pk,
  cert: pc,
  rejectUnauthorized: false //
}
app.get('/index.html/:id(\\d+)', function (req, res) {
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write('<head><meta charset="UTF-8"/><title>使用post方法向服务器端提交数据</title></head>');
  // var file = fs.createReadStream('index.html');
  // file.pipe(res);
  res.sendFile(__dirname + '/index.html')
});

app.put('/index.action', function (req, res) {
  req.on('data', function (data) {
    console.log(data);
    var obj = queryString.parse(data.toString()); //post方法使用解析方法
    console.log(obj);
    /*
     * { '{"firstname":"32","username":"121"}': '' }
     * */
    var obj = JSON.parse(data.toString());  // put方法解析参数
    console.log(obj);
    /*
     *{ firstname: '32', username: '121' }
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
app.listen(1337);

// 创建http服务器并指定服务器监听地址及端口
http.createServer(app).listen(1338);

//创建https服务器并指定服务器监听地址及端口号
https.createServer(opts, app).listen(443); // opts 必须指定