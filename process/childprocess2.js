/**
 * Created by shuiqin on 9/11/17.
 */

var fs = require('fs');
var out = fs.createWriteStream('./childprocess2.txt');  //
process.stdin.on('data', function (data) {
  out.write(data);
  console.log("process2: " + data);
});

process.stdin.on('end', function (data) {
  process.exit();
});
