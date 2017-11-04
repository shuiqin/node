/**
 * Created by shuiqin on 9/19/17.
 */
var domain = require('domain');
var d1 = domain.create();
d1.name = 'd1';
var d2 = domain.create();
d2.name = 'd2';
console.log('原始堆栈: ');
console.log('domain_stack1 %j', domain._stack);

d1.run(function () {
  console.log('d1对象');
  console.log(d1);
  console.log('运行d1对象后的堆栈内容: ');
  console.log('domain_stack2 %j', domain._stack);
});

d2.run(function () {
  console.log('d2对象');
  console.log(d2);
  console.log('运行d2对象后的堆栈内容: ');
  d2.exit();//exit将该对象从domain堆栈中被弹出
  d2.enter();//enter 将该对象再推入domain堆栈
  console.log('domain_stack3 %j', domain._stack);
});

console.log('domain_stack4 %j', domain._stack);

/*
*  运行完一个domain后 堆栈中当前domain对象被弹出堆栈,
*  后一个domain对象被推入domain堆栈。
*
* 原始堆栈:
 domain_stack1 []
 d1对象
 Domain {
 domain: null,
 _events: {},
 _eventsCount: 0,
 _maxListeners: undefined,
 members: [],
 name: 'd1' }
 运行d1对象后的堆栈内容:
 domain_stack2 [{"domain":null,"_events":{},"_eventsCount":0,"members":[],"name":"d1"}]
 d2对象
 Domain {
 domain: null,
 _events: {},
 _eventsCount: 0,
 _maxListeners: undefined,
 members: [],
 name: 'd2' }
 运行d2对象后的堆栈内容:
 domain_stack3 [{"domain":null,"_events":{},"_eventsCount":0,"members":[],"name":"d2"}]
 domain_stack4 []
* */