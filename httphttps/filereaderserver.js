/**
 * Created by shuiqin on 9/4/17.
 */
var fs = require('fs');
var http = require('http');
var server = http.createServer(function (req, res) {
  if (req.url != '/favicon.ico'){
    fs.readFile('./server.js', function (err, data) { //目录为相对与运行目录
      if (err){
        console.log('读取文件失败!');
      } else {
        res.setTimeout(1000/*, function () { //未指定callback函数 超时后自动关闭连接, 指定后不自动关闭连接
          console.log('响应超时');
        }*/);
      /*  res.on('timeout', function () {

        });*/

        setTimeout(function () {
          var flag = res.write(data);
          console.log(flag);
          res.end();
        }, 2000);
       res.on('close', function () {
         console.log('连接中断');
       });
      }
    });
  }
}).listen(1339);