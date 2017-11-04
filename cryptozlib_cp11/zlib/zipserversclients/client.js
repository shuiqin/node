/**
 * Created by shuiqin on 9/22/17.
 */
var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
var request = http.get(
  {
    host:'localhost',
    path: '/',
    port: 1337,
    headers: {'accept-encoding': 'gzip,deflate'}
  });
request.on('response', function (response) {
  var output = fs.createWriteStream(__dirname + '/test2.txt');
  //console.log(response)
  switch (response.headers['content-encoding']){
    case 'gzip':
      console.log('gzip');
      response.pipe(zlib.createGunzip()).pipe(output);
      break;
    case 'deflate':
      console.log('deflate');
      response.pipe(zlib.createInflate()).pipe(output);
      break;
    default:
      response.pipe(output);
      break
  }
});