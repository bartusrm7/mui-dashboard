require("dotenv").config();
const express = require("express");
const router = express.Router();

router.get("/gps-auth-api", async (req, res) => {
	try {
		const userNameGPSAuth = process.env.API_USER_NAME;
		const userPasswordGPSAuth = process.env.API_USER_PASSWORD;
		const authHeader = Buffer.from(`${userNameGPSAuth}:${userPasswordGPSAuth}`).toString("base64");

		const response = await fetch("https://fleetapi-pl.cartrack.com/rest/aemp/iso15143-3/beta/equipment/SPI08167", {
			method: "GET",
			headers: {
				Authorization: `Basic ${authHeader}`,
				Accept: "application/iso15143-snapshot+json",
			},
		});
		if (!response.ok) {
			const errorText = await response.text();
			console.error(`API error ${response.status}: ${errorText}`);
			throw new Error(`API error ${response.status}`);
		}

		const data = await response.json();

		return res.status(200).json(data);
	} catch (error) {
		console.error("Error in gps auth api route", error);
		return res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
