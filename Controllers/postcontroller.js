const db = require("../prisma/queries");

getAllPosts = async (req, res) => {
	try {
		const posts = await db.allposts();
		res.json(posts);
	} catch (err) {
		console.error(err);
	}
};

adminAllPosts = async (req, res) => {
	try {
		const posts = await db.adminAllPosts();
		res.json(posts);
	} catch (error) {
		console.error(error);
	}
};

createPost = async (req, res) => {
	const { title, content, published, authorId } = req.body;
	console.log(title, content, published, authorId);
	try {
		const newPost = await db.createPost(title, content, published, Number(authorId));
		res.status(201).json(newPost);
		console.log("Post Created");
	} catch (error) {
		res.status(500).json({ message: "that didnt work out", error: error.message });
	}
};

getSinglePost = async (req, res) => {
	const id = Number(req.params.id);
	try {
		const post = await db.getSinglePost(id);
		res.status(200).json(post);
	} catch (error) {
		console.error(error);
	}
};

updatePost = async (req, res) => {
	const { title, content, published } = req.body;
	const id = Number(req.params.id);
	try {
		const updatePost = await db.updatePost(title, content, published, id);
		res.status(201).json(updatePost);
		console.log("Post has been updated");
	} catch (error) {
		res.status(500).json({ message: "Unable to update post", error: error.message });
	}
};

updatePublishStatus = async (req, res) => {
	const id = Number(req.params.id);
	const { status } = req.body;
	try {
		const statusUpdate = await db.updatePublishStatus(id, status);
		res.status(201).json(statusUpdate);
		console.log("status has been updated");
	} catch (error) {
		res
			.status(500)
			.json({ message: "unable to update post published status", error: error.message });
	}
};

deletePost = async (req, res) => {
	const id = req.params.id;
	try {
		const deletepost = db.deletePost(Number(id));
		res.status(204).json(deletepost);
		console.log("post deleted");
	} catch (error) {
		res.status(500).json({ message: "unable to delete", error: error.message });
	}
};

module.exports = {
	getAllPosts,
	createPost,
	getSinglePost,
	updatePost,
	updatePublishStatus,
	adminAllPosts,
	deletePost,
};
