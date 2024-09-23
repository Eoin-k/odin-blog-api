const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
require("dotenv").config();

const allposts = async () => {
	try {
		const posts = await prisma.post.findMany({
			where: { published: true },
			orderBy: {
				createdAt: "asc",
			},
		});
		return posts;
	} catch (err) {
		console.error(err);
	}
};

const adminAllPosts = async () => {
	try {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: "asc",
			},
		});
		return posts;
	} catch (err) {
		console.error(err);
	}
};

async function getSinglePost(id) {
	try {
		const post = await prisma.post.findFirst({
			where: {
				id: id,
			},
		});
		return post;
	} catch (error) {
		return error;
	}
}

async function createUser(username, email, password, role) {
	try {
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password,
				role: role || "USER",
			},
		});
		return newUser;
	} catch (error) {
		return {
			error,
		};
	}
}

async function createPost(title, content, published, authorId) {
	try {
		const newPost = await prisma.post.create({
			data: {
				title,
				content,
				published: published || false,
				authorId,
			},
		});
		return newPost;
	} catch (err) {
		return {
			message: "Oops looks like somehting happened with the server",
			err: err.message,
		};
	}
}

async function loginUser(email, password) {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});
		const match = await bcrypt.compare(password, user.password);

		if (match) {
			return user;
		} else {
			return "";
		}
	} catch (error) {
		return {
			message: "An error occured. Unable to login",
			error: error.message,
		};
	}
}

async function createComment(content, authorId, id) {
	try {
		const newComment = await prisma.comment.create({
			data: {
				content,
				authorId,
				postId: id,
			},
		});
		return newComment;
	} catch (error) {
		return {
			message: "error creating comment",
			error: error.message,
		};
	}
}

async function getPostComments(id) {
	try {
		const comments = await prisma.comment.findMany({
			where: { postId: id },
		});
		return comments;
	} catch (error) {
		return {
			message: "error getting comments",
			error: error.message,
		};
	}
}

async function deleteComment(id) {
	try {
		const comment = await prisma.comment.delete({
			where: { id },
		});
		return comment;
	} catch (error) {
		return {
			message: "error deleting comment",
			error: error.message,
		};
	}
}

async function updateComment(id, content) {
	try {
		const updatedComment = await prisma.comment.update({
			where: { id },
			data: {
				content,
			},
		});
		return updatedComment;
	} catch (error) {
		return {
			message: "error updating comment",
			error: error.message,
		};
	}
}

async function updatePost(title, content, published, id) {
	try {
		const updatedPost = await prisma.post.update({
			where: { id },
			data: {
				title: title,
				content: content,
				published: published,
			},
		});
		return updatedPost;
	} catch (error) {
		return {
			message: "error updating post",
			error: error.message,
		};
	}
}

async function updatePublishStatus(id, status) {
	try {
		const updatedPublishedStatus = await prisma.post.update({
			where: { id },
			data: {
				published: status,
			},
		});
		return updatedPublishedStatus;
	} catch (error) {
		return {
			message: "error updating post published status",
			error: error.message,
		};
	}
}

async function deletePost(id) {
	try {
		const deletedPost = await prisma.post.delete({
			where: { id: id },
		});
		return deletedPost;
	} catch (error) {
		return {
			message: "error trying to delete post",
			error: error.message,
		};
	}
}

module.exports = {
	allposts,
	createPost,
	createUser,
	loginUser,
	createComment,
	getSinglePost,
	getPostComments,
	updatePost,
	updatePublishStatus,
	adminAllPosts,
	deletePost,
	deleteComment,
	updateComment,
};
