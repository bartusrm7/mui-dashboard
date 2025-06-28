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

		const formattedDate = rcpDate.rcp_data.split(" ")[0].split("-").reverse().join(".");

		const flatExternalApi = externalApi.flat();
		const rpcONPriceLast15Days = flatExternalApi.filter(item => item.rpr_symbol === "ON B7 2011").slice(0, 15);
		const rpcPBPriceLast15Days = flatExternalApi.filter(item => item.rpr_symbol === "BENZYNA 95").slice(0, 15);
		const rpcHVOPriceLast15Days = flatExternalApi.filter(item => item.rpr_symbol === "HVO").slice(0, 15);

		res.status(200).json({
			dieselPrice: rpcONPrice?.rcp_cena_m,
			pb95Price: rpcPBPrice?.rcp_cena_m,
			hvoPrice: rpcHVOPrice?.rcp_cena_m,
			date: formattedDate,
			last15DaysONPrice: rpcONPriceLast15Days,
			last15DaysPB95Price: rpcPBPriceLast15Days,
			last15DaysHVOPrice: rpcHVOPriceLast15Days,
		});
	} catch (error) {
		console.error("Error during getting fuel data:", error);
		return res.status(500).json({ error: "Internal server error!", error: error.message });
	}
});

module.exports = router;
