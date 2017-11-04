/**
 * Created by shuiqin on 9/15/17.
 */
var http = require('http');
process.on('message', function (msg, setHandler) {
  if (msg === 'server'){
    console.log('子进程中的服务器已创建。');
    var httpserver = http.createServer();
    httpserver.on('request', function (req, res) {
      if (req.url != '/favicon.ico'){
        var sum = 0;
        for (var i = 0 ; i < 100000; i++){
          sum += i;
        }
        res.write('客户端请求在子进程中被处理。');
        res.end('sum=' + sum);
      }
    });

    httpserver.listen(setHandler); //主进程通过send发送server杜象
  }else {
    
  }
});