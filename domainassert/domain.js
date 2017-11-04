/**
 * Created by shuiqin on 9/19/17.
 */
var http = require('http');
var domain = require('domain')
http.createServer(function (req, res) {
  var d  = domain.create(); //对象继承啦EventEmitter实例对象, 捕获到任何错误时 触发error事件

  d.once('error', function(err){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="UTF-8"/></head>')
    res.write('服务器端接受客户端请求是发以下错误: ');
    res.end(err.message);
  });
  
  // 指定domain对象监控的代码
  d.run(function () {
    if (req.url !== 'favicon.ico'){
      console.log('服务器开始监听1111')
      nonexit();
      console.log('服务器开始监听111')
    }
  });
}).listen(1337);
