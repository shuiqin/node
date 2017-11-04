/**
 * Created by shuiqin on 10/17/17.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
  host: '10.5.233.40',
  port: 3306,
  database: 'shuiqindb',
  user: 'root',
  password: '123456_t',
  multipleStatements:true, //支持多语句查询 会有sql攻击的危险 默认不支持
  createConnection: mysql.createConnection, // 建立连接池后 默认使用该方法
  waitForConnections: true, // 当连接池无可用连接时 等待, 否则抛出错误
  connectionLimit: 2 , // 默认 10
  queueLimit: 0 //指定允许挂起的最大连接数 若超过 抛错。  默认为0 不指定允许被挂起的最大连接数
});

pool.getConnection(function (err, connection) {
  if(err){
    console.log('与数据库建立连接失败');
  }else {
    console.log('与数据库建立连接成功');
    connection.query('select * from users', function (err, rows) {
      if (err){
        console.log('查询数据操作失败');
      } else {
        console.log(rows);
        // connection.release(); //释放连接对象到连接池
        // connection.destroy();// 将该连接对象从连接池中移除
       pool.end();
      }
    })
  }
});
