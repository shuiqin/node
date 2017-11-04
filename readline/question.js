/**
 * Created by shuiqin on 9/25/17.
 */
var readline = require('readline');
var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
r1.question("what do you think of node.js? ", function (answer) {
  console.log('谢谢您的回答, 您的评价为: ', answer);
  r1.close();
});