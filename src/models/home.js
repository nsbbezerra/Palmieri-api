const mongoose = require("../database/index");

const homeSchema = new mongoose.Schema({
  banner: String,
  video: String,
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
