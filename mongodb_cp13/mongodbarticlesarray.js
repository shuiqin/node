/**
 * Created by shuiqin on 10/9/17.
 */
var mongo = require('mongodb');
var host = 'localhost';
var port = 27017;
var server = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db('node-mongo-examples', server, {safe: true});
var stores = [
  {name:'store1', goods: {type:'food', price:11}},
  {name:'store2', goods: {type:'food', price:10}},
  {name:'store3', goods: {type:'food', price:8}},
  {name:'store4', goods: {type:'food', price:4}},
  {name:'store5', goods: {type:'book', price:9}}
];
var docs = [
  {name:'TV', tags: ['device', 'electric equipment']},
  {name:'store2', tags: [10]},
  {name:'apple', tags: ['fruit', 'food', 'citrus']},
  {name:'Node.js', tags: ['book','test']},
  {name:'store5', tags: ['book']}
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
          // {goods.type:'food', goods.price:{$lt: 10}} //直接指定字段
          // 指定数组完整内容查询{tags: ['fruit', 'food', 'citrus']}
          // 单独指定数组中需包含的某个元素{tags: 'fruit'}
          // 精确指定数组中某个元素的值 {tags.0: 'fruit'}
          colloection.find({tags: ['fruit', 'food', 'citrus']}).toArray(function (err,docs) {
            if(err){
              throw err
            } else {
              console.log("hhh");
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
    return;
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
