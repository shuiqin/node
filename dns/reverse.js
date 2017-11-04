/**
 * Created by shuiqin on 9/24/17.
 */
var dns = require('dns');
dns.reverse('172.217.25.4', function (err, domain) {
  if (err){
    console.log(err);
  } else {
    console.log(domain);
  }
});


//[ 'UNKNOWN-202-165-102-X.yahoo.com' ]
dns.reverse('202.165.102.205', function (err, domain) {
  if (err){
    console.log(err);
  } else {
    console.log(domain);
  }
});

/*
*172.217.25.4  [ 'hkg07s24-in-f4.1e100.net' ]
* */