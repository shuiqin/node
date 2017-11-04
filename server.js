/**
 * Created by shuiqin on 5/11/17.
 */
var http = require('http'); //引用http模块
var server = http.createServer(); // 创建http服务器并将该服务器赋给变量server
var events = require('events');
server.on('request' , function (req, res) {
  console.log(req.url);
  res.end();
});

server.on('request', function (req, res) {
  if(req.url != '/favicon.ico'){
    console.log("接受到客户端请求");
  }
});

server.on('test', function (arg) {
  console.log(arg);
})

server.emit('test', 'hahahha');
/**
 *
 * /
 /favicon.ico
 第一个地址为用户输入的目标url地址
 第二个地址为页面在收藏夹中的显示图标 默认为favicon.ico
 */

// listenerCount方法获取http服务器对象的request事件的事件处理函数数量并将其输出
console.log(events.EventEmitter.listenerCount(server, 'request'));
var emitters = new events.EventEmitter();
emitters.on('newListener', function (e, f) {
  console.log('对事件'+ e +'添加处理函数代码');
  console.log(f);
});
emitters.on('removeListener', function (e, f) {
  console.log('对事件'+ e +'处理函数代码取消');
  console.log(f);
});

var testFunction = function(req, res){
    console.log('fs');
};

server.on('request', testFunction);
server.removeListener('request', testFunction);

server.removeAllListeners('request'); //取消所有事件处理函数
server.listen(1337, '127.0.0.1');

