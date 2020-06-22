const mongoose = require("../database/index");

const portifolioSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  image: String,
  imageDescription: String,
});

const Portifolio = mongoose.model("Portifolio", portifolioSchema);

module.exports = Portifolio;
