/**
 * Created by shuiqin on 10/19/17.
 */
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
var pk = fs.readFileSync('../privatekey.pem'); //这个相对路径是相对运行目录 不是该文件的相对目录
var pc = fs.readFileSync('../certificate.pem');
var opts = {
  key: pk,
  cert: pc,
  rejectUnauthorized: false //
}
//TODO P442 (\\d+) 书上有误 只一个数字不够
/*app.all('/index.html/:id(\\d+)', function (req, res, next) {
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write('<head><meta charset="UTF-8"/><title>使用post方法向服务器端提交数据</title></head>');
  // var file = fs.createReadStream('index.html');
  // file.pipe(res);
  pool.getConnection(function (err, connection) {
    if (err){
      console.log('与数据库连接失败');
    } else {
      var str;
      console.log('与数据库连接成功' + req.params.id);
      connection.query('select count(1) from users where id=?',
        [req.params.id],
        function (err, result) {
          if (err){
            str = '在服务器端MYSQ数据库中查询数据失败。';
            res.send(str);
            connection.release();
          } else {
            console.log(result);
            console.log(result[0].count);

            // TODO 注 此处树上有误 result[0].count为undefined
            if (result[0]['count(1)']> 0) {
              next();
            } else {
              connection.release();
              str = '你没有操作数据的权限。';
              res.send(str);
            }
          }
        });
    }
  });
});*/

//  /:id(\\d+)  这个路径会不对
app.get('/index.html/:id(\\d+)', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.put('/index.html', function (req, res) {
  console.log('dsds');
  console.log(req.params.id);
  console.log(req);
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
        console.log('与数据库连接成功');
        connection.query('update users set username=?,  firstname=? where id=?',
          [obj.username, obj.firstname, obj.id],//TODO 书上有误 这样根本娶不到参数 req.params.id
          function (err, result) {
            if (err){
              str = '在服务器端MYSQ数据库中删除数据失败。';
            } else {
              if (result.affectedRows == 0) {
                str = '在服务器端MYSQ数据库中并无此条数据。';
              } else {
                str = '在服务器端MYSQ数据库中'+ result.affectedRows +'条数据删除成功。';
              }
            }
            console.log(result);
            console.log(str);
            connection.release();
            res.statusCode = 200;
            res.send(str);
          });
      }
    });
  });
});

// http服务器被隐式闯将
app.listen(1340, '127.0.0.1');

// 创建http服务器并指定服务器监听地址及端口
http.createServer(app).listen(1339);

//创建https服务器并指定服务器监听地址及端口号
https.createServer(opts, app).listen(444); // opts 必须指定
