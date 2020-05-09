const mongoose = require("../database/index");

const professionalSchema = new mongoose.Schema({
  name: String,
  func: String,
  avatar: String,
});

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;
