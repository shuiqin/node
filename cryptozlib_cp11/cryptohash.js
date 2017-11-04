/**
 * Created by shuiqin on 9/20/17.
 */
var crypto = require('crypto');
var fs = require('fs');
var shasum = crypto.createHash('sha1'); //散列算法
var s = fs.ReadStream('./app.js');
s.on('data', function (d) {
  //shasum.update(d);
  shasum.update('摘要');

});

s.on('end', function () {
  var d = shasum.digest('hex'); // utf8  ascii  binary
  //var d = shasum.digest('utf8'); // utf8  ascii  binary
  //使用digest后不能再向hmac对象中追加摘要内容
  console.log(d);
});

/*
* ➜  node node cryptozlib_cp11/crypto.js
 8p���6��hƿxfw��
 ➜  node node cryptozlib_cp11/crypto.js
 3870dffed436d91907c5006802c6bf786677acf1
* */