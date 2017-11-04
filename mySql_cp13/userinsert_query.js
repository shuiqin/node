/**
 * Created by shuiqin on 10/15/17.
 */
/**
 * Created by shuiqin on 10/15/17.
 */
var mysql = require('mysql');

var connection = mysql.createConnection('mysql://root:123456_t@10.5.233.40/shuiqindb?debug=true&charset=BIG5_CHINESE_CI');
/*var connection = mysql.createConnection({
 host: '10.5.233.40',
 port: 3306,
 database: 'shuiqindb',
 user: 'shuiqin',
 password: '123456_t',
 multipleStatements:true, //支持多语句查询 会有sql攻击的危险 默认不支持
 });*/
function handleDisconnect() {
  connection.connect(function (err) {
    if (err){
      console.log('与MYSQL数据库建立连接失败。');
      console.log(err);
    } else {
      console.log('与MYSQL数据库建立连接成功。')
      connection.query('INSERT INTO users SET ?', {username:'shuiqin', firstname: 'xu'}, function (err, result) {
        if (err){
          console.log('插入数据失败。');
        } else{
          console.log('插入数据的Id值为%d.' , result.insertId);// 使用insertId获取插入数据的主键值
          connection.query('SELECT * FROM ??', ['users'], function (err, result) { // 数据库表名 列名等占位符  ?? ,,    ['users'] 会自动connection.escape(['users'])
            if(err){
              console.log('查询数据失败');
            } else {
              console.log(result);
              //
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
      });

    }
  });

}

handleDisconnect();

//connection.destroy(); //关闭与数据库间的连接 同时销毁与数据库服务器之间建立连接用的端口对象 不执行呗挂起的查询操作
