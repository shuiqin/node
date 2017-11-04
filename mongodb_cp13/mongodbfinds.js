/**
 * Created by shuiqin on 10/9/17.
 */
var mongo = require('mongodb');
var host = 'localhost';
var port = 27017;
var server = new mongo.Server(host, port, {auto_reconnect: true});
var db = new mongo.Db('node-mongo-examples', server, {safe: true});

var docs = [
  {type:'food', price:11},
  {type:'food', price:10},
  {type:'food', price:8},
  {type:'food', price:4},
  {type:'book', price:9}
];
db.open(function (err, db) {
  if(err){
    throw err;
  }else {
    console.log('成功建立数据库链接。');
    db.collection('goods', function (err, colloection) {
      colloection.insert(docs, function (err, docs) {
        if (err){
          throw err;
        }else{
          // 利用根据price字段获取索引
          colloection.createIndex({price:1}, function (err, indexName) {
            if (err){
              throw err;
            } else {
              // 多字段查询  {$or[{type:'food'}, {price:{$lt: 10}]}  //或条件查询
              // {type:'food', $or[{type:'food'}, {price:{$lt: 10}]}  // 或与条件都有
              //option: 以下是option
              // 注 {hint: {price:1} 按索引price升序排列 强迫使用索引进行查询
              // returnKey:true 属性指定是否 只 在查询结果中包含索引字段值
              // {max: {price: 10}} // 前提: 数据集合中存在索引 max属性值来限定在查询结果中索引字段的最大值
              // {min: {price: 10}} // 前提: 数据集合中存在索引 min属性值来限定在查询结果中索引字段的最小值
              // explain 查看执行一个find方法查询数据是的详细性能数据  使用该属性后  find方法并不真正执行数据的查询操作 只返回在查询数据时的性能信息
              // {explain:true}
              // {raw: true}  是否将二进制BSON数据文档存放在缓存区 然后将该缓存区作为查询结果进行返回 (以缓存区对象的形式来显示user集合中所有数据)
              colloection.find({type:'food', price:{$lt: 10}}, {hint: {price:1},  returnKey:true}).toArray(function (err,docs) {
                if(err){
                  throw err
                } else {
                  console.log(docs);
                  db.close(false); // false表示不强制关闭 还能被open
                }
              });
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
