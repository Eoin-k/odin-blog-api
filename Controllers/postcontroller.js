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
	const { title, content, published, authorId } = req.body;
	console.log(title, content, published);
	try {
		const newPost = await db.createPost(title, content, published, authorId);
		res.status(201).json(newPost);
		console.log("Post Created");
	} catch (error) {
		res
			.status(500)
			.json({ message: "that didnt work out", error: error.message });
	}
};

module.exports = {
	getAllPosts,
	createPost,
};
