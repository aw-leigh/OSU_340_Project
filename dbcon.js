var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_wilsoan6',
  password        : 'redacted',
  database        : 'cs340_wilsoan6'
});
module.exports.pool = pool;
