var bcrypt = require("bcryptjs");
var User = require("../../model/User");
var getToken = require("../../authentication/tokenCreator")
var randomstring = require("randomstring");
var validateRequest = require("../../utils/requestValidator");

const login = async(req, res) => {

	validateRequest(req, res);

	const {email, password} = req.body;

	let user = await User.findOne({
		email: email
	});

	if (!user)
		return res.status(400).json({
			message: "User does Not Exist"
		});

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch)
		return res.status(400).json({
			message: "Incorrect Password !"
		});

	return getToken(user.userID, res);

}

module.exports = login;
