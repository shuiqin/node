/**
 * Created by shuiqin on 5/8/17.
 */
console.log('This is a test string.');
console.log("%s", "hoge", "foo"); // 从第二个参数开始 依次输出所有字符串
console.log("%s", "hoge", {fpp:"FOO"}); // 将对象转换为字符串后输出
console.log("%d", 10, 10.5); // 数值转换为字符串后输出, 从第二个参数开始 依序输出所有数值
console.log("%d", "hoge"); // 将字符串作为数值进行转换, 输出 NaN
console.log("%%", "hoge"); // 输出 %hoge

// node 中 console.log等同于 console.info
var a  = 1;
var b = 2;
console.info(a + b);
console.info(a.toString() + b.toString());

// console.error -- console.warn 用于进行标准错误输出流的输出
console.error("This is an error string");
console.error("%d", "hoge");
console.warn("console.warn"); // 可用console.warn方法替代console.error方法

// console.dir  --将对象内容输出到控制台中
var user = {};
user.name = 'LuLu';
user.getName = function(){return this.name;}
console.dir(user)
console.trace('trace');  //输出当前位置处的栈信息

//console.time console.timeEnd方法使用示例  参数必须相同 统计结果: small loop: 1ms
console.time('small loop');
for (var i = 0; i < 100000; i++){
  ;
}
console.timeEnd('small loop');

// console.assert 对一个表达式的结果进行评估
try{
  console.assert(2 === 12, 'raise an exception');
} catch (e){
  console.log(JSON.stringify(e));
}

// setTimeout(cb,, ms, [args])
var ff1 = function (arg1, arg2) {
  console.log(arg1 + " " + arg2);
}
var timer = setTimeout(ff1, 1000, 'tset1', 'tset2');// 参数
timer.unref();  //unref方法取消setTimeout函数或setInterval函数中指定的回调函数调用
timer.ref(); // 恢复调用

/// 模块化引用 调用
var testModule = require('./testModule');
var testModule1 = require('./testModule');
// delete require.cache[require.resolve('./testModule')];
var testModule3 = require('./testModule');
console.log('require.main: ' + require.main);
if (testModule === require.main){
  console.log('This is the main module of application.');
}
console.log(testModule.tstVar);
console.log(testModule.outputTestVar('testModule'));
console.log(testModule1.outputTestVar('testModule1'));

console.log("__dirname: " + __dirname);

console.log("__filename: " + __filename);