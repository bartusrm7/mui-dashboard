const mysql = require("mysql2");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const db = mysql.createConnection({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "mui_dashboard",
	port: process.env.DB_PORT || 3306,
});

db.query(`CREATE TABLE IF NOT EXISTS userData (
	ID int PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(100) NOT NULL,
	userEmail VARCHAR(100) NOT NULL,
	userPassword VARCHAR (100) NOT NULL
)`);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

db.connect(error => {
	if (error) {
		console.error("Error connect:", error.stack);
		return;
	}
});

module.exports = db;
