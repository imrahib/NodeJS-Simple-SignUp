var Device = require("../../model/Device");

var readDevices = async(req, res) => {

	var devices = await Device.find({});
	var returnableDevices = [];

	devices.forEach(device => {
		if (device.users.includes(req.user.id)) {
			returnableDevices.push(device);
		}
	});

	return res.status(200).json({
		message: "Devices read Successfully",
		devices: returnableDevices
	});
}

module.exports = readDevices;
