/**
 * Created by shuiqin on 11/2/17.
 */
var express = require('express');
var fs = require('fs');
var serveStatic = require('serve-static')
var app = express();
var path = require('path')

// var cookieParser = require('cookie-parser'); //session默认保存在一个cookie中 因此使用session 中间件必须使用cookieparser
/*
* Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work.
* This module now directly reads and writes cookies on req/res.
 * Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.
* */
var session = require('express-session');
var serveIndex = require('serve-index')

// app.use(cookieParser);

// ombining req.url with the provided root directory
//读取静态文件
//默认读取文件 显示index.html 禁掉这个 {index: false}
var serve = serveStatic(__dirname, {index: false}); //, {'index': ['index.html', 'index.htm']}
//var serve = serveStatic('static');

app.use(serve);
// {icons:true} 给目录下的js文件显示图标
app.use(serveIndex(__dirname,
  {icons: true,
    filter: function (file, pos, list) { // filter显示所有子目录及js文件
      return (file.indexOf('.') === -1 || file.indexOf('.js') >= 1);
    }
  }
));  // 显示根目录下所有的子目录及文件 单击某个静态文件 浏览器并不能显示该文件内容 要显示文件内容 使用serveStatic组件
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: false,
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 36000 }
}));

app.get('/index1.html', function (req, res) {
  console.log(req.url);
  res.sendFile(__dirname + '/index.html');
  req.session.username = 'shuiqin';
  req.session.password = '123456';

  //修改cookie过期时间
  var hour = 3800000;
  req.session.cookie.expires = new Date(Date.now() + hour);
  req.session.cookie.maxAge = hour;
  console.log(req.session.cookie);

  setTimeout(function () {
    console.log(req.session.cookie);
    console.log(req.session.cookie.maxAge);  // 3789999  这个字段未stringify
  },10000);
  /*
  *  path: '/',
   _expires: null,
   originalMaxAge: null,
   httpOnly: true,
   secure: false }
   session被销毁。
   ^C
   ➜  session node session.js
   { path: '/',
   _expires: 2017-11-02T09:55:09.288Z,
   originalMaxAge: 36000,
   httpOnly: true,
   secure: false }
  * */


  //重新初始化session
/*  req.session.regenerate(function (err) {
    if (err){
      console.log('session 重新初始化失败。');
    } else {
      console.log('session被重新初始化。');
    }
  });*/
  /*
   * session被重新初始化。
   undefined
   undefined
   * */

  //销毁后会重新生成
  /*req.session.destroy(function (err) {
    if (err){
      console.log('session 销毁失败。');
    } else {
      console.log('session被销毁。');
    }
  });*/
  /*
  * session被销毁。
   undefined
   undefined
  * */

});

app.post('/index.html', function (req, res) {
  console.log(req.session.username);
  console.log(req.session.password);
  /*
  * shuiqin
   123456
  * */
  res.end();
});

app.listen(1337);