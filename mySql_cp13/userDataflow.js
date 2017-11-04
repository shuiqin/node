/**
 * Created by shuiqin on 10/17/17.
 */
var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection('mysql://root:123456_t@10.5.233.40/shuiqindb?debug=true&charset=BIG5_CHINESE_CI');

var out = fs.createWriteStream(__dirname+ '/message.txt', {encoding: 'utf-8'});
out.on('error', function (err) {
  console.log('写文件操作失败, 错误信息为: ' + err.message);
  process.exit();
});

connection.connect(function (err) {
  if (err){
    console.log('与数据库连接失败');
  } else {
    console.log('与数据库连接成功');
    var query = connection.query('select * from users'); //数据流不能加callback
    //接受数据过程中产生错误时触发
    query.on('error', function (err) {
      console.log('读取数据失败,错误信息为: ' + err.message);
      process.exit();
    });

    //接受到该表中的所有字段时触发 参数为该表中的所有字段
    query.on('fields', function (fields) {
      var str = '';
      fields.forEach(function (field) {
        if (str != ''){
          str += String.fromCharCode(9)
        }
        console.log('field %j' , field);
        str += field.name;
      });
      out.write(str + '\r\n');
    });

    //接受到该表中的一条数据时触发 参数为该表中的一条数据
    query.on('result', function (row) {
      connection.pause(); //暂停读取后续数据
      // TODO 出现乱码
      out.write(row.username + String.fromCharCode(9) + row.firstname + String.fromCharCode(9) +  row.id+ '\r\n', function (err) {
        connection.resume();
      });
    });

    //接受到该表中的所有数据时触发 参数 :无
    query.on('end', function (field) {
      console.log('数据全部写完。')
      connection.end();
    });
  }
});