/**
 * Created by shuiqin on 10/9/17.
 */
var mongo = require('mongodb');
var host = 'localhost';
console.log(JSON.stringify(mongo));
var port = 27017; //mongo.Connection.DEFAULT_PORT;
var server = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db('node-mongo-examples', server, {safe: true});

db.open(function (err, db) {
  if(err){
    throw err;
  }else {
    console.log('成功建立数据库链接。');
    db.collection('users', function (err, colloection) {
      //只改第一条数据
/*      colloection.update({},{username:'lll1', firstname:'ttt1'}, function (err,docs) {
        console.log('成功更新%d条数据', docs);
        console.log(docs);
        colloection.find({}).toArray(function (err,docs) {
          console.log('更新后数据:%j', docs);
          console.log(docs);
          db.close();
        });
      });*/


      //修改啦所有数据
      colloection.update({},{$set:{username:'lll1', firstname:'ttt1'}}, {multi: true},function (err,docs) {
        console.log('成功更新%d条数据', docs);
        console.log(docs);
        colloection.find({}).toArray(function (err,docs) {
          console.log('更新后数据:%j', docs);
          console.log(docs);
          db.close();
        });
      });
    })
  }
});

db.on('close', function (err, db) {
  if (err){
    throw err;
  } else {
    console.log('成功关闭数据库。');
  }
})/**
 * Created by shuiqin on 10/9/17.
 */
