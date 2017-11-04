/**
 * Created by shuiqin on 9/27/17.
 */
var repl = require('repl');
var net = require('net');
/*repl.start({
  prompt:'node via stdin> ',
  input: process.stdin, //默认值
  output: process.stdout
});*/

net.createServer(function (socket) {
  repl.start({
    prompt:"node via TCP socket>",
    input: socket,
    output: socket
  }).on("exit", function () {
    console.log('REPL运行环境退出。');
    socket.end();
  });
}).listen(5001); // telent localhost 5001


/*
注 : 需注掉input 和 output
* (To exit, press ^C again or type .exit)
 node via TCP socket>
 REPL运行环境退出。
* */

/**
 * ➜  repl node repl.js
 ^C
 ➜  repl
 * */