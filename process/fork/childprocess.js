/**
 * Created by shuiqin on 9/14/17.
 */
process.on('message', function (m) {
  console.log('子进程即收到消息: '+ JSON.stringify(m) );
  process.send({age: 88});
});