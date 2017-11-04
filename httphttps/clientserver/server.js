/**
 * Created by shuiqin on 9/5/17.
 */
var http = require('http');
var server = http.createServer(function (req, res) {
  if (req.url != '/favicon.ico'){
    req.on('data', function (data) {
      console.log('服务器端接受到数据: ' + data);
      res.write('确认数据: ' + data );
      //res.end();// 会报错
    });
    res.on('end', function () {
      console.log('end');
      res.addTrailers({'Content-MD5':'7895BF4b8828'});
      res.end();
    });
  }
}).listen(1337);
