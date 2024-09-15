const { Router } = require("express");
const authcontroller = require("../Controllers/authController");
const authRouter = Router();

authRouter.post("/createuser", authcontroller.createUser);

module.exports = authRouter;
