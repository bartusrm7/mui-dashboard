require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../../../material-dashboard-database/database");
const { loginValidation } = require("./loginValidation");
const router = express.Router();

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) return res.status(401).json({ error: "Token is not provide" });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ error: "Invalid token" });

		req.user = user;
		next();
	});
}

router.post("/authorization", authenticateToken, (req, res) => {
	return res.status(200).json({ message: "User verified successfully", user: req.user });
});

router.post("/login", async (req, res) => {
	try {
		const { error } = loginValidation.validate(req.body);
		const { userEmail, userPassword } = req.body;
		if (error) {
			console.log("Validation error:", error.details[0].message);
			return res.status(400).json({ error: error.details[0].message });
		}

		const checkIsUserExistsQuery = `SELECT * FROM userData WHERE userEmail = ?`;
		db.query(checkIsUserExistsQuery, [userEmail], async (err, data) => {
			if (err) return res.status(500).json({ error: "Interval server error" });
			if (data.length === 0)
				return res.status(404).json({ error: "Użytkownik z tym adresem e-mail nie został znaleziony." });

			const user = data[0];
			const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
			if (!isPasswordValid) return res.status(401).json({ error: "Hasło jest nieprawidłowe" });

			const accessToken = jwt.sign({ userEmail }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: "15m",
			});
			const refreshToken = jwt.sign({ userEmail }, process.env.REFRESH_TOKEN_SECRET, {
				expiresIn: "30d",
			});

			res.cookie("accessToken", accessToken, {
				maxAge: 15 * 60 * 1000,
				secure: process.env.NODE_ENV === "production",
				httpOnly: false,
				sameSite: "Lax",
			});

			res.cookie("refreshToken", refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				secure: process.env.NODE_ENV === "production",
				httpOnly: false,
				sameSite: "Lax",
			});

			return res.status(200).json({ message: "User logged successfull" });
		});
	} catch (error) {
		console.error("Error in login route", error);
		return res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
