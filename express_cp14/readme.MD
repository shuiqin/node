###安装express##
npm install -g express

####express三种建服务器####

// http服务器被隐式闯将
app.listen(1337, '127.0.0.1');

// 创建http服务器并指定服务器监听地址及端口
http.createServer(app).listen(1338);

//创建https服务器并指定服务器监听地址及端口号
https.createServer(opts, app).listen(443); // opts 必须指定


#####
https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x
https://github.com/senchalabs/connect#middleware
