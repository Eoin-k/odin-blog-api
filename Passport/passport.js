const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();
const jwtSecret = process.env.jwtSecret;

const options = {
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt"),
};

passport.use(
	new Strategy(options, async (jwt_payload, done) => {
		try {
			const user = await Prisma.user.findUnique({
				where: { id: jwt_payload.userId },
			});
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (err) {
			return done(err, false);
		}
	}),
);
