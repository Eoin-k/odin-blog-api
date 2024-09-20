const { Router } = require("express");
const postController = require("../Controllers/postcontroller");
const commentController = require("../Controllers/commentController");
const postRouter = Router();
const passport = require("passport");
require("../Passport/passport");

postRouter.get("/", postController.getAllPosts);
postRouter.get("/post/:id", postController.getSinglePost);
postRouter.post(
	"/createpost",
	passport.authenticate("jwt", { session: false }),
	postController.createPost,
);
postRouter.post(
	"/post/:id/comments",
	passport.authenticate("jwt", { session: false }),
	commentController.createComment,
);

module.exports = postRouter;
