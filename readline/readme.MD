#####1)使用options参数并且使用options参数对象的completer属性来实现Tab补全功能 completerInterface.js####

当属性值函数中指定匹配字符串为 'help'  'error'  'quit'  'aaa' 'bbb' 与 'ccc'时 当用户在输入字符串种的一部分
并按下tab键时 应用程序将自动补全该字符串的剩余部分

#####2)读取一个文件中的数据并将读取到的每行数据写入另一个文件 fileInterface.js####

var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer,
  terminal: true  需要像一个终端那样实时地将输入数据流进行输出 且需要在输出数据中写入ANSI/VT100控制字符时 需要将该属性值设定为true  默认属性值等于output属性值对象的isTTY属性值
});

#####3)获取用户的输入 question.js####