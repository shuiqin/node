/**
 * Created by shuiqin on 9/26/17.
 */
var vm = require('vm');
var e = 0;

eval('e=e+1');
eval('console.log(e)');
console.log(__dirname);
vm.runInThisContext("console.log(1)", __dirname+'/vm.log');//在内存中临时创建该文件并用它记录代码运行的堆栈信息
vm.runInThisContext('e=e+1');
//runInThisContext维护独立的上下文运行环境  在一个runInThisContext中定义的变量 方法 对象 可以
//在之后的runInThisContext方法中访问这些变量 对象和方法

/*
*1) node vm.js  跑文件报错
* e=e+1
 ^

 ReferenceError: e is not defined
 at evalmachine.<anonymous>:1:3
 at ContextifyScript.Script.runInThisContext (vm.js:25:33)
 at Object.runInThisContext (vm.js:97:38)
 at Object.<anonymous> (/Users/shuiqin/Documents/workspace/app/node/vm/vm.js:6:4)
 at Module._compile (module.js:570:32)
 at Object.Module._extensions..js (module.js:579:10)
 at Module.load (module.js:487:32)
 at tryModuleLoad (module.js:446:12)
 at Function.Module._load (module.js:438:3)
 at Module.runMain (module.js:604:10)


 2) 直接node命令行可以
 ➜  util node
 > vm.runInThisContext('1+1')
 2
 > var e = 0;
 undefined
 > vm.runInThisContext('e+1')
 1
 > var e = 2;
 undefined
 > vm.runInThisContext('e+1')
 3
* */