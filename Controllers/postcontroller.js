const db = require("../prisma/queries");

getAllPosts = async (req, res) => {
	try {
		const posts = await db.allposts();
		res.json(posts);
	} catch (err) {
		console.error(err);
	}
};

createPost = async (req, res) => {
	const { title, content, published } = req.body;
	const authorId = 1;
	try {
		const newPost = await db.createPost(title, content, published, authorId);
		res.status(201).json(newPost);
	} catch (error) {
		res
			.status(500)
			.json({ message: "that didnt wok out", error: error.message });
	}
};

module.exports = {
	getAllPosts,
	createPost,
};
