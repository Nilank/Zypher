var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  designation: String,
  address: String,
  interests: Array
});

module.exports = mongoose.model("Student", studentSchema);