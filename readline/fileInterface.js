/**
 * Created by shuiqin on 9/25/17.
 */
var readline = require('readline');
var fs = require('fs');
var file = fs.createReadStream(__dirname + '/message.txt');
var out = fs.createWriteStream(__dirname + '/messageout.txt');
var index = 1;
out.write('line' + index + ": ");
index += 1;

var r1 =  readline.createInterface({
  input: file, // 输入
  output: out, // 输出 process.stdout,//
  terminal: true
});
r1.on('line', function (line) {
  console.log(line + index);
  if (line){
    r1.write('line' + index + ": "); // 可以使用interface对象的wirte向out写数据  out.write('line' + index + ": ");
    //r1.write('line' + index + ": ", {ctrl:true, name:'u'}); //模拟按下啦Ctrl+u组合键
    index += 1;
  }
});

//p343
file.on('end', function () {
  var buf = new Buffer('文件创建时间: ' + (new Date()).toLocaleString());
  r1.removeAllListeners('line'); //去掉添加行号事件⌚️
  r1.write('\r\n');
  r1.write(buf, {ctrl:true, name:'u'});
});

/*.
* 存在问题: 最后多啦 line5
* line1: 我是第一行.
 line2: 我是第二行.
 line3: 我是第三行.
 line4: 我是第四行.line5:
* */