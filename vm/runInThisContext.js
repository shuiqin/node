/**
 * Created by shuiqin on 9/26/17.
 */
var vm = require('vm');
vm.runInThisContext("var obj = {name:'shuiqin'}");
vm.runInThisContext("obj.func=function(){console.log(obj.name);};");
vm.runInThisContext("console.log('_' + obj.name);");
vm.runInThisContext("obj.func();");