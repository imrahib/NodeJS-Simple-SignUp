const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.body.token;

	if (!token) return res.status(401).json({
		message: "Auth Error"
	});

	try {
		const decoded = jwt.verify(token, "rndmStr");
		req.user = decoded.user;
		next();

	} catch (e) {
		console.error(e);
		res.status(400).send({
			message: "Invalid Token"
		});
	}
};
