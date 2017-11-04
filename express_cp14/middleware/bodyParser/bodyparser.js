/**
 * Created by shuiqin on 10/24/17.
 */
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');  //弃用
var app = express();

// TODO p450 树上有误
// 参考  http://yijiebuyi.com/blog/90c1381bfe0efb94cf9df932147552be.html
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var multiparty = require('multiparty');

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())
app.use(multipartMiddleware); // USEFULL

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/index.html', function (req, res) {

  console.log(req.files)
  console.log(req.body);
  var file = req.files.myfile;
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    console.log(fields);
  });

  fs.readFile(file.path, function (err, data) {
    if (err){
      res.send('读文件操作失败');
    } else {
      fs.writeFile(file.name, data, function (err) {
        if (err) {
          res.send('写文件操作失败。');
        } else {
          res.send('文件上传成功。');
        }
      })
    }
  });
});
app.listen(1337);
/*
*
* { myfile:
 { fieldName: 'myfile',
 originalFilename: '-NVD-QSP-017+F+Tooling+Management+Procedure工装夹具管理程序.pdf',
 path: '/var/folders/jq/n_vftrns5g72zr2qp7kqpbfr0000gn/T/kfjIRW2cToztlIWOppKBW3JD.pdf',
 headers:
 { 'content-disposition': 'form-data; name="myfile"; filename="-NVD-QSP-017+F+Tooling+Management+Procedure工装夹具管理程序.pdf"',
 'content-type': 'application/pdf' },
 size: 427587,
 name: '-NVD-QSP-017+F+Tooling+Management+Procedure工装夹具管理程序.pdf',
 type: 'application/pdf' } }
 {}
 undefined

 * */