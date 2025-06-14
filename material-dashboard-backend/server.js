const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3001;

// USER ROUTES
const registerRouter = require("./components/auth/sign-up/register");
const loginRouter = require("./components/auth/sign-in/login");
const logoutRouter = require("./components/auth/logout/logout");
const refreshTokenRouter = require("./components/tokens/refreshToken");

// API ROUTES
const fuelPricesRouter = require("./components/features/online");
const quotesMarketDataRouter = require("./components/features/quotesMarketData");

const authGpsApiRouter = require("./components/gpsAPI/authGpsApi");

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());

// USER DATA
app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", logoutRouter);
app.use("/", refreshTokenRouter);

// GET API DATA
app.use("/", fuelPricesRouter);
app.use("/", quotesMarketDataRouter);

app.use("/", authGpsApiRouter);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}.`);
});
