/**
 * Created by shuiqin on 9/17/17.
 */
/**
 * Created by shuiqin on 9/16/17.
 */
var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster){
  // 若应用程序运行在主进程中, 则使用fork方法开启一个运行与Node.js应用程序的子进程并在该子进程中运行
  //当前正在运行的主模块文件

  // 这个函数只能在主进程中调用 否则报错找不着 setupMaster is used to change the default 'fork' behavior
  cluster.setupMaster({
    exec:__dirname + '/child.js',
    args: [], //相应参数
   // silent: true // 1)子主进程是否共享信息
  });

  // 在子进程中运行服务器后, 客户端请求总是先被主进程接受, 然后发给子进程中的服务器
  // 在多个子进程中运行服务器, 当主进程接受到客户端请求后, 会分配给一个当前处于空闲状态的子进程
  console.log('Cluster setting %j ' , cluster.settings);
  var worker = cluster.fork();
  console.log('这段代码被运行在主进程中。');
  worker.send("hello, I'm master!!");

  ////  进程间收发消息
  //当主进程接受到子进程中发来的消息时 触发用于创建该子进程对象得到fork方法返回的worker对象的message事件
  worker.on('message', function (m, setHandle) {
    console.log('主进程接受到子进程的消息: ' + m);
    process.exit();
  });
  // 2)
  /*
  * worker.process.stdout.on('data', function (data) { // 分不同渠道输出

   TypeError: Cannot read property 'on' of null
  * */
  /*worker.process.stdout.on('data', function (data) { // 分不同渠道输出
    console.log('接受到来自客户端请求, 目标地址为:' + data);
  });*/
  cluster.on('data', function (data) { // 分不同渠道输出
    console.log('接受到来自客户端请求, 目标地址为++:' + data);
  });

} /*else {
 http.createServer(function (req, res) {
 if (req.url != '/favicon.ico'){
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write('<head><meta charset="utf-8"/></head>');
   res.end('你好\n');
   console.log('这段代码被运行在子进程中。');
   process.stdout.write("test" + req.url);

 }
 }).listen(1337);
 }*/

//fork成功触发
cluster.on('fork', function (worker) {
  //isWorker 是cluster的属性
  console.log('子进程成功fork: ' + worker.id +  ' ' + JSON.stringify(worker.isWorker));
});
// 当fork新进程成功后, 应用程序会向主进程发送反馈信息
cluster.on('online', function (worker) {
  console.log('主进程收到反馈子进程成功fork: ' + worker.id +  ' ' + JSON.stringify(worker.isWorker));
});

/*
 * online fork事件区别
 * online: 在主进程尝试运行子进程中的node应用程序时 触发online
 * fork: 主进程尝试使用fork方法开启子进程时 触发fork事件
 * */

//当子进程中运行的 Node.js应用程序中调用listen方法后, 该服务器开始对指定地址及端口进行监听, 同时触发listening事件
cluster.on('listening', function (worker, address) { //  address prot addressType
  console.log('主进程监听子进程: ' + worker.id +  '开启的服务,其监听地址' + JSON.stringify(address));
});
