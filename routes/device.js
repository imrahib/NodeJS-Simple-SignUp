var express = require("express");
var { check, validationResult} = require("express-validator/check");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var router = express.Router();
var Device = require("../model/Device");
var auth = require("../authentication/auth");
var randomstring = require("randomstring");
var User = require("../model/User");


//Method for device creation
router.post(
    "/create",auth,
    [
        check("name", "Please enter a valid device name.").not().isEmpty(),
        check("devType", "Please enter a valid dev type.").isIn(["AA","AB","AC","BA","BB","BC"])
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            devType
        } = req.body;
        const deviceID = randomstring.generate({
            length: 7,
            charset: name+devType
        });
        try {
            let device =await Device.findOne({
                deviceName: name
            });
            if (device) {
                return res.status(400).json({
                    msg: "Device Already Created",
		    data: device 
                });
            }
            device = new Device({
                deviceID: deviceID,
                deviceName: name,
                devType: devType,
		users: [req.user.id]
            });

            await device.save();
	    res.status(200).json({
            message: "Device created"
          });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


//method for device deletion
router.post(
  "/delete",
  [
    check("name", "Please enter a valid name").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name } = req.body;
    try {
        let device = await Device.findOne({
                 deviceName: name
            });
	if(device)
        {
            if(device.users.includes(req.user.id))
            {
                 await device.remove();
                 return res.status(200).json({
                       message:"Device deleted"
                 });
            }
            else
            {
                return res.status(400).json({
                      message:"User does not have rights to delete this device"
                });
            }
        }
        else
        {
            return res.status(400).json({
	    message:"Device Name does not exists"
            });
        }   
} catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
	error: e
      });
    }
  }
);


//Method for device creation
router.post(
    "/edit",auth,
    [
        check("name", "Please enter a valid device name.").not().isEmpty(),
        check("devType", "Please enter a valid dev type.").isIn(["AA","AB","AC","BA","BB","BC"])
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            devType
        } = req.body;
        try {    

        let device = await Device.findOne({
                 deviceName: name
            });
        if(device)
        {
            if(device.users.includes(req.user.id))
            {
                 device.devType = devType;
                 await device.save();
                 return res.status(200).json({
                       message:"Device updated"
                 });
            }
            else
            {
                return res.status(400).json({
                      message:"User does not have rights to update this device"
                });
            }
        }
        else
        {
            return res.status(400).json({
            message:"Device Name does not exists"
            });
        }

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Updating");
        }
    }
);


router.post(
    "/read",auth,
    async (req, res) => {
        try {
        var devices = await Device.find({});
        var returnableDevices = [];
	devices.forEach(device => {
            if(device.users.includes(req.user.id))
            {
		returnableDevices.push(device);
            }
        });
                 return res.status(200).json({
                       message:"Device updated",
                       devices: returnableDevices
                 });

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Updating");
 }
    }
);




router.post(
    "/currentState",auth,
    [
        check("name", "Please enter a valid device name.").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name
        } = req.body;
        try {

        let device = await Device.findOne({
                 deviceName: name
            });
        if(device)
        {
            if(device.users.includes(req.user.id))
            {
                 device.lastUpdated = Date.now();
	         if(device.currentState == 0)
		 {
                    device.currentState = 1;
                 }
                 else
                 {
                    device.currentState = 0;
                 }
                 await device.save();
                 return res.status(200).json({
                       message:"Current State Changed"
                 });
            }
            else
            {
                return res.status(400).json({
                      message:"User does not have rights to Change current State of this device"
                });
            }
        }
        else
        {
            return res.status(400).json({
            message:"Device Name does not exists"
            });
        }

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Updating");
        }
    }
);


router.post(
    "/share",auth,
    [
        check("name", "Please enter a valid device name.").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail()
    ],
    async (req, res) => {

const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

         const {name, email} = req.body;
        try {

            let device = await Device.findOne({
                 deviceName: name
            });

        if(device)
        {
            if(device.users.includes(req.user.id))
            {
                let user = await User.findOne({
                        email: email
                 });
                 if(user)
                 {
                     device.users.push(user.userID);
                     await device.save();
                     return res.status(200).json({
                           message:"New User Added"
                     });
                 }
                 else
                 {
                     return res.status(400).json({
                           message:"User with email "+email+" does not exists."
                     });
                 }
            }
            else
            {
                return res.status(400).json({
                      message:"User does not have rights add new userfor this device"
                });
            }
        }
        else
        {
            return res.status(400).json({
            message:"Device Name does not exists"
            });
        }
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Updating");
 }
    }
);


//method to verify authentication works.
router.post("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.find({userID: req.user.id});
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


module.exports = router;
