/**
 * Created by shuiqin on 10/15/17.
 */
var mysql = require('mysql');

var connection = mysql.createConnection('mysql://root:123456_t@10.5.233.40/test?debug=true&charset=BIG5_CHINESE_CI');
/*var connection = mysql.createConnection({
  host: '172.26.251.12',
  port: 3306,
  database: 'shuiqindb',
  user: 'root',
  password: '123456_t'
});*/
function handleDisconnect() {
  connection.connect(function (err) {
    if (err){
      console.log('与MYSQL数据库建立连接失败。');
      console.log(err);
    } else {
      console.log('与MYSQL数据库建立连接成功。')
      // 关闭数据库连接
      connection.end(function (err) {
        if(err){
          if (err.code === 'PROTOCOL_CONNECTION_LOST'){ //与数据库连接丢失
            console.log('与数据库连接丢失');
            setTimeout(function () {
              handleDisconnect();
            }, 10000);
          }
          console.log('关闭 mysql数据库操作失败。');
        } else {
          console.log('关闭 mysql数据库操作成功。');
        }
      });
    }
  });

}

handleDisconnect();

//connection.destroy(); //关闭与数据库间的连接 同时销毁与数据库服务器之间建立连接用的端口对象 不执行呗挂起的查询操作
