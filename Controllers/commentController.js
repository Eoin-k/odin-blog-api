const db = require("../prisma/queries");

createComment = async (req, res) => {
	const { content, authorId } = req.body;
	const id = Number(req.params.id);
	try {
		const newComment = await db.createComment(content, authorId, id);
		res.status(201).json(newComment);
		console.log(`Comment added to post with an id of: ${id}`);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating comment", error: error.message });
	}
};

module.exports = {
	createComment,
};
