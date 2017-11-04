/**
 * Created by shuiqin on 9/11/17.
 */
var cp = require('child_process');
var fs = require('fs');

// 设置ipc后, 当该通道关闭是将触发子进程对象的disconnect事件
var sp1 =  cp.execFile(__dirname + '/childprocess1.sh', ['one1', 'two1', 'three1', 'four1'],
  {
    cwd:__dirname,
    shell: '/bin/bash'
  }, function (err, stdout, stderr) {
     if (err) {
       console.log('子进程开启失败: ' + err);
       process.exit();
     } else {
        console.log('子进程标准输出: ' + stdout.toString());
        sp2.stdin.write(stdout.toString());
     }
  });

var sp2 = cp.execFile(__dirname + '/childprocess2.sh', {
  cwd:__dirname,
  shell: '/bin/bash'
});
/*
*
* internal/child_process.js:298
 throw errnoException(err, 'spawn');
 ^

 Error: spawn EACCES


 chmod -R u+x .

 https://stackoverflow.com/questions/34562496/gulp-error-internal-child-process-js298-throw-errnoexceptionerr-spawn-err


* */