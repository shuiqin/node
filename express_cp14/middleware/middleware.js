/**
 * Created by shuiqin on 10/23/17.
 */
var setHeader = function () {
  return function (req, res, next) {
    res.statusCode = 200;
    res.header = {'Content-Type': 'text/html'};
    res.head = '<head><meta charset="utf-8" content="999"></head>';
    next();
  };
};
exports.setHeader = setHeader;