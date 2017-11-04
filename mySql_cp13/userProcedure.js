/**
 * Created by shuiqin on 10/15/17.
 */
//在mysql数据中创建存储过程
/*
create procedure insertuser(
in username varchar(20),
in firstname varchar(20),
out successFlag smallint
)

begin
   declare exit handler
   for sqlexception
   set successFlag = 0;
   insert into users
   values(
   null,
   username,
   firstname);
   set successFlag = 1;
end;



 create procedure insertuser1(
 in username varchar(20),
 in firstname varchar(20)
  )

 begin
 insert into users
 values(
 null,
 username,
 firstname);
 select * from users;
 end;

 //却少分号会报错
* */

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
    console.log('与MYSQL数据库建立连接成功。')
    insertData();
    //insertData1();
  }
});

function insertData() {
  var sqlStr = 'call insertuser("shuiqin11", "xu11", @sucessFlag); select @sucessFlag;'
  connection.query(sqlStr, function (err, result) {
    if(err){
      console.log('插入数据失败');
    } else {
      console.log(result);
      console.log(result[1][0]["@sucessFlag"] );
      if (result[1][0]["@sucessFlag"] == '1'){
        console.log('插入数据成功');
      } else {
        console.log('插入数据失败');
      }
    }
    //connection.end();
  });
}

function insertData1() {
  var sqlStr = 'call insertuser1("shuiqin2", "xu2"); '
  connection.query(sqlStr, function (err, result) {
    if(err){
      console.log('插入数据失败');
    } else {
      console.log(result);
      console.log(result[0]);
    }
    //connection.end();
  });
}