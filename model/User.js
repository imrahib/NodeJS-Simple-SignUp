const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// export model user with the above defined UserSchema
module.exports = mongoose.model("user", UserSchema);
