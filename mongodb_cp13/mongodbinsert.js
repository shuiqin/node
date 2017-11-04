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
      colloection.insert({username:'shuiqin', firstname:'xu'}, function (err,docs) {
        console.log(docs);
        db.close();
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
