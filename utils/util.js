module.exports.parseJsonpToJson = function(jsonp) {
  return JSON.parse(jsonp.substring(jsonp.indexOf('(') + 1, jsonp.lastIndexOf(')')));
}