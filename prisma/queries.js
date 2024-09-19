const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const bcrypt = require("bcryptjs");

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
	console.log(email, password);
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});
		return user;
	} catch (error) {
		return {
			message: "An error occured. Unable to login",
			error: error.message,
		};
	}
}

module.exports = {
	allposts,
	createPost,
	createUser,
	loginUser,
};
