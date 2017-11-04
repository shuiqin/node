/**
 * Created by shuiqin on 9/24/17.
 */
var zlib = require('zlib');
var fs = require('fs');
var out = fs.createWriteStream(__dirname + '/compress_unzip.log');
var input = 'abcdefghijklmnopqrstuvwxyz';
zlib.gzip(input, function (err, buffer) {
  console.log(buffer.toString());
  if (!err){
    zlib.unzip(buffer, function (err,  buffer) {
      console.log(buffer.toString());
      out.write(buffer.toString());
    })
  }
});