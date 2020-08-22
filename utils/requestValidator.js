var {validationResult} = require("express-validator/check");

const validateRequest = function (req, res) {

	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(400).json({
			errors: errors.array()
		});

}

module.exports = validateRequest;
