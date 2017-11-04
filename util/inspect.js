/**
 * Created by shuiqin on 9/26/17.
 */
var util = require('util');
function testFunction(msg1, msg2) {
  return msg1 + msg2;
}

var parent = new Object();
parent.name = 'parent';
parent.func = testFunction;

var child1 = new Object();
child1.name = 'child1';

parent.child = child1;

var child2 = new Object();
child2.name = 'child2';

child1.child = child2;



var child3 = new Object();
child3.name = 'child3';

child2.child = child3;

//使用child2的自定义inscpect函数
//console.log(util.inspect(parent, {colors:false, depth:null,showHidden:false, customInspect: true})); //depth默认为2 colors属性值将应用各种颜色
child2.inspect = function (depth) {
  console.log(depth); //2
  return util.inspect(this, {colors: true, depth: depth -2 , customInspect: false});
}

util.inspect.styles.string = 'red';

//使用自定义inspect
/*parent.inspect = function () {
  return this.name;
}*/
/*
* ➜  util node inspect.js
 parent
 */
console.log(util.inspect(parent, {colors:false, depth:4,showHidden:false, customInspect: true})); //depth默认为2 colors属性值将应用各种颜色


/**
 *
 * //depth 为null
 *  util node inspect.js
 { name: 'parent',
   func:
    { [Function: testFunction]
      [length]: 2,
      [name]: 'testFunction',
      [arguments]: null,
      [caller]: null,
      [prototype]: testFunction { [constructor]: [Circular] } },
   child:
    { name: 'child1',
      child: { name: 'child2', child: { name: 'child3' } } } }

 // depth默认2
 ➜  util node inspect.js
 { name: 'parent',
   func:
    { [Function: testFunction]
      [length]: 2,
      [name]: 'testFunction',
      [arguments]: null,
      [caller]: null,
      [prototype]: testFunction { [constructor]: [Circular] } },
   child: { name: 'child1', child: { name: 'child2', child: [Object] } } }
 * */

/*
*showHidden:true
* util node inspect.js
 { name: 'parent',
 func:
 { [Function: testFunction]
 [length]: 2,
 [name]: 'testFunction',
 [arguments]: null,
 [caller]: null,
 [prototype]: testFunction { [constructor]: [Circular] } },
 child: { name: 'child1', child: { name: 'child2', child: [Object] } } }


 showHidden:false
 ➜  util node inspect.js
 { name: 'parent',
 func: [Function: testFunction],
 child:
 { name: 'child1',
 child: { name: 'child2', child: { name: 'child3' } } } }
* */