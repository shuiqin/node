/**
 * Created by shuiqin on 9/11/17.
 */
var cp = require('child_process');
var fs = require('fs');

// 设置ipc后, 当该通道关闭是将触发子进程对象的disconnect事件
var sp1 =  cp.spawn('node', ['childprocess1.js', 'one', 'two', 'three'],
  {
    cwd:'./process',
    stdio:['ipc','pipe', 'ignore'],
    detached: true //父进程推出后允许子进程继续运行
  });

sp1.unref(); // 子进程使用unref方法允许父进程自动退出
var sp2 = cp.spawn('node', ['childprocess2.js'], {stdio:'pipe', cwd:'./process'});
sp1.stdout.on('data', function (data) {
  console.log('子进程标准输出: ' + data); 
  sp2.stdin.write(data);
  sp1.kill();
});



sp1.on('exit', function (code, signal) {
  if(!code) {
    console.log('子进程退出, 退出信号为: ' + signal + ' ' + code);
  } else {
    console.log('子进程退出, 退出代码为: ' + code)
  }
  process.exit();
});

sp1.on('error', function (err) {
  console.log('子进程开启失败: ' + err); // 子进程开启失败: Error: spawn node ENOENT
  process.exit();
});

sp1.on('disconnect', function () {
  console.log('IPC通道关闭');
});

var out = fs.openSync('./backmessage.txt', 'w');
var sp3 = cp.spawn('node', ['childprocess3.js'
], {
  detached: true,
  cwd:'./process',
  stdio: ['ignore', out, 'ignore'] // in out error
});

sp3.unref();