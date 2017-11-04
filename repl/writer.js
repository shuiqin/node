/**
 * Created by shuiqin on 9/27/17.
 */
var repl = require('repl');
var util = require('util');
var msg = '';
function writer(obj) {
  return util.inspect(obj, {depth: 1, colors: true})
}
function test() {
  //console.log('test');
  msg = 'message';
}
repl.start({
  //writer: writer,
  useGlobal:true
});

test();
//注 msg读不到 与书不匹配p368 TODO
/*
* os.cpus()
 [ { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] },
 { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] },
 { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] },
 { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] },
 { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] },
 { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] },
 { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] },
 { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
 speed: 2200,
 times: [Object] } ]



*
* */