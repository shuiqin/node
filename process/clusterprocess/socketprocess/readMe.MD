### 主进程子进程共享socket 端口对象###
    noneexit(); //注: 子进程1异常退出, 退出代码为1,
 // 注 worker.kill('SIGTERM');  //子进程自动退出
 ##### disconnect####
 forker 方法返回的worker对象的disconnect使子进程不再接受外部连接
 首先触发disconnect事件
 然后子进程被关闭
 同事触发worker对象的exit事件