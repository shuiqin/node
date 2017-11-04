/**
 * Created by shuiqin on 9/17/17.
 */
process.on('message', function (m, socket) {
  if (m === 'socket'){
    socket.end('客户端请求被子进程处理2。'); //公用socket直接 输出
    process.send('客户端请求被子进程处理3', socket); //要主进程监听 message事件输出
    //noneexit(); //注: 子进程1异常退出, 退出代码为1,
  } else {
    console.log('客户端接受到消息1: ' + m);
    //TypeError: This handle type can't be sent
   // process.send('客户端接受到消息2:'+ m); //要主进程监听 message事件输出

  }
});

/*
*
* 客户端请求被子进程处理2。
 子进程中返回消息: 客户端请求被子进程处理3
* */