##安装mongodb###
官网下载
mongod -dbpath <用户挑选的磁盘文件夹名>

####node环境中执行mongodb数据库连接时###
npm install mongodb

###开服务器##
sudo mongod

show dbs

###mongoose###
给mongodb定义数据结构
参考
http://mongoosejs.com/docs/connections.html

###

###mongo客户端 mongobooster##
###mongo连接字符串###
mongoose.connect('mongodb://localhost/node-mongo-examples',{
