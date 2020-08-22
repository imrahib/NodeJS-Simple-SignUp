var Device = require("../../model/Device");
var validateRequest = require("../../utils/requestValidator");

var deleteDevice = async(req, res) => {

	validateRequest(req, res);
	const {name} = req.body;

	let device = await Device.findOne({
		deviceName: name
	});

	if (device) {
		if (device.users.includes(req.user.id)) {
			await device.remove();
			return res.status(200).json({
				message: "Device deleted"
			});
		} else {
			return res.status(400).json({
				message: "User does not have rights to delete this device"
			});
		}
	} else {
		return res.status(400).json({
			message: "Device Name does not exists"
		});
	}
}

module.exports = deleteDevice;
