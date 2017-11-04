/**
 * Created by shuiqin on 9/21/17.
 */
var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync(__dirname + '/key.pem');
var key = pem.toString('ascii');
var sign = crypto.createSign('RSA-SHA256');
sign.update('test');
console.log(sign.sign(key, 'hex'));
//对数据进行签名
/*
* 0b4e5aaa16e9019c61a51d2dc4e4dc084da5cd0b320822452b3bc044f4d1e8cecc1655c374e829dbaa4cad2560d52430e89f5d808b23aecb6466268e3787de1373dbbb616cade80b13afff64abd006db38039178187609f85aaa8b362ec8107a97c82a17af098f8f72199af822b43cfcd2350b6f96c4dcc4ddbb8edd6b955e8a
* */