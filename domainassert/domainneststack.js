/**
 * Created by shuiqin on 9/19/17.
 */
var domain = require('domain');
var d1 = domain.create();
d1.name = 'd1';
var d2 = domain.create();
d2.name = 'd2';

console.log('domain stack1 %j' , domain._stack);

d1.on('error', function (err) {
  console.log('d1 对象捕捉到错误%j', err);
});
d2.on('error', function (err) {
  console.log('d2 对象捕捉到错误%j', err);
});
d1.dispose();
// domain对象不需要使用后 可以使用dispose销毁, 销毁后 与该对象绑定的对象 会回调函数都被解除, 错误不在被捕获, run方法终指定的函数不在运行,对象绑定的定时器不再运行
d2.dispose();
d1.run(function () {
  console.log('最终堆栈%j', domain._stack);
  d2.run(function () {
    console.log('最终堆栈%j', domain._stack);
   // d1.enter(); //可吧d1对象推入domain堆栈的最顶层
    d1.exit(); // 调用exit方法后 该对象及其内部嵌套的所有domain对象都被弹出domain堆栈 , 被弹出后不再捕获任何错误
    console.log('最终堆栈%j', domain._stack);
    throw new Error('first');
  });
});