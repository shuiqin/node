/**
 * Created by shuiqin on 9/24/17.
 */
var dns = require('dns');
dns.resolve('www.baidu.com','A', function (e,r) { // A 是所有ipv4的地址
  if (e){
    console.log(e);
  }else {
    console.log('dns resolve %j', r);
  }
});

dns.reverse('115.239.211.112', function (err, domain) {
  if (err){
    console.log(err);
  } else {
    console.log(domain);
  }
});

//获取第一个地址
dns.lookup('www.baidu.com','4', function (e,r) { // 4 是所有ipv4的地址
  if (e){
    console.log(e);
  }else {
    console.log('dns lookup %j', r);
  }
});

// resolve提供的便捷方法  resove4 resolve6 resolveMx  ...
//dns ["2404:6800:4005:80b::2004"]
dns.resolve6('www.baidu.com', function (e,r) { // A 是所有ipv4的地址
  if (e){
    console.log(e);
  }else {
    console.log('google.com dns %j', r);
  }
});
dns.resolveMx('google.com.', function (e,r) { // A 是所有ipv4的地址
  if (e){
    console.log(e);
  }else {
    console.log('google.com dns %j', r);
  }
});
/*
* google.com : dns [{"exchange":"aspmx.l.google.com","priority":10},{"exchange":"alt3.aspmx.l.google.com","priority":40},
* {"exchange":"alt2.aspmx.l.google.com","priority":30},{"exchange":"alt1.aspmx.l.google.com","priority":20},
* {"exchange":"alt4.aspmx.l.google.com","priority":50}]
* **/

dns.resolveMx('www.google.com', function (e,r) { // A 是所有ipv4的地址
  if (e){
    console.log(e);
  }else {
    console.log('www.google.com dns %j', r);
  }
});
/**
 * www.google.com
 * { Error: queryMx ENODATA www.google.com
    at errnoException (dns.js:28:10)
    at QueryReqWrap.onresolve [as oncomplete] (dns.js:219:19)
  code: 'ENODATA',
  errno: 'ENODATA',
  syscall: 'queryMx',
  hostname: 'www.google.com' }
 * */

//www.google.com dns A ["172.217.25.4"]
//www.google.com dns AAAA ["2404:6800:4005:809::2004"]
//google.com AAAA dns ["2404:6800:4005:809::200e"]
//www.baidu.com A dns ["115.239.211.112","115.239.210.27"]