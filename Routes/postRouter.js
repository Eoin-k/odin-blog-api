const { Router } = require("express");
const postController = require("../Controllers/postcontroller");
const commentController = require("../Controllers/commentController");
const postRouter = Router();
const authmiddleware = require("../Middleware/auth");

postRouter.get("/", postController.getAllPosts);
postRouter.post(
	"/createpost",
	authmiddleware.authenticateUser,
	authmiddleware.authorise("ADMIN"),
	postController.createPost,
);

module.exports = postRouter;
