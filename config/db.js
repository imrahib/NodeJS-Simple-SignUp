const mongoose = require("mongoose");
//This URI will connect to a database "dbusers" in MongoDB
const uri = "mongodb://localhost:27017/dbusers";

const CreateConnection = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = CreateConnection;
