const passport = require("passport");

const authenticateUser = passport.authenticate("jwt", { session: false });

const authorise = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res
				.status(403)
				.json({ message: "You do not have permission to create this" });
		}
		next();
	};
};

module.exports = {
	authenticateUser,
	authorise,
};
