const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");

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

module.exports = {
	createUser,
};
