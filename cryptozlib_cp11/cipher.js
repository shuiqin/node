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
/*
 * 88e882f96714f6a4
  */