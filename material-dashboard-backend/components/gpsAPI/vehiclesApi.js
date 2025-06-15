require("dotenv").config();
const express = require("express");
const router = express.Router();

router.get("/get-vehicles", async (req, res) => {
	try {
		const userNameGPSAuth = process.env.API_USER_NAME;
		const userPasswordGPSAuth = process.env.API_USER_PASSWORD;
		const authHeader = Buffer.from(`${userNameGPSAuth}:${userPasswordGPSAuth}`).toString("base64");

		const response = await fetch("https://fleetapi-pl.cartrack.com/rest/vehicles", {
			method: "GET",
			headers: {
				Authorization: `Basic ${authHeader}`,
				"Content-type": "application/json",
			},
		});
		if (!response.ok) {
			const errorText = await response.text();
			console.error(`API error ${response.status}: ${errorText}`);
			throw new Error(`API error ${response.status}`);
		}
		const data = await response.json();
		return res.status(200).json(data.data[0]);
	} catch (error) {
		console.error("Error in gps get-vehicles api route", error);
		return res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
