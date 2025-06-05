const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../../../material-dashboard-database/database");
const { registerValidation } = require("./registerValidation");

router.post("/register", async (req, res) => {
	try {
		const { error } = registerValidation.validate(req.body);
		const { userName, userEmail, userPassword } = req.body;
		if (error) {
			console.log("Validation error:", error.details[0].message);
			return res.status(400).json({ error: error.details[0].message });
		}

		const checkIsUserExistsQuery = `SELECT * FROM userData WHERE userEmail = ?`;
		db.query(checkIsUserExistsQuery, [userEmail], (err, data) => {
			if (err) return res.status(500).json({ error: "Internal server error" });
			if (data.length > 0) return res.status(409).json({ error: "User with this email is already exists" });

			const hashSalt = bcrypt.genSaltSync(8);
			const hashedPassword = bcrypt.hashSync(userPassword, hashSalt);

			const registerNewUserQuery = `INSERT INTO userData(userName, userEmail, userPassword) VALUES(?, ?, ?)`;
			db.query(registerNewUserQuery, [userName, userEmail, hashedPassword], err => {
				if (err) return res.status(500).json({ error: "Internal server error" });

				return res.status(201).json({ message: "User registered successfully" });
			});
		});
	} catch (error) {
		console.error("Error in register route", error);
		return res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
