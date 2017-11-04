/**
 * Created by shuiqin on 9/5/17.
 */
var http = require('http');
var url = require('url');
var server = http.createServer(function (sreq, sres) {
  var url_parts = url.parse(sreq.url);
  var opts = {
    host: 'www.baidu.com',
    path: url_parts.pathname,
    headers: sreq.headers,
    search: url_parts.search
  }

/*  var opts = {
    host: 'www.baidu.com',
    hostname: 'www.baidu.com',
    //port: 80,
    path: '/',
    method: 'GET',
    headers: {'test': 1}
  }*/

  var creq = http.get(opts, function (cres) {
    sres.writeHead(cres.statusCode, cres.headers);
    cres.pipe(sres);
  });

  sreq.pipe(creq);
});

server.listen(1339);