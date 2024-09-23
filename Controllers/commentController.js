const db = require("../prisma/queries");

createComment = async (req, res) => {
	const { content, authorId, id } = req.body;
	console.log("comment request received");
	try {
		const newComment = await db.createComment(content, Number(authorId), Number(id));
		res.status(201).json(newComment);
		console.log(`Comment added to post with an id of: ${id}`);
	} catch (error) {
		res.status(500).json({ message: "Error creating comment", error: error.message });
	}
};

getPostComments = async (req, res) => {
	const id = Number(req.params.id);
	try {
		const comments = await db.getPostComments(id);
		res.status(200).json(comments);
	} catch (error) {
		console.error(error);
	}
};

deleteComment = async (req, res) => {
	const id = Number(req.params.id);
	try {
		const comment = await db.deleteComment(id);
		res.status(200).json(comment);
	} catch (error) {
		console.error(error);
	}
};

updateComment = async (req, res) => {
	const id = Number(req.params.id);
	const { editedComment } = req.body;
	try {
		const commentUpdate = await db.updateComment(id, editedComment);
		res.status(200).json(commentUpdate);
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	createComment,
	getPostComments,
	deleteComment,
	updateComment,
};
