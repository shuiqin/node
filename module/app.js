/**
 * Created by shuiqin on 8/12/17.
 */
var foo = require('./foo.js');

var myFoo = new foo('shuiqin', 29);
console.log(myFoo.getName());
console.log(myFoo.getAge());
myFoo.setName("水芹啦啦");
myFoo.setAge(90);
console.log(myFoo.getName());
console.log(myFoo.getAge());

console.log(myFoo.name);
console.log(myFoo.age);
myFoo.name = 'test';
myFoo.age = 91;
console.log(myFoo.name);
console.log(myFoo.age);

console.log("获取类型变量值");
myFoo.staticName="Static name";
myFoo.staticFuction();