/**
 * Created by shuiqin on 9/1/17.
 */
/**
 * Created by shuiqin on 8/31/17.
 */
var http = require('http');
var url = require('url');
var server = http.createServer().listen(1338, 'localhost');

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

    res.statusCode = 404;
    //res.sendDate = false; //服务器会将其当前时间默认发送给客户端相应头 设为false后 不发送
    /*
    * Access-Control-Allow-Origin:*
     Connection:keep-alive
     Date:Mon, 04 Sep 2017 02:50:08 GMT   //这个会没有
     Set-Cookie:type=ninja
     Set-Cookie:language=javascript
     Transfer-Encoding:chunked
    * */
    res.setHeader('Set-Cookie',['type=ninja', 'language=javascript']);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Trailer', 'Content-MD5');// 添加trailer字段
    res.addTrailers({'Content-MD5':'7895BF4b8828'});
    //res.removeHeader('Access-Control-Allow-Origin');
    if (res.headersSent){ // 响应头是否已发送
      console.log('响应头已发送');
    }else{
      console.log('响应头未发送')
    }
    //res.writeHead(200, {'Content-Type': 'text/plain'});

    if (res.headersSent){ // 响应头是否已发送
      console.log('响应头已发送~');
    }else{
      console.log('响应头未发送~')
    }
    console.log(JSON.stringify(res.getHeader('Content-Type')));
    // res.removeHeader('Access-Control-Allow-Origin'); // Can't remove headers after they are sent. 需放在writeHead之前
    switch (url_parts.pathname){
      case '/':
      case '/index.html':
        res.write('您当前正在访问网站首页');
        break;
      default:
        res.write('您当前正在访问的页面为' + url_parts.pathname + '.')
    }
    if (res.headersSent){ // 响应头是否已发送
      console.log('响应头已发送~');
    }else{
      console.log('响应头未发送~')
    }

    res.addTrailers({'Content-MD5':'7895BF4b8828'});

    res.write('跨域');

    res.end();
  }
});