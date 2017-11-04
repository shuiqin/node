exec与spawn方法最大区别:
   1) spawn方法在父进程中实时接受子进程中输出的标准输出流数据或标准错误输出流数据 是异步方法/
   var sp1 =  cp.spawn('node', ['childprocess1.js', 'one', 'two', 'three'],
     {
       cwd:'./process',
       stdio:['ipc','pipe', 'ignore'],
       detached: true //父进程推出后允许子进程继续运行
     });


   2) exec方法: 父进程必须等子进程中的标准输出流数据和标准错误输出流数据全部缓存完毕后才能接受这些数据  是同步方法
   var sp1 =  cp.exec('node childprocess1.js one two three',
     {
       cwd:__dirname
     }, function (err, stdout, stderr) {
        if (err) {
          console.log('子进程开启失败: ' + err);
          process.exit();
        } else {
           console.log('子进程标准输出: ' + stdout.toString());
           sp2.stdin.write(stdout.toString());
        }
     });
     
     3) execFile
     var sp1 =  cp.execFile('childprocess1.sh', ['one', 'two', 'three'],
       {
         cwd:__dirname
       }, function (err, stdout, stderr) {
          if (err) {
            console.log('子进程开启失败: ' + err);
            process.exit();
          } else {
             console.log('子进程标准输出: ' + stdout.toString());
             sp2.stdin.write(stdout.toString());
          }
       });
       
       
       .sh文件参数 $1 $2 $3 $4
       node childprocess1.js $1 $2 $3 $4
       
       
       
#### node.js进程 ####
不提供路由的支持 各个子进程之间的是各自独立
彼此之间也不共享诸如session之类存放于内存中的对象 
#### node.js进程 ####


####child_process与cluster模块区别###
child_process开启多个子进程中运行各种不同的命令或执行Node.js模块, 可执行文件的处理
cluster模块  开启多个子进程 并在每个子进程中运行一个Node.js应用程序副本的处理