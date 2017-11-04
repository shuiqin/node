/**
 * Created by shuiqin on 9/22/17.
 */
var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');
var inp = fs.createReadStream('./cipher.js');
var out = fs.createWriteStream(__dirname + '/test.txt.gz');
inp.pipe(gzip).pipe(out);
