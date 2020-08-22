var Device = require("../../model/Device");
var User = require("../../model/User");
var validateRequest = require("../../utils/requestValidator");

var shareDevice = async(req, res) => {

	validateRequest(req, res);
	const {name, email} = req.body;

	let device = await Device.findOne({
		deviceName: name
	});

	if (device) {
		if (device.users.includes(req.user.id)) {
			let user = await User.findOne({
				email: email
			});

			if (user) {
				device.users.push(user.userID);
				await device.save();
				return res.status(200).json({
					message: "New User Added"
				});
			} else {
				return res.status(400).json({
					message: "User with email " + email + " does not exists."
				});
			}
		} else {
			return res.status(400).json({
				message: "User does not have rights add new userfor this device"
			});
		}
	} else {
		return res.status(400).json({
			message: "Device Name does not exists"
		});
	}
}

module.exports = shareDevice;
