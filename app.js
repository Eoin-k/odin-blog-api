const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.listen(5000, () => console.log("App running & listening on port 5000"));
