const { Router } = require("express");
const postController = require("../Controllers/postcontroller");
const commentController = require("../Controllers/commentController");
const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.post("/createpost", postController.createPost);

module.exports = postRouter;
