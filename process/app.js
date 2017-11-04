/**
 * Created by shuiqin on 9/14/17.
 */
var cp = require('child_process');
var fs = require('fs');
var out = fs.openSync('./backmessage.txt', 'w');
var sp3 = cp.spawn('node', ['childprocess3.js'
], {
  detached: true,
  cwd:'./process',
  stdio: ['ignore', out, 'ignore'] // in out error
});

sp3.unref();
//sp3.unref();