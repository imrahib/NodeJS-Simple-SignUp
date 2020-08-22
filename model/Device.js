const mongoose = require("mongoose");

const DeviceSchema = mongoose.Schema({
  deviceID: {
    type: String,
    required: true
  },
  deviceName: {
    type: String,
    required: true
  },
  devType: {
    type: String,
    required: true
  },
  currentState: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now()
  },
  users: {
    type: [String],
    required: true
  }
});

// export model user with the above defined UserSchema
module.exports = mongoose.model("device", DeviceSchema);
