/**
 * Created by shuiqin on 9/19/17.
 */
var http = require('http');
try{
  http.createServer(function (req, res) {
    if (req.url !== 'favicon.ico'){
      console.log('服务器开始监听1111')
      nonexit();
      console.log('服务器开始监听111')
    }
  }).listen(1337);
}catch (err){
  console.log('接受客户端请求时发生一下错误:');
  console.log(err.code);
}
/*
* 服务器开始监听1111
 /Users/shuiqin/Documents/workspace/app/node/domainassert/trycatch.js:9
 nonexit();
 ^
* 抓不到异常 异步的
*
* 应用程序被强制关闭
* */

process.on('uncaughtException', function (err) {
  console.log('接受客户端请求时发生以下错误:');
  console.log(err);
});

/*
* 服务器开始监听1111
 接受客户端请求时发生以下错误:
 [ReferenceError: nonexit is not defined]

 虽然错误触发 但应用程序未被强制关闭

 uncaughtException缺点:
  虽然可以捕捉任何未被处理的错误, 但是是一种'粗鲁'的处理方法, 有可能产生资源泄漏, 内存
  泄漏等一系列非常恶劣的影响。
   本例: 客户端将永远得不到服务器端响应
* */

