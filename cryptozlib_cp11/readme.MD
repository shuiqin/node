###################
crypto模块实现加解密
zlib模块实现数据的压缩与解压缩处理
##################
 // 在openssl工具中使用命令创建私钥
openssl genrsa -out key.pem 1024
######hash  hmac  cipher#######
hash只有一个私钥
hmac需要公钥私钥
cipher: 总是返回一个被分块的加密数据 , 块的大小非常关键 若未足一块 则加密数据将缓存在cipher对象中
cipher: final方法强制将不足一块存放于缓存的数据返回加密数据并用PKCS填充方式来填充这个快 切不能再向cipher对象追加加密数据
######hash  hmac  cipher#######
#######4个与公钥加密相关的类##########
//4个与公钥加密相关的类
Cipher类: 加密数据
Decipher: 解密数据
Sign: 生成签名
Verify: 验证签名

// 
crypto.createCipher(algo, password); //算法: blowfish  aes-256-cbc   password: 加密是所使用的密码 二进制的字符串或一个Buffer对象 
crypto.createCipheriv(algo, password, iv);  //初始向量: 二进制的字符串或一个Buffer对象
cipher.update(data, [input_encoding], [output_encoding]); 
// 1)  二进制的字符串或一个Buffer对象 2) 'utf8', 'ascii', 'binary'未指定参数1必为buffer对象 3)'hex' 'binary' 'base64'
// 添加 outencoding后数据返回被编码的字符串, 否则返回加秘数据的Buffer对象


crypto.createDecipher(algo, password); //算法: blowfish  aes-256-cbc   password: 加密是所使用的密码 二进制的字符串或一个Buffer对象 
crypto.createDecipheriv(algo, password, iv);  //初始向量: 二进制的字符串或一个Buffer对象
decipher.update(data, [input_encoding], [output_encoding]); 
// 1)  二进制的字符串或一个Buffer对象 2)'hex' 'binary' 'base64' 未指定参数1必为buffer对象 3) 'utf8', 'ascii', 'binary'
// 若不指定 input_encoding data数据必为的Buffer对象
decipher.final([output_encoding])
#######私钥 & 公钥##########
hmac算法 只需要使用一个私钥 但使用公钥加密技术是, 需使用公钥及私钥

私钥: 用于解密数据, 及对数据进行签名 
公钥: 创建只有私钥的拥有者能够读出的加密数据, 以及对私钥拥有这的签名进行验证
#######私钥 & 公钥##########

#######私钥 & 公钥 创建##########
// 在openssl工具中使用命令创建私钥
openssl genrsa -out key.pem 1024

//根据私钥创建pem格式公钥 公钥必须为证书文件 
openssl req -key key.pem -new -x509 -out cert.pem
#######私钥 & 公钥 创建##########

#########签名########
私钥的拥有者可以在一段数据发送之前先对数据进行签名 
签名的过程中 将对这段数据执行加密处理  经过加密的数据发送出去后 
数据接受者通过公钥的使用来对该签名进行解密及验证操作  以确保数据是私钥拥有者发出的原始数据
 crypto.createSign(algo);
 sign.update(data); //指定需要被加密的数据  buffer对象或字符串
 sign.sign(private_key, [output_format]);// 这之后不能用update方法  1) pem格式的私钥 2) 签名输出时所用的编码格式
#########签名########

#########签名验证########
crypto.createVerify(algorithm); //该算法与加密数据时使用的算法保持一致
verify.update(data); //指定需要被验证的数据 ,, 可以多次update方法添加需要验证的数据
verify.verify(object, sign, [signature_format]); 
1) 验证时所用的对象, 参数值为一个字符串, 该字符串可以为一个RSA公钥 一个DSA公钥或一个X.509证书
2) signature参数值必须为sign对象 用于指定被验证的签名
3) 指定生成该签名是所使用的编码格式  "hex" , binary  base64
4) 若验证通过 返回true, 否则返回false
#########签名验证########