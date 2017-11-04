1) 协议不同： http协议 https协议
2) https服务需要向证书授证中心申请证书   
3） http传的是明文数据  https传输的是经过ssl安全加密后的密文数据
4)  http服务使用80端口 或 8080端口， https服务使用443端口

 握手成功：


1） 创建私钥 
openssl genrsa -out privatekey.pem 1024

 // 在openssl工具中使用命令创建密钥
openssl genrsa -out key.pem 1024

2) 创建证书签名请求文件
openssl req -new -key privatekey.pem -out certrequest.csr

3) 获取证书 证书是一个经过证书授权中心签名的文件 该证书文件内包含服务器端提供的公钥及证书的颁发机构等信息
x509表示该证书符合国际电信联盟制定的数字证书标准
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
Signature ok
subject=/C=CH/ST=CH/L=SHANGHAI/O=DIAN/emailAddress=sei_xsq@126.com
Getting Private key

3 )创建pfx文件
openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx

4)在这些文件具备后可以创建一个https服务器
