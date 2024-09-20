const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const allposts = async () => {
	try {
		const posts = await prisma.post.findMany({
			where: { published: true },
		});
		return posts;
	} catch (err) {
		console.error(err);
	}
};

async function getSinglePost(id) {
	try {
		const post = await prisma.post.findMany({
			where: {
				id: id,
			},
			include: {
				comments: true,
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
		if (password === user.password) {
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

module.exports = {
	allposts,
	createPost,
	createUser,
	loginUser,
	createComment,
	getSinglePost,
};
