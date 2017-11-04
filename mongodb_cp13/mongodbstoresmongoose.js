/**
 * Created by shuiqin on 10/9/17.
 */
var mongo = require('mongodb');
var mongoose = require('mongoose'); //定义数据结构
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/node-mongo-examples',{
    useMongoClient: true
},
  function (err) {
    if (err){
      console.log('连接mongodb失败');
    }
  });

var goodsSchema = new Schema({
  type: String,
  price: Number
});

var storeSchema = new Schema({
  name: String,
  goods:[goodsSchema]
});

/*

var host = 'localhost';
var port = 27017;
var server = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db('node-mongo-examples', server, {safe: true});*/

var docs = [
  {name:'store1', goods: {type:'food', price:11}},
  {name:'store2', goods: {type:'food', price:10}},
  {name:'store3', goods: {type:'food', price:8}},
  {name:'store4', goods: {type:'food', price:4}},
  {name:'store5', goods: {type:'book', price:9}}
];
var stores = mongoose.model('storesmonogoose', storeSchema);
stores.create(docs, function (err, docs) {
  if (err){
    console.log('保存数据失败');
  } else {
    stores.find(function (err, docs) {
      if (err){
        console.log('查询数据失败');
      } else {
        console.log(docs);
        mongoose.disconnect();
      }
    });
  }
});

/*db.open(function (err, db) {
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
          //{type:'food', $or[{type:'food'}, {price:{$lt: 10}]}  // 或与条件都有
          //{goods.type:'food', goods.price:{$lt: 10}} //直接指定字段
          colloection.find({goods: {type:'food', price:{$lt: 10}}}).toArray(function (err,docs) {
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
})*//**
 * Created by shuiqin on 10/9/17.
 */
/**
 * Created by shuiqin on 10/9/17.
 */
