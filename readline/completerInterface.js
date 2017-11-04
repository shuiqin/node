/**
 * Created by shuiqin on 9/25/17.
 */
var readline = require('readline');
// tab补全函数
function completer(line) {
  var completions = 'help error quit aaa bbb ccc'.split(' ');
  var hits = completions.filter(function (c) {
    return c.indexOf(line) == 0
  });
  return [hits, line];
}

var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer
});

//一行读取完
r1.on('line', function (line) {
  if (line == 'exit' || line == 'quit' || line == 'q'){
    r1.close();
  } else if (line == 'pause'){
    r1.pause();
    setTimeout(function () {
      r1.resume(); //用户在pause是输入的数据将显示在命令行窗口中
    }, 10000);
  } else if (line == 'resume'){

  } else {
    console.log('您输入了: ' + line);
  }
});

r1.on('pause', function () {
  console.log('暂停数据读取');
});
r1.on('resume', function () {
  console.log('恢复数据读取');
});

r1.on('close', function () {
  console.log('行数据读取操作被终止');
});

/*
* dsjkfs
 您输入了: dsjkfs
 > aaa
 您输入了: aaa
 > help
 您输入了: help
 s
 您输入了: s
 > bbb
 您输入了: bbb
 行数据读取操作被终止
* */