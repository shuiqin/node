/**
 * Created by shuiqin on 9/20/17.
 */
var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');
console.log('key %s', key);
var shasum = crypto.createHmac('sha1', key);
var s = fs.ReadStream('./app.js');
s.on('data', function (d) {
  shasum.update(d);
  shasum.update('摘要');
});

s.on('end', function () {
  var d = shasum.digest('hex');
  console.log(d);
});