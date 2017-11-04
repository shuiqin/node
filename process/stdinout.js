/**
 * Created by shuiqin on 9/10/17.
 */

var fs = require('fs');
process.stdin.resume();
process.stdin.on('data', function (chunk) {
  process.stdout.write('进程接受到数据: ' + chunk);
});

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

console.log('Memory usage %j', process.memoryUsage());

/*
 * > process.memoryUsage()
 { rss: 22028288, heapTotal: 9472608, heapUsed: 4761680 }
 >rss  运行node.js应用程序的进程的内存消耗量  单位字节
 heapTotal:  为v8分配的内存量
 heapUsed:   V8内存消耗量
 *
 * */

function foo() {
  console.log('foo');
}

//setTimeout(foo, 0);
//nextTick与setTimeout方法时间参数设为0作用相同

//注: 不同点 nextTick方法制定的函数调用速度要比setTimeout方法指定的函数调用速度快很多
process.nextTick(foo);
console.log('bar');
process.on('uncaughtException', function (err) {
  console.log('捕捉到一个未被处理的错误: ' + err);
});

process.on('SIGINT', function () {
  console.log('接收到SIGINT信号。');
  process.exit(); 
});

//hha();

var finish = function () {
  console.log('文件读取完毕');
};

process.nextTick(finish);  //文件读取完后再执行


var time = process.hrtime(); //秒 纳秒
console.log(fs.readFileSync('./app.js'));
var diff = process.hrtime(time);
console.log('读文件操作耗费 %d 纳秒。', diff[0] * 1e9 + diff[1]);

//nextClick两个耗时方法操作同步进行
function filefoo() {
  function beginAnotherTask() {
    var file = fs.createReadStream('./movie.mp4');
    file.on('data', function (data) {
     // console.log('读取到%d字节。', data.length);
    });
  }
  //beginAnotherTask();
   process.nextTick(beginAnotherTask);
}

var file_o = fs.createReadStream('./movie.mp4');
file_o.on('data', function (data) {
  //console.log('从movie.mp4读取到%d字节。', data.length);
});

filefoo();


/// 指定当前工作目录   process.chdir();
console.log('当前目录: ' + process.cwd());
console.log('进程的组id: ' + process.getgid()); //进程的组id
//process.setgid(999)
console.log('进程的组id: ' + process.getgid()); //进程的组id
console.log('进程的用户id: ' + process.getuid()); //进程的组id
//process.setuid(999)
console.log('进程的附属组id: %j' , process.getgroups()); //进程的组id
process.on('exit', function(){
  console.log('NODE.JS  进程退出。');
});
/*process.chdir('../');
console.log('上层目录: ' + process.cwd());*/

/*setImmediate(function(){
  process.exit();
});*/

hha();


/**
 *
 * shuiqins-MacBook-Pro:node shuiqin$ node process/stdinout.js one two three
 0: /usr/local/bin/node
 1: /Users/shuiqin/Documents/workspace/app/node/process/stdinout.js
 2: one
 3: two
 4: three
 * */

/**
 *
 * shuiqins-MacBook-Pro:node shuiqin$ node process/stdinout.js
 sjkfdjs
 进程接受到数据: sjkfdjs
 你好！！！
 进程接受到数据: 你好！！！
 * */

//process.uptime()  应用程序的当前运行时间