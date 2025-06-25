require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3001;

// USER ROUTES
const registerRouter = require("./components/auth/sign-up/register");
const loginRouter = require("./components/auth/sign-in/login");
const logoutRouter = require("./components/auth/logout/logout");
const refreshTokenRouter = require("./components/tokens/refreshToken");

// API ROUTES
const fuelPricesRouter = require("./components/features/online");
const quotesMarketDataRouter = require("./components/features/quotesMarketData");

// VEHICLES API ROUTES
const authGpsApiRouter = require("./components/gpsAPI/authGpsApi");
const vehiclesApiRouter = require("./components/gpsAPI/vehiclesApi");

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());
app.get("/check-db", (req, res) => {
	db.query("SHOW DATABASES", (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(results);
	});
});

// USER DATA
app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", logoutRouter);
app.use("/", refreshTokenRouter);

// GET API DATA
app.use("/", fuelPricesRouter);
app.use("/", quotesMarketDataRouter);

// GET VEHICLES API DATA
app.use("/", authGpsApiRouter);
app.use("/", vehiclesApiRouter);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}.`);
});
