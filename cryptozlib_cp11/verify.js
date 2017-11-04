/**
 * Created by shuiqin on 9/21/17.
 */
var crypto = require('crypto');
var fs = require('fs');
var privatepem = fs.readFileSync(__dirname + '/key.pem');
var publicpem = fs.readFileSync(__dirname + '/cert.pem');
//var publicpem = fs.readFileSync( './../httpscertificate/certificate.pem'); //在文件目录下运行

var privatekey = privatepem.toString('ascii');
var sign = crypto.createSign('RSA-SHA256');
var data = 'test';
sign.update(data);
var sig = sign.sign(privatekey, 'hex')
console.log(sig);
//对数据进行签名
/*
 * 0b4e5aaa16e9019c61a51d2dc4e4dc084da5cd0b320822452b3bc044f4d1e8cecc1655c374e829dbaa4cad2560d52430e89f5d808b23aecb6466268e3787de1373dbbb616cade80b13afff64abd006db38039178187609f85aaa8b362ec8107a97c82a17af098f8f72199af822b43cfcd2350b6f96c4dcc4ddbb8edd6b955e8a
 * *//**
 * Created by shuiqin on 9/21/17.
 */

var publicKey = publicpem.toString('ascii');
var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
var verresult = verify.verify(publicKey, sig, 'hex');
console.log("verresult %s", verresult);
