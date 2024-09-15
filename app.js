const express = require("express");
const passport = require("passport");
const authRouter = require("./Routes/authRouter");
const postRouter = require("./Routes/postRouter");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(authRouter);
app.use(postRouter);

app.listen(5000, () => console.log("App running & listening on port 5000"));
