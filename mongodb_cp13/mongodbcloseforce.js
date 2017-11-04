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
      colloection.insert({username:'shuiqin', firstname:'xu'}, function (err,docs) {
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
    db.open(function (err, db) {
      if(err){
        throw err;
      }else {
        console.log('成功建立数据库链接。');
        db.collection('users', function (err, colloection) {
          colloection.insert({username:'三', firstname:'张'}, function (err,docs) {
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
