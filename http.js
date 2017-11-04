
/**
 * Created by shuiqin on 8/11/17.
 */
var http = require('http');
var server = http.createServer();
var EventEmitter = require('events').EventEmitter

server.on('request', function(req, res){
    console.log(req.url);
    res.end();
});

// 对server进行绑定事件的时候触发
server.on('newListener', function(e,g){
    console.log("对" + e + "事件添加事件处理函数");
    console.log(g);
});

//对server进行解绑事件的时候触发
server.on('removeListener', function(e,g){
    console.log("对" + e + "事件取消事件处理函数");
    console.log(g);
});

// 添加'customEvent' 会触发 newListener事件
server.on('customEvent', function(arg1, arg2, arg3){
    console.log("自定义事件被触发");
    console.log("arg1: " + arg1);
    console.log("arg2: " + arg2);
    console.log("arg3: " + arg3);
});

//触发自定义事件
server.emit('customEvent', 'hi', 'looo', 'last');
server.removeAllListeners(); //取消事件绑定 回触发 'removeListener'事件

console.log('server.listenerCount:' + server.listenerCount()); // 0 错误
console.log('EventEmitter.listenerCount:' + EventEmitter.listenerCount(server)) // 0
console.log('EventEmitter.listenerCount:' + EventEmitter.listenerCount(server, 'customEvent')) // 1
console.log('EventEmitter.listenerCount:' + EventEmitter.listenerCount(server, 'request')) // 1

server.listen(1337, '127.0.0.1');