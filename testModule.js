/**
 * Created by shuiqin on 5/11/17.
 */
var tstVar = "This is a variable from testModule.js";


var outputTestVar = function outputTestVar(name) {
  console.log("This is a call from " + name + ".");


  console.log("__dirname111: " + __dirname);

  console.log("__filename111: " + __filename);
}

exports.tstVar = tstVar;
exports.outputTestVar = outputTestVar;