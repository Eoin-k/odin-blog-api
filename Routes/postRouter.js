const { Router } = require("express");
const postController = require("../Controllers/postcontroller");
const commentController = require("../Controllers/commentController");
const postRouter = Router();
const passport = require("passport");
require("../Passport/passport");

postRouter.get("/", postController.getAllPosts);
postRouter.post(
	"/createpost",
	passport.authenticate("jwt", { session: false }),
	postController.createPost,
);

module.exports = postRouter;
