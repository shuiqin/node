/**
 * Created by shuiqin on 11/3/17.
 */
var errorhandler = require('errorhandler')

var express = require('express');
var app = express();
/*app.use(errorhandler({
  log: function (err, str, req, res, next) {
    res.end(500, err.message);
    next();
  }
}));*/
var erromsg = '';
app.get('/', function (req, res, next) {
  noneexists();
  res.send('你好。');
});
// 错误信息对用户不友好 使用中间件函数
// 缺点 自定义错误函数中将函数错误信息返回给客户端 控制台将不现实堆栈错误信息
app.use(function (err, req, res, next) {
  console.log(err.stack); // 注: 将错误堆栈信息作为标准输出流进行输出
  //res.status(500).send(err.message);
  next(err);
});

app.use(function (err, req, res, next) {
  console.log(err.stack); // 注: 将错误堆栈信息作为标准输出流进行输出
  //res.status(500).send(err.message); // 这个跟res.redirect('/error');不能同时存在
  erromsg = err.message;
  res.redirect('/error');
  console.log('323232');
  //next();
});


app.get('/error', function (req, res, next) {
  res.send('服务器端触发一个错误, 错误消息为: ' + erromsg);
});
app.listen(1337);

/*
* ReferenceError: noneexists is not defined
 at /Users/shuiqin/Documents/workspace/app/node/express_cp14/middleware/errorhandler/errorhandler.js:8:3
 at Layer.handle [as handle_request] (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/layer.js:95:5)
 at next (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/route.js:137:13)
 at Route.dispatch (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/route.js:112:3)
 at Layer.handle [as handle_request] (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/layer.js:95:5)
 at /Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/index.js:281:22
 at Function.process_params (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/index.js:335:12)
 at next (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/index.js:275:10)
 at expressInit (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/middleware/init.js:40:5)
 at Layer.handle [as handle_request] (/Users/shuiqin/Documents/workspace/app/node/node_modules/express/lib/router/layer.js:95:5)
* */