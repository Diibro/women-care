const mysql = require('mysql2');

function createConnection () {
    return mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "1220",
          database: "womenCare"
     });
}

module.exports = createConnection;