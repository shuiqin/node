/**
 * Created by shuiqin on 10/24/17.
 */

var express = require('express');
var basicAuth = require('basic-auth-connect');
var mysql = require('mysql');

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

var app = express();
//1—) TODO 书中 express.basicAuth已废弃
//app.use(basicAuth('testUser', 'testPass'));  //当用户输入用户名 密码正确时返回true 允许用户访问网站

//2-) 为中间函数使用  同步函数 是中间➖使用更灵活
/*
app.use(basicAuth(function (user, pass) {
  return user === 'sa' && pass === 'pass';
}));  //当用户输入用户名 密码正确时返回true 允许用户访问网站
*/


//3-) 为中间函数使用  异步函数 是中间➖使用更灵活

app.use(basicAuth(function (user, pass, callback) {
  pool.getConnection(function (err, connection) {
    if (err){
      console.log('与数据库连接失败');
    } else {
      var str;
      console.log('与数据库连接成功');
      connection.query('select count(1) count FROM users where username=? and firstname=?',
        [user, pass],
        function (err, result) {
          if (err){
            str = '在服务器端MYSQ数据库中删除数据失败。';
            connection.release();
            callback(null, false);
          } else {
            if (result[0].count <= 0) {
              str = '在服务器端MYSQ数据库中并无此条数据。';
              connection.release();
              callback(null, false);
            } else {
              str = '在服务器端MYSQ数据库中'+ result.affectedRows +'条数据删除成功。';
              callback(null, true);

            }
          }
          console.log(result);
          console.log(str);
        });
    }
  });
}));
app.get('/', function (req, res) {
  res.end('heelp');
});
app.listen(1342);
