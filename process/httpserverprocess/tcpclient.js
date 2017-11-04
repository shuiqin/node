/**
 * Created by shuiqin on 9/15/17.
 */
var net = require('net');
var client = new net.Socket();
client.setEncoding('utf8');
client.connect(1338, 'localhost');
client.on('data', function (data) {
  console.log(data);
});