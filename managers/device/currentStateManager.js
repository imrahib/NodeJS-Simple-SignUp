var Device = require("../../model/Device");
var validateRequest = require("../../utils/requestValidator");

var changeDeviceState = async(req, res) => {

	validateRequest(req, res);
	const {name} = req.body;

	let device = await Device.findOne({
		deviceName: name
	});

	if (device) {
		if (device.users.includes(req.user.id)) {

			device.lastUpdated = Date.now();
			if (device.currentState == 0) {
				device.currentState = 1;
			} else {
				device.currentState = 0;
			}

			await device.save();

			return res.status(200).json({
				message: "Current State Changed"
			});
		} else {
			return res.status(400).json({
				message: "User does not have rights to Change current State of this device"
			});
		}
	} else {
		return res.status(400).json({
			message: "Device Name does not exists"
		});
	}
}

module.exports = changeDeviceState;
