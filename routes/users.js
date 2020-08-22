var express = require("express");
var {check} = require("express-validator/check");
var router = express.Router();
var signUp = require("../managers/user/signupManager");
var login = require("../managers/user/loginManager");

var checkArray = [
	check("email", "Please enter a valid email").isEmail(),
	check("password", "Please enter a valid password").isLength({
		min: 4
	})
]

//Method for user signup
router.post("/signup", checkArray, async(req, res) => {
	try {
		return signUp(req, res);
	} catch (e) {
		console.error(e);
		res.status(400).json({
			message: "Server Error"
		});
	}
});

//method for user login
router.post("/login", checkArray, async(req, res) => {
	try {
		return login(req, res)
	} catch (e) {
		console.error(e);
		res.status(400).json({
			message: "Server Error"
		});
	}
});

module.exports = router;
