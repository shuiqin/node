/**
 * Created by shuiqin on 9/22/17.
 */
var http = require('http');
var zlib = require('zlib');
var fs = require('fs');

http.createServer(function (req, res) {
  var raw = fs.createReadStream(__dirname + '/test.txt');
  var accecptEncoding = req.headers['accept-encoding'];
  if (!accecptEncoding) {
    accecptEncoding = '';
  }

  if(accecptEncoding.match(/\bdeflate\b/)){
    res.writeHead(200, {'content-encoding': 'deflate'});
    raw.pipe(zlib.createDeflate()).pipe(res);
  }else if(accecptEncoding.match(/\bgzip\b/)){
    res.writeHead(200, {'content-encoding': 'gzip'});
    raw.pipe(zlib.createGzip()).pipe(res);
  } else {
    res.writeHead(200, {});
    raw.pipe(res);
  }
}).listen(1337);