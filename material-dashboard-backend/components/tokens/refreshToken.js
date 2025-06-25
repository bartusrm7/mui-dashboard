require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/refresh-token", async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		console.log(req.cookies.refreshToken);
		// if (!refreshToken) return res.status(401).json({ error: "Invalid refresh token" });

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) return res.status(403).json({ error: "Invalid token!" });

			const userEmail = decoded.userEmail;
			const accessToken = jwt.sign({ userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

			res.cookie("accessToken", accessToken, {
				maxAge: 15 * 60 * 1000,
				secure: true,
				httpOnly: true,
				sameSite: "None",
			});

			return res.status(200).json({ message: "Access token provided successfully!" });
		});
	} catch (error) {
		console.error("Error during refreshing token:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
