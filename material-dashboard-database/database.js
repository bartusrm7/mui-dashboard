const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "mui_dashboard",
	port: 3306,
});

db.query(`CREATE TABLE IF NOT EXISTS userData (
	ID int PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(100) NOT NULL,
	userEmail VARCHAR(100) NOT NULL,
	userPassword VARCHAR (100) NOT NULL
)`);

db.connect(error => {
	if (error) {
		console.error("Error connect:", error.stack);
		return;
	}
});

module.exports = db;
