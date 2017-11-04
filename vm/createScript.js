/**
 * Created by shuiqin on 9/27/17.
 */
var vm = require('vm');
var globalVar = 0; // referenceError: globalVar is not defined
var script1 = vm.createScript('var globalVar = 0');
var script = vm.createScript('var globalVar = 0 ; globalVar+=1; console.log(globalVar);');
for (var i = 0; i < 100; i++){
  script.runInThisContext();
}

var obj = {
  globalVar :2
};

var script2 = vm.createScript(' globalVar+=1;');
for (var i = 0; i < 100; i++){
  script2.runInNewContext(obj); // 哦哦哦 runInNewContext后读不到全局console等
  //若改成runInThisContext 最后obj仍然是2
}

console.log(obj.globalVar); // 102

/*
2。。。
* 100
 101
 2
* */