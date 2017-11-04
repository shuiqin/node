/**
 * Created by shuiqin on 9/21/17.
 */
var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync(__dirname  + '/key.pem');
var key = pem.toString('ascii');
var cipher = crypto.createCipher('blowfish', key);
var text = 'test';
var crypted = cipher.update(text, 'binary', 'hex'); //数据块未满 缓存在cipher中
var crypted = cipher.final('hex');
console.log(crypted);


//解密
var decipher = crypto.createDecipher('blowfish', key); //解密的算法
decipher.update(crypted, 'hex', 'utf8'); //解密的数据
var decrypted = decipher.final('utf8');
console.log('decrypted: %s', decrypted);
/*
* 88e882f96714f6a4
 decrypted: test
* */