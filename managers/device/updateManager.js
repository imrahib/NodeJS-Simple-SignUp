var Device = require("../../model/Device");
var validateRequest = require("../../utils/requestValidator");

var editDevice = async(req, res) => {

	validateRequest(req, res);
	const {name, devType} = req.body;

	let device = await Device.findOne({
		deviceName: name
	});

	if (device) {
		if (device.users.includes(req.user.id)) {
			device.devType = devType;
			await device.save();
			return res.status(200).json({
				message: "Device updated"
			});
		} else {
			return res.status(400).json({
				message: "User does not have rights to update this device"
			});
		}
	} else {
		return res.status(400).json({
			message: "Device Name does not exists"
		});
	}
}

module.exports = editDevice;
