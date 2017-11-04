/**
 * Created by shuiqin on 9/25/17.
 */

var readline = require('readline');
var r1 =  readline.createInterface({
  input: process.stdin, // 输入
  output: process.stdout // 输出
});

r1.setPrompt('请输入:', 7); //Prompt 命令行提示符修改
r1.prompt();  //使上面设置生效

//一行读取完
r1.on('line', function (line) {
  if (line == 'exit' || line == 'quit' || line == 'q'){
    r1.close();
  } else {
    console.log('您输入了: ' + line);
    r1.prompt(); //使上面设置生效
  }
});

r1.on('close', function () {
  console.log('行数据读取操作被终止');
  process.exit();
});

r1.on('SIGINT', function () {
  r1.question('Are you sure you want to exit? ', function (answer) {
    if(answer.match(/^y(es)?$/i)){
      r1.pause();
    }
  });
});

/**
 *
 * 1) r1.close
 * 2) EOT信号  Ctrl + D
 * 3) SIGINT信号  Ctrl + C
 *
 * 4) interface对象的input属性值对象的end事件被触发
 * */'

/*
* 请输入:sfds
 您输入了: sfds
 请输入:dsf
 您输入了: dsf
 请输入:ds
 您输入了: ds
 Are you sure you want to exit? no
 dsad
 您输入了: dsad
 请输入:da
 您输入了: da
 Are you sure you want to exit? yes
* */