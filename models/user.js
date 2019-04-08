const mongoose = require("mongoose");

//User schema
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  user: userModel
};