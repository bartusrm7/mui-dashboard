const mysql = require("mysql2");

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.PORT,
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
