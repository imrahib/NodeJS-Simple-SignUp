var Device = require("../../model/Device");
var randomstring = require("randomstring");
var validateRequest = require("../../utils/requestValidator");

var createDevice = async(req, res) => {

	validateRequest(req, res);
	const {name, devType} = req.body;

	const deviceID = randomstring.generate({
		length: 7,
		charset: name + devType
	});

	let device = await Device.findOne({
		deviceName: name
	});

	if (device)
		return res.status(400).json({
			msg: "Device Already Created",
			data: device
		});

	device = new Device({
		deviceID: deviceID,
		deviceName: name,
		devType: devType,
		users: [req.user.id]
	});

	await device.save();

	return res.status(200).json({
		message: "Device created"
	});
}

module.exports = createDevice;
