/**
 * Created by shuiqin on 10/30/17.
 */
var express = require('express');
var app = express();
var urlrouter = require('urlrouter');
var restful = require('restful-router');


app.get('/', function (req, res, next) {
  res.send('hoge');
  console.log('res.send(\'hoge\');');
  next();  //若无next下面函数不会被执行
});

app.use(function (req, res, next) { //自定义中间件
  console.log('foo');
  next();
});


//此处执行app.get('/')
// app.use(app.router);// 弃用 不再需要 把这以后的use直接房get后面
//若不再app.get('/')中调用next方法 那下面这个中间函数将不被执行
app.use(function (req, res, next) {
  console.log('bar');
  next();
});



app.listen(1337);

/*
*
* foo
 bar
 res.send('hoge');


 Error: 'app.router' is deprecated!
 Please see the 3.x to 4.x migration guide for details on how to update your app.
 at EventEmitter.get (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/application.js:124:13)


 Your code should move any calls to app.use that came after app.use(app.router) after any routes (HTTP verbs).

 https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x
 * */