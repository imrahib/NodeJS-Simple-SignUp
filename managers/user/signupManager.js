var bcrypt = require("bcryptjs");
var User = require("../../model/User");
var getToken = require("../../authentication/tokenCreator")
var randomstring = require("randomstring");
var validateRequest = require("../../utils/requestValidator");

const signUp = async(req, res) => {

        validateRequest(req,res);
	const {email, password} = req.body;

	const userID = randomstring.generate({
		length: 7,
		charset: email + password
	});

	let user = await User.findOne({
		email: email
	});

	if (user) {
		return res.status(400).json({
			msg: "User Already Exists"
		});
	}

	user = new User({userID, email,	password});

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);

	await user.save();

	return getToken(userID, res)

}

module.exports = signUp;
