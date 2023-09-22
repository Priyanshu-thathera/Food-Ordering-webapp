const mongoose = require("mongoose")

//////// making schema //////////////
const userSchmea = mongoose.Schema({
    firstName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  });
  
  const userModel = mongoose.model("user", userSchmea);

  module.exports =userModel