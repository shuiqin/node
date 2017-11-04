/**
 * Created by shuiqin on 8/12/17.
 */
var foo = require('foo');
console.log(module.id);
console.log("module.filename: " + module.filename);
console.log("module.loaded: " + module.loaded);
console.log("module.parent: " + module.parent);
console.log(module.parent);