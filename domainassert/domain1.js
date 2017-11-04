/**
 * Created by shuiqin on 9/19/17.
 */
var domain = require('domain');
var fs = require('fs');

var d = domain.create();
d.name = "domain~~";

d.on('error', function (err) {
  console.log('%s捕获到错误11!', d.name, err);
});

//方法1
/*
d.run(function () {
  process.nextTick(function () {
    setTimeout(function () {
      fs.open('non-existent.file', 'r', function (err, fd) {
        if(err){
          throw err;
        }
      });
    });
  });
});*/


// 方法2 : d.bind()
process.nextTick(function () {
  setTimeout(function () {
    fs.open('non-existent.file', 'r', d.bind(function (err, fd) {
      console.log('domain_stack %j', domain._stack);
      if(err){
        throw err; //使用bind必须throw
      }
      console.log('domain_stack %j', domain._stack);
    }));
  });
});

/* bind与intercept区别
bind: 回调函数中必须使用throw 关键字抛出该错误
intercept: 回调函数不需要抛出该错误 该错误直接被domain对象拦截
*
* */

// 方法3 : d.intercept()
/*
process.nextTick(function () {
  setTimeout(function () {
    fs.open('non-existent.file', 'r', d.intercept(function (err, fd) {
    }));
  });
});
*/

console.log('domain_stack %j', domain._stack);
