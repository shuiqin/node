/**
 * Created by shuiqin on 10/9/17.
 */
var mongo = require('mongodb');
var host = 'localhost';
var port = 27017;
var server = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db('node-mongo-examples', server, {safe: true});

db.open(function (err, db) {
  if(err){
    throw err;
  }else {
    console.log('成功建立数据库链接。');
    db.collection('users', function (err, colloection) {
      //{fields:{usename:1, _id: 1}}  1显示该信息 0不显示
      // {sort: {username: 1, _id: -1}} 1升序  -1降序
      // {limit:1}  限制数量
      // {limit:1, skip:1} 符合条件的数据需要跳过几条
      // {hint: {price:1}}
      // explain 查看执行一个find方法查询数据是的详细性能数据  使用该属性后  find方法并不真正执行数据的查询操作 只返回在查询数据时的性能信息
      //, {explain:true}
      // {explain:true}
      colloection.find({}).toArray(function (err,docs) { // find({username:'三'})
        if(err){
          throw err
        } else {
          console.log(docs);
          db.close(false); // false表示不强制关闭 还能被open
        }
      });
    })
  }
});

db.on('close', function (err, db) {
  if (err){
    throw err;
  } else {
    return;
    db.open(function (err, db) {
      if(err){
        throw err;
      }else {
        console.log('成功建立数据库链接。');
        db.collection('users', function (err, colloection) {
          colloection.insert({username:'三', firstname:'张'},{fields:{usename:1, _id: 1}}, function (err,docs) {
            if(err){
              throw err
            } else {
              console.log(docs);
              db.close(true);  // false表示强制关闭 不能被open
            }
          });
        })
      }
    });
    console.log('成功关闭数据库。');
  }
})/**
 * Created by shuiqin on 10/9/17.
 */
/**
 * Created by shuiqin on 10/9/17.
 */
