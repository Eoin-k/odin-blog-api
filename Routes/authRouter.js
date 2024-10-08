const { Router } = require("express");
const authcontroller = require("../Controllers/authController");
const authRouter = Router();

authRouter.post("/signup", authcontroller.createUser);
authRouter.post("/login", authcontroller.loginUser);

module.exports = authRouter;
