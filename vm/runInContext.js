/**
 * Created by shuiqin on 9/26/17.
 */
var vm = require('vm');
var obj = {num: 2};
var contex1 = vm.createContext(obj);
vm.runInContext('num= num+1', contex1);
console.log(contex1.num);

var contex2 = vm.createContext(obj);
vm.runInContext('num = num+2', contex2);
console.log(contex2.num);

/**  P363书上写的有出入
 *
 * num 被串改啦
 *
 * ➜  vm node runInContext.js
 5
 5
 ➜  vm node runInContext.js
 3
 5
 * */