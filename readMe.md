####  
node app.js

###字符串被输出到info.log文件中 start##
node app.js 1>info.log
error.log 类型是2
node app.js 2>info.log
###字符串被输出到info.log文件中 end##

###从第二个参数开始依次输出所有字符串 start###

###从第二个参数开始依次输出所有字符串 end###

### require.resolve()查看某个模块文件的带有完整绝对路径的文件名 使用它不会真的加载该模块 ### 
> require.resolve('./testModule.js')
'/Users/shuiqin/Documents/workspace/app/node/testModule.js'
### require.resolve()查看某个模块文件的带有完整绝对路径的文件名 ### 


### require.cache  已加载模块缓存区 p45  健值对### 
> delete require.cache[ '/Users/shuiqin/Documents/workspace/app/node/testModule.js']
true
> require.cache
{}


######node debug http.js###################
输入 cont  c 继续执行下面所有代码
next  n 执行下一行代码
step   s 进入函数内部执行第一行代码
out   o 执行完函数内其他代码 跳出函数

watch(i) // 没走一步 监控i的值
watchers //查看所有观察表达式的运行结果或变量的值
unwatch(i) //取消关注
##############
setBreakpoint(filename, line) // fileName可省略
sb(line)

clearBreakpoint(filename, line) //清除断点不管用
cb(filename, line)
###
###backtrace###
bt
backtrace //查看调用栈

#0 func5 backtrace.js:10:11
#1 func4 backtrace.js:12:9
#2 func3 backtrace.js:14:7
#3 func2 backtrace.js:16:5
#4 func1 backtrace.js:18:3


list(3) //当前所在代码前三行 后三行
###restart###
restart 重新开始脚本的调试
kill  //终止脚本文件的调试
run   // kill命令终止脚本文件的调试后 可使用run命令重新开始脚本文件的调试

debug> scripts  // 查看当前正在运行的文件及所有被加载的模块文件名称
* 58: app.js
  63: testModule.js
  
  debug> version  //V8 Javascript引擎的版本号
  4.5.103.35
  
  
##########  node-inspector 调试 ###############
node --debug-brk  app.js
node-inspector --web-port=3000
Visit http://127.0.0.1:3000/?port=5858 to start debugging
##########  node-inspector ###############

#######
require(’http.js’) // 不指定路径 默认从node_modules目录下读文件

####模块管理####
/  unix操作系统表示根目录
/ windows操作系统表示磁盘根目录

node_modules/ 一层层往父层寻找


#自定义module1
1) 建文件名 foo为module名。 下面放index.js默认自动加载index.js 

参考nodemoudle.js  及 node_modules/foo/index.js 

2) 也可以建package.json 映射加载哪个js
 "main": "./lib/foo.js",
####模块管理 寻找路径####
  paths:
   [ '/Users/shuiqin/Documents/workspace/app/node/node_modules',
     '/Users/shuiqin/Documents/workspace/app/node_modules',
     '/Users/shuiqin/Documents/workspace/node_modules',
     '/Users/shuiqin/Documents/node_modules',
     '/Users/shuiqin/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
#### 

#####包管理工具#####
一个目录
package.json  对包进行描述 根目录
bin     二进制文件
lib     javascript文件
doc     包及包的使用方法的文档
test    单元测试文件

#####包管理工具#####
########npm环境变量配置##########
npm 全局包路径查看
npm root -g
   /usr/local/lib/node_modules
npm config set prefix './shuiqin' //重置啦全局包路径
    /Users/shuiqin/Documents/workspace/app/node/shuiqin/lib/node_modules
npm config set prefix '/usr/local' // /lib/node_modules是自动添加的

npm list  当前目录下所安装的所有包
npm list  -g 全局包安装路径下安装的所有包
npm uninstall 包名 //卸载当前目录下安装的包
npm uninstall -g 包名 //卸载全局包安装目录下包
npm update 包名 //更新当前目录下安装的包
npm update 包名 -g //更新全局包安装目录下包
npm update 包名 //更新当前目录下安装的所有包
npm update 包名 -g //更新全局包安装目录下所有包
########npm环境变量配置##########

########Buffer###########
var bb = new Buffer(32) // 数字 表示容量大小
buffer.fill(3)
buffer.fill(1, 10);
buffer.fill(2, 20,  30)
new Buffer([1,2,3,4,5,6])  //数组 显示以16进制的形式显示
new Buffer("heellp", 'utf8') //字符串  ascii , utf8 utf16le ucs2
new Buffer("heeo",'utf8')
new Buffer("heeo",'ascii')
new Buffer("heeo",'utf8')
new Buffer("heeo",'utf16le')
new Buffer("heeo",'ucs2')
new Buffer("heeo",'base64')
new Buffer("heeo",'binary') // 不推荐使用 将废弃
new Buffer("heeo",'hex')

> new Buffer("heeo",'utf8')
<Buffer 68 65 65 6f>
> new Buffer("heeo",'ascii')
<Buffer 68 65 65 6f>
> new Buffer("heeo",'utf16le')
<Buffer 68 00 65 00 65 00 6f 00>
> new Buffer("heeo",'ucs2')
<Buffer 68 00 65 00 65 00 6f 00>
> new Buffer("heeo",'base64')
<Buffer 85 e7 a8>
> new Buffer("heeo",'binary')
<Buffer 68 65 65 6f>
> new Buffer("heeo",'hex')
<Buffer >
>
> new Buffer("heeo",'hex')
<Buffer>
########Buffer###########

######文件相关######
path.sep  文件分隔符 (\\ windows)  (/ UNIX)
path.delimiter 路径分隔符 (; windows) (: UNIX)
######文件相关######

###pipe####
telnet localhost 8421
telnet localhost 8441
###pipe####

##net类方法####
> net.isIP('231')  //不是ip地址
0
> net.isIP('127.0.0.1') // ip4地址
4
> net.isIP('2001:3860:a005::68') // ip6地址
6
>> net.isIPv4('127.0.0.1')
 true
 
 >  net.isIPv6('2001:3860:a005::68')
 true
 >  net.isIPv4('2001:3860:a005::68')
 false
######

命令 lsof -i tcp:port  （port替换成端口号，比如6379）可以查看该端口被什么程序占用，并显示PID，方便KILL

标签: lsof

ps -l |grep 1337 //查询进程信息 grep查询  ps:process -l: detail

###删除npm 包##

npm uninstall restful-router --save  删除npm 包

###删除npm 包##