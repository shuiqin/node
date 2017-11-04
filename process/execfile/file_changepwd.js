/**
 * Created by shuiqin on 9/15/17.
 */
var callfile = require('child_process');
var ip = '1.1.1.1';
var username = 'test';
var password = 'pwd';
var newpassword = 'newpwd';

callfile.execFile('change_password.sh',['-H', ip, '-U', username, '-P', password, '-N', newpassword],null,function (err, stdout, stderr) {
});