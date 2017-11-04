/**
 * Created by shuiqin on 8/12/17.
 */
var _name, _age; // 私有变量
var name = '', age = 0; // 公有变量

//构造函数
var foo = function (name, age) {
  _name = name;
  _age = age;
}

foo.prototype.getName = function () {
  return _name;
}

foo.prototype.getAge = function () {
  return _age;
}

foo.prototype.setName = function (name) {
  _name = name;
}

foo.prototype.setAge = function (age) {
  _age = age;
}

this.staticName = '';
foo.prototype.staticFuction = function(){
  console.log("staticname:" + this.staticName);
}
// 公有变量
foo.prototype.name = name;
foo.prototype.age = age;


/*
* exports.tstVar = tstVar;
 exports.outputTestVar = outputTestVar;
 testModule
* **/
// 需要将模块定义为类时, 只能使用module.exports
module.exports = foo;