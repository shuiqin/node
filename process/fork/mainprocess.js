/**
 * Created by shuiqin on 9/14/17.
 */
var cp = require('child_process');
var n = cp.fork(__dirname + '/childprocess.js', ['one']);//1) , {silent: true}
//默认子进程父进程共享输入/输出  不共享输出流
console.log(__dirname + '/childprocess.js');
n.on('message', function (m, setHandler) {
  console.log('父进程接受到消息:' + JSON.stringify(m));
  process.exit();
});

/* 2)
n.stdout.on('data', function (data) {
  console.log('子进程标准输出:' + data.toString());
});
*/

n.send({userName: '水芹'});

/*

1) slient: true

* 子进程标准输出:子进程即收到消息: {"userName":"水芹"}

 父进程接受到消息:{"age":88}


2) slient: false
 子进程即收到消息: {"userName":"水芹"}
 父进程接受到消息:{"age":88}
* */