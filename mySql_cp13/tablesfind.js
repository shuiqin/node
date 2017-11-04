/**
 * Created by shuiqin on 10/15/17.
 */
// genres id name
//books id name genreid
  /*
  CREATE TABLE `shuiqindb`.`books` (
   `id` INT NULL AUTO_INCREMENT,
   `name` VARCHAR(175) NULL,
   `genreid` INT NULL,
   PRIMARY KEY (`id`),
   UNIQUE INDEX `id_UNIQUE` (`id` ASC),
   INDEX `genreid_idx` (`genreid` ASC),
   CONSTRAINT `id`
   FOREIGN KEY (`genreid`)
   REFERENCES `shuiqindb`.`genres` (`id`)
   ON DELETE NO ACTION
   ON UPDATE NO ACTION);



   INSERT INTO `shuiqindb`.`books` (`id`, `name`, `genreid`) VALUES ('1', 'books1', '1');
   INSERT INTO `shuiqindb`.`books` (`id`, `name`, `genreid`) VALUES ('2', 'books2', '2');


   INSERT INTO `shuiqindb`.`genres` (`id`, `name`) VALUES ('1', 'genres1');
   INSERT INTO `shuiqindb`.`genres` (`id`, `name`) VALUES ('2', 'genres2');
   *
  * */
var mysql = require('mysql');
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
    console.log('与数据库连接失败');
  } else {
    console.log('与数据库连接成功');
    // 同名 列后面的覆盖前面的
    connection.query('select genres.id, genres.name, books.id, books.genreid, books.name from genres inner join books on genres.id = books.genreid',
      function (err, result) {
      if (err){
        console.log('查询数据失败。');
      } else {
        console.log('1:')
        console.log(result);
        ///connection.end();
      }
    });

    connection.query({
      sql: 'select genres.id, genres.name, books.id, books.genreid, books.name from genres inner join books on genres.id = books.genreid',
      nestTables: true //防止同样表字段被后面覆盖 两张表中的数据以两个对象的形式进行输出
     },
      function (err, result) {
        if (err){
          console.log('查询数据失败。');
        } else {
          console.log('2:')
          console.log(result);
          ///connection.end();
        }
      });

    connection.query({
        sql: 'select genres.id, genres.name, books.id, books.genreid, books.name from genres inner join books on genres.id = books.genreid',
        nestTables: '_' //防止同样表字段被后面覆盖 表名_分割字符_字段名
      },
      function (err, result) {
        if (err){
          console.log('查询数据失败。');
        } else {
          console.log('3:')
          console.log(result);
          ///connection.end();
        }
      });

    // 同名 列后面的覆盖前面的  解决办法 起别名 books.id id1 books.name name1 
    connection.query('select genres.id, genres.name, books.id id1, books.genreid, books.name name1 from genres inner join books on genres.id = books.genreid', function (err, result) {
      if (err){
        console.log('查询数据失败。');
      } else {
        console.log('4:')
        console.log(result);
        ///connection.end();
      }
    })
  }
});

/*
* nestTables: true 属性
* 与数据库连接成功
 [ RowDataPacket { id: 1, name: 'books1', genreid: 1 },
 RowDataPacket { id: 2, name: 'books2', genreid: 2 } ]
 [ RowDataPacket { id: 1, name: 'genres1', id1: 1, genreid: 1, name1: 'books1' },
 RowDataPacket { id: 2, name: 'genres2', id1: 2, genreid: 2, name1: 'books2' } ]
* */

/*
*
* 与数据库连接成功
 1:
 [ RowDataPacket { id: 1, name: 'books1', genreid: 1 },
 RowDataPacket { id: 2, name: 'books2', genreid: 2 } ]
 2:
 [ RowDataPacket {
 genres: { id: 1, name: 'genres1' },
 books: { id: 1, genreid: 1, name: 'books1' } },
 RowDataPacket {
 genres: { id: 2, name: 'genres2' },
 books: { id: 2, genreid: 2, name: 'books2' } } ]
 3:
 [ RowDataPacket { id: 1, name: 'genres1', id1: 1, genreid: 1, name1: 'books1' },
 RowDataPacket { id: 2, name: 'genres2', id1: 2, genreid: 2, name1: 'books2' } ]

 * */

/*
 nestTables: '_' //防止同样表字段被后面覆盖 表名_分割字符_字段名

* 与数据库连接成功
 1:
 [ RowDataPacket { id: 1, name: 'books1', genreid: 1 },
 RowDataPacket { id: 2, name: 'books2', genreid: 2 } ]
 2:
 [ RowDataPacket {
 genres: { id: 1, name: 'genres1' },
 books: { id: 1, genreid: 1, name: 'books1' } },
 RowDataPacket {
 genres: { id: 2, name: 'genres2' },
 books: { id: 2, genreid: 2, name: 'books2' } } ]
 3:
 [ RowDataPacket {
 genres_id: 1,
 genres_name: 'genres1',
 books_id: 1,
 books_genreid: 1,
 books_name: 'books1' },
 RowDataPacket {
 genres_id: 2,
 genres_name: 'genres2',
 books_id: 2,
 books_genreid: 2,
 books_name: 'books2' } ]
 4:
 [ RowDataPacket { id: 1, name: 'genres1', id1: 1, genreid: 1, name1: 'books1' },
 RowDataPacket { id: 2, name: 'genres2', id1: 2, genreid: 2, name1: 'books2' } ]
* */