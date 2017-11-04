/**
 * Created by shuiqin on 9/26/17.
 */
var util = require('util');

function Vehicle() {

}

Vehicle.prototype = {
  accerelate: function () {
    console.log('accerelate');
  }
}

function Bike() {

}

util.inherits(Bike, Vehicle); //child , parent

var bike = new Bike();

bike.accerelate();