require("dotenv").config();
const express = require("express");
const router = express.Router();

router.get("/get-all-vehicles", async (req, res) => {
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

router.get("/vehicle-localization", async (req, res) => {
	try {
		const { registration } = req.query;
		if (!registration) return res.status(400).json({ error: "Registration number is required" });

		const userNameGPSAuth = process.env.API_USER_NAME;
		const userPasswordGPSAuth = process.env.API_USER_PASSWORD;
		const authHeader = Buffer.from(`${userNameGPSAuth}:${userPasswordGPSAuth}`).toString("base64");

		const response = await fetch(`https://fleetapi-pl.cartrack.com/rest/vehicles/${registration}/status`, {
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
		return res.status(200).json(data.data.location);
	} catch (error) {
		console.error("Error in gps vehicle localization api route", error);
		return res.status(500).json({ error: "Server error" });
	}
});

router.get("/vehicle-date-localization", async (req, res) => {
	try {
		const { registration, date } = req.query;
		if (!registration || !date) return res.status(400).json({ error: "Registration number and date are required" });

		const userNameGPSAuth = process.env.API_USER_NAME;
		const userPasswordGPSAuth = process.env.API_USER_PASSWORD;
		const authHeader = Buffer.from(`${userNameGPSAuth}:${userPasswordGPSAuth}`).toString("base64");

		const response = await fetch(`https://fleetapi-pl.cartrack.com/rest/vehicles/${registration}/status`, {
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
		return res.status(200).json(data.data.location);
	} catch (error) {
		console.error("Error in gps vehicle localization api route", error);
		return res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
