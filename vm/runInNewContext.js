/**
 * Created by shuiqin on 9/26/17.
 */
var vm = require('vm');
var obj = {name:""};
vm.runInNewContext("name='shuiqin'", obj);
vm.runInNewContext("age=70", obj);
console.log(obj.name);
console.log(obj.age);

/*
* ➜  vm node runInNewContext.js
 shuiqin
 70
* */

//注  独立的上下文环境中的变量或对象 被修改后 不能返回到其初始状态
// 可用createContex 与 runInContext

// runInContext执行效率比runInNewContext高