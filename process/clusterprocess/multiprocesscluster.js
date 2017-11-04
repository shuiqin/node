/**
 * Created by shuiqin on 9/16/17.
 */
var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster){
  cluster.setupMaster({
    exec:__dirname + '/child.js',
    args: [], //相应参数
    silent: false // 子主进程是否共享信息
  });
  cluster.fork();
  cluster.fork();
} /*else {
  http.createServer(function (req, res) {
    if (req.url !== '/favicon.ico'){
      var sum = 0;
      for(var i = 0; i < 5000000; i++){
        sum += i;
      }
      res.writeHead(200);
      res.write('<head><meta charset="utf-8"/></head>');
      res.write('客户端请求在子进程' + cluster.worker.id + "中被处理。");
      res.end('sum=' + sum);
    }
  }).listen(1339);
}*/

/*
*
* 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程1中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程2中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程2中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程1中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程2中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程1中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程1中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程2中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程1中被处理。
 响应内容: sum=12499997500000
 响应内容: <head><meta charset="utf-8"/></head>
 响应内容: 客户端请求在子进程2中被处理。
 响应内容: sum=12499997500000
* */