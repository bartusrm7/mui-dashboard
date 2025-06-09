require("dotenv").config();
const express = require("express");
const router = express.Router();

router.post("/logout", async (req, res) => {
	try {
		if (!req.cookies.accessToken && !req.cookies.refreshToken) {
			return res.status(204).send();
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");

		res.status(204).json({ message: "User logged out successfully!" });
	} catch (error) {
		console.error("Error during logout:", error);
		return res.status(500).json({ error: "Internal server error!" });
	}
});

module.exports = router;
