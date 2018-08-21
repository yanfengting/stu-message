var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'db-student',
    // 多语句等于true
    multipleStatements:true
});

module.exports = pool;