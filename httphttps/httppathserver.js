/**
 * Created by shuiqin on 8/31/17.
 */
var http = require('http');
var url = require('url');
var server = http.createServer().listen(1337, 'localhost');

server.on('request', function (req, res) {
  if (req.url !== '/favicon.ico'){
    var url_parts = url.parse(req.url);
    /**
     * Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:998',
  port: '998',
  hostname: 'www.baidu.com',
  hash: null,
  search: '?userName=Lulingniu&age=40&sex=male&interests=fishing&interests=reading',
  query:
   { userName: 'Lulingniu',
     age: '40',
     sex: 'male',
     interests: [ 'fishing', 'reading' ] },
  pathname: '/',
  path: '/?userName=Lulingniu&age=40&sex=male&interests=fishing&interests=reading',
  href: 'http://www.baidu.com:998/?userName=Lulingniu&age=40&sex=male&interests=fishing&interests=reading' }
     * */
    //必须写在前面 注意
    //res.writeHead(404, '服务器出错', {'error':{'msg':'服务器出错'}}); //出错
    res.setHeader('Set-Cookie',['type=ninja', 'language=javascript']);
    res.setHeader('location', 'http://www.baidu.com');
    res.setHeader('content-encoding', 'utf-8');
    res.setHeader('content-disposition', 'http://img01.9yaocn.com/2016-08/23/57bbc9fc/57bbc9fc0a54c9dc181a9688/1471925806226_442673.jpg');
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin':'http://localhost'});
    res.write('<html><head><meta charset="utf-8"/></head>');//
    switch (url_parts.pathname){
      case '/':
      case '/index.html':
        res.write('<body>您当前正在访问网站首页</body></html>');
        break;
      default:
        res.write('<body>您当前正在访问的页面为' + url_parts.pathname + '.</body></html>')
    }
    res.end();
  }
});