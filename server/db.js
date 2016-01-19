
module.exports = function(){
  var low = require('lowdb');
  var db = low('db/components.json');

  return db;
};
