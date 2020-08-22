var express = require("express");
var {check} = require("express-validator/check");
var router = express.Router();
var auth = require("../authentication/auth");
var createDevice = require("../managers/device/createManager");
var deleteDevice = require("../managers/device/deleteManager");
var editDevice = require("../managers/device/updateManager");
var readDevices = require("../managers/device/readingManager");
var changeDeviceState = require("../managers/device/currentStateManager");
var shareDevice = require("../managers/device/sharingManager");


//Method for device creation
router.post("/create", auth, 
        [
		check("name", "Please enter a valid device name.").not().isEmpty(),
		check("devType", "Please enter a valid dev type.").isIn(["AA", "AB", "AC", "BA", "BB", "BC"])
	],
	async(req, res) => {
		try {
			return createDevice(req, res);
		} catch (e) {
			console.error(e);
			res.status(400).json({
				message: "Server Error",
				error: e
			});
		}
	}
);


//method for device deletion
router.post("/delete", auth, 
        [
		check("name", "Please enter a valid name").not().isEmpty()
	],
	async(req, res) => {
		try {
			return deleteDevice(req, res);
		} catch (e) {
			console.error(e);
			res.status(400).json({
				message: "Server Error",
				error: e
			});
		}
	}
);


//Method for device updation
router.post("/edit", auth, 
        [
		check("name", "Please enter a valid device name.").not().isEmpty(),
		check("devType", "Please enter a valid dev type.").isIn(["AA", "AB", "AC", "BA", "BB", "BC"])
	],
	async(req, res) => {
		try {
			return editDevice(req, res);
		} catch (e) {
			console.error(e);
			res.status(400).json({
				message: "Server Error",
				error: e
			});
		}
	}
);


//Method to read all the devices
router.post("/read", auth, async(req, res) => {
	try {
		return readDevices(req, res);
	} catch (e) {
		console.error(e);
		res.status(400).json({
			message: "Server Error",
			error: e
		});
	}
});


//Method to change current device state ON/OFF
router.post("/currentState", auth, 
        [
		check("name", "Please enter a valid device name.").not().isEmpty()
	],
	async(req, res) => {
		try {
			return changeDeviceState(req, res);
		} catch (e) {
			console.error(e);
			res.status(400).json({
				message: "Server Error",
				error: e
			});
		}
	}
);


//Method to share device with another user
router.post("/share", auth, 
        [
		check("name", "Please enter a valid device name.").not().isEmpty(),
		check("email", "Please enter a valid email").isEmail()
	],
	async(req, res) => {

		try {
			return shareDevice(req, res);
		} catch (e) {
			console.error(e);
			res.status(400).json({
				message: "Server Error",
				error: e
			});
		}
	}
);


module.exports = router;
