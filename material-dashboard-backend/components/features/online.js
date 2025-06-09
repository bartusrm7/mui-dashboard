require("dotenv").config();
const express = require("express");
const router = express.Router();

async function fuelDataApi() {
	try {
		const response = await fetch("https://beta.eg.com.pl/cenypaliwjson");
		if (!response.ok) throw new Error("Error during getting api address");
		return await response.json();
	} catch (error) {
		throw new Error("Error parsing JSON from external API");
	}
}

router.get("/fuel-data", async (req, res) => {
	try {
		const externalApi = await fuelDataApi();

		const rcpDate = externalApi[0].find(item => item.rcp_data);
		const rpcONPrice = externalApi[0].find(item => item.rpr_symbol === "ON B7 2011");
		const rpcPBPrice = externalApi[0].find(item => item.rpr_symbol === "BENZYNA 95");
		const rpcHVOPrice = externalApi[0].find(item => item.rpr_symbol === "HVO");

		const formattedDate = rcpDate.rcp_data.split(" ")[0];

		res.status(200).json({
			dieselPrice: rpcONPrice.rcp_cena_l,
			pb95Price: rpcPBPrice.rcp_cena_l,
			hvoPrice: rpcHVOPrice.rcp_cena_l,
			date: formattedDate,
		});
	} catch (error) {
		console.error("Error during getting fuel data:", error);
		return res.status(500).json({ error: "Internal server error!", error: error.message });
	}
});

module.exports = router;
