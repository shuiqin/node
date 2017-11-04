/**
 * Created by shuiqin on 10/9/17.
 */
var mongo = require('mongodb');
var host = 'localhost';
var port = 27017;
var server = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db('node-mongo-examples', server, {safe: true});


var foods = [
  {type:'food', price:11},
  {type:'food', price:10},
  {type:'food', price:8},
  {type:'food', price:4}];

var books = [
  {type:'book', price:11},
  {type:'book', price:10},
  {type:'book', price:8},
  {type:'book', price:4},
  {type:'book', price:9}
];

var stores = [
  {name:'store1', goods: foods},
  {name:'store2', goods: books}
];

db.open(function (err, db) {
  if(err){
    throw err;
  }else {
    console.log('成功建立数据库链接。');
    db.collection('stores', function (err, colloection) {
      colloection.insert(docs, function (err, docs) {
        if (err){
          throw err;
        }else{
          // 多字段查询  {$or[{type:'food'}, {price:{$lt: 10}]}  //或条件查询
          // {type:'food', $or[{type:'food'}, {price:{$lt: 10}]}  // 或与条件都有
          // {'goods.type:'food', goods.price:{$lt: 10}} //直接指定字段
          // 指定数组完整内容查询{tags: ['fruit', 'food', 'citrus']}
          // 单独指定数组中需包含的某个元素{tags: 'fruit'}
          // 精确指定数组中某个元素的值 {'tags.0': 'fruit'}
          // 多层结构数组查询 {'goods.0.type': 'food'}
          // 查询子文档的字段及字段值  {'goods.type': 'food'}   {'goods.price': {$lt:10}}
          colloection.find({'goods.0.type': 'food'}).toArray(function (err,docs) {
            if(err){
              throw err
            } else {
              console.log(docs);
              db.close(false); // false表示不强制关闭 还能被open
            }
          });
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
