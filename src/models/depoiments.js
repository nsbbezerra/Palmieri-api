const mongoose = require("../database/index");

const depoimentSchema = new mongoose.Schema({
  image: [
    {
      photo: String,
      title: String,
    },
  ],
  video: [
    {
      url: String,
    },
  ],
});

const Depoiments = mongoose.model("Depoiments", depoimentSchema);

module.exports = Depoiments;
