const express = require("express");
const passport = require("passport");
const authRouter = require("./Routes/authRouter");
const postRouter = require("./Routes/postRouter");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
require("./Passport/passport");

const app = express();
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(authRouter);
app.use(postRouter);

app.listen(5000, () => console.log("App running & listening on port 5000"));
