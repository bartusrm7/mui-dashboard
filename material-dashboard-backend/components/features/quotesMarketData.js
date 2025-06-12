const express = require("express");
const { parseStringPromise } = require("xml2js");
const router = express.Router();

async function usdPlnDataApi() {
	try {
		const response = await fetch("https://stooq.pl/q/l/?s=usdpln&f=sd2t2c&e=json");
		if (!response.ok) throw new Error("Error during getting api address");
		return await response.json();
	} catch (error) {
		throw new Error("Error parsing JSON from external USD/PLN API");
	}
}

async function gasOilDataApi() {
	try {
		const response = await fetch("https://stooq.pl/q/l/?s=lf.f&f=sd2t2c&e=json");
		if (!response.ok) throw new Error("Error during getting api address");
		return await response.json();
	} catch (error) {
		throw new Error("Error parsing JSON from external API");
	}
}

async function nbpUsdPlnDataApi() {
	try {
		const response = await fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd/");
		const xmlString = await response.text();

		const result = parseStringPromise(xmlString);
		if (!response.ok) throw new Error("Error during getting api address");
		return await response.json();
	} catch (error) {
		throw new Error("Error parsing JSON from external API");
	}
}

router.get("/usd-pln-exchange", async (req, res) => {
	try {
		const externalUSDPLNApi = await usdPlnDataApi();
		const apiData = externalUSDPLNApi.symbols[0];

		return res.status(200).json(apiData);
	} catch (error) {
		console.error("Error during getting fuel data:", error);
		return res.status(500).json({ error: "Internal server error!", error: error.message });
	}
});

router.get("/gas-oil-price", async (req, res) => {
	try {
		const externalGasOilDataApi = await gasOilDataApi();
		const apiData = externalGasOilDataApi.symbols[0];

		return res.status(200).json(apiData);
	} catch (error) {
		console.error("Error during getting fuel data:", error);
		return res.status(500).json({ error: "Internal server error!", error: error.message });
	}
});

router.get("/nbp-usd-pln-exchange", async (req, res) => {
	try {
		const externalNBPUSDPLNApi = await nbpUsdPlnDataApi();
		const apiData = externalNBPUSDPLNApi.symbols[0];

		return res.status(200).json(apiData);
	} catch (error) {
		console.error("Error during getting fuel data:", error);
		return res.status(500).json({ error: "Internal server error!", error: error.message });
	}
});

module.exports = router;
