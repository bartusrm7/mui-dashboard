const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3001;

const registerRouter = require("./components/auth/sign-up/register");
const loginRouter = require("./components/auth/sign-in/login");
// const logoutRouter = require("./components/auth/logout/logout");
// const authRouter = require("./components/auth/authUser");

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());

app.use("/", registerRouter);
app.use("/", loginRouter);
// app.use("/", logoutRouter);
// app.use("/", authRouter);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}.`);
});
