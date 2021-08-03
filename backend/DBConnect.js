const mysql = require('mysql');

const db = mysql.createConnection({
   host: "localhost",
   user: "yanou92",
   password: "groupomania",
   database: "groupomania"
 });

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!")});
    
module.exports = db;