const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

createUser = async (req, res) => {
	const { username, email, password, role } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const newUser = await db.createUser(username, email, hashedPassword, role);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong creating a user",
			error: error.message,
		});
	}
};

loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await db.loginUser(email, password);
		if (!user.username) {
			return res.status(400).json({ message: "invalid login details" });
		} else {
			const token = jwt.sign(
				{
					userId: user.id,
					username: user.username,
					role: user.role,
				},
				process.env.jwtSecret,
				{
					expiresIn: "1h",
				},
			);
			return res.json({
				token: "Bearer " + token,
				user: user.username,
				role: user.role,
				id: user.id,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong checking details",
			error: error.message,
		});
	}
};

module.exports = {
	createUser,
	loginUser,
};
