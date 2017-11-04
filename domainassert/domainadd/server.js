/**
 * Created by shuiqin on 9/19/17.
 */
var http = require('http');
var domain = require('domain');

http.createServer(function (req, res) {
  var reqd = domain.create();

  reqd.add(req);
  reqd.add(res);
 /* reqd.run(function () {
    req.on('data', function () {
      nonexitss();
      res.write('你好');
      res.end();
    });
    res.writeHead(200);
    res.write('Hi, i am server');
    nonexitss();
    res.end('bye');
  });*/
  reqd.on('error', function (err) {
    res.writeHead(200);
    res.write('服务器端接受到客户端请求时发生以下错误');
    res.end(err.message);
  });
  //reqd.remove(req); //可使用remove删除req
  req.on('data', function () {
    nonexitss();
    res.write('你好');
    res.end();
  });
  res.writeHead(200);
  //res.write('Hi, i am server');
  //nonexitss();
  //res.end('bye');
}).listen(1337);