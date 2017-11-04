/**
 * Created by shuiqin on 9/11/17.
 */

//加入两个setImmediate()回调函数
setImmediate(function(){
  console.log("setImmediate延迟执行1");
  process.nextTick(function(){
    console.log("强势插入");
  });
});
setImmediate(function(){
  console.log("setImmediate延迟执行2");
});

//加入2个nextTick()的回调函数
process.nextTick(function(){
  console.log("nextTick延迟执行1");
});
process.nextTick(function(){
  console.log("nextTick延迟执行2");
});
console.log("正常执行");
process.maxTickDepth(1000);//超过报警或报错
/*
*
* 正常执行
 nextTick延迟执行1
 nextTick延迟执行2
 setImmediate延迟执行1
 setImmediate延迟执行2
 强势插入
* */