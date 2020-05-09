const mongoose = require("../database/index");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  banner: String,
  firsPartOpt: { type: String, enum: ["lists", "cards"] },
  lists: [{ image: String, title: String, description: String }],
  cards: [
    { header: String, color: String, image: String, description: String },
  ],
  detailsOpt: { type: String, enum: ["images", "lists"] },
  detailsImage: [{ image: String }],
  detailsLists: [{ title: String, description: String, firstItem: Boolean }],
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
