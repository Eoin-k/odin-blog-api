const { Router } = require("express");
const authcontroller = require("../Controllers/authController");
const authRouter = Router();
const passport = require("passport");
require("../Passport/passport");

authRouter.post("/signup", authcontroller.createUser);
authRouter.post("/login", authcontroller.loginUser);

module.exports = authRouter;
