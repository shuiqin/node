/**
 * Created by shuiqin on 10/15/17.
 */
var mysql = require('mysql');
var tableName = 'users';
//var connection = mysql.createConnection('mysql://shuiqin:123456_t@172.26.251.12/test?debug=true&charset=BIG5_CHINESE_CI');
var connection = mysql.createConnection({
 host: '10.5.233.40',
 port: 3306,
 database: 'shuiqindb',
 user: 'root',
 password: '123456_t',
 multipleStatements:true //支持多语句查询 会有sql攻击的危险 默认不支持
 });
connection.connect(function (err) {
  if (err){
    console.log('与MYSQL数据库建立连接失败。');
    console.log(err);
  } else {
    insertData();
    console.log('与MYSQL数据库建立连接成功。')

  }
});

//注 TODO 代码有问题 循环走两遍 出来结果是这样
/*
'用户名1', '姓1', '44'
'用户名1', '姓1', '45'
'用户名2', '姓100', '46'
'用户名1', '姓1', '47'
'用户名2', '姓100', '48'
'用户名3', '姓3', '49'
*/
function insertData() {
  var sqlStr = '';
  for(var i = 1; i < 4; ++i){
    console.log('sss:'+ i);
    sqlStr += 'INSERT INTO ' + tableName + '(username, firstname) values(' + connection.escape('用户名' + i.toString()) + ',' +
        connection.escape('姓' + i.toString()) + ');'; // escape防止数据库攻击
    connection.query(sqlStr, function (err, result) {
      if(err){
        console.log('插入数据失败。');
      } else{
        updateData();
      }
    })
  }
}


function updateData() {
  //通过query参数 自动escape
  connection.query('update ' + tableName + ' set firstname= ? where username=?', ['姓100','用户名2'], function (err, result) {
    if (err){
      console.log('更新数据失败。');
    } else {
      //deleteData();
    }
  });
}

function deleteData() {
  connection.query('delete from ' + tableName + ' where username=?', ['用户名3'], function (err, result) {
    if (err){
      console.log('删除数据失败。');
    } else {
      queryData();
    }
  })
}

function queryData() {
  connection.query('SELECT * FROM ' + tableName , function (err, result) {
    if (err){
      console.log('查询数据失败。');
    } else {
      console.log(result);
      //connection.end();
    }
  })
}
//connection.destroy(); //关闭与数据库间的连接 同时销毁与数据库服务器之间建立连接用的端口对象 不执行呗挂起的查询操作
