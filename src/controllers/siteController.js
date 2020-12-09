const Category = require("../models/categrory");
const Product = require("../models/products");
const Catalog = require("../models/portifilio");
const Comments = require("../models/depoiments");
const Models = require("../models/modelagem");
const Tabels = require("../models/tabelas");
const config = require("../configs/index");
const express = require("express");
const router = express.Router();

router.get("/home", async (req, res) => {
  try {
    const category = await Category.find({ active: true });
    const products = await Product.find({ active: true })
      .limit(10)
      .select("thumbnail imageDescription");
    const productsFooter = await Product.find({ active: true })
      .limit(5)
      .select("name");
    const comments = await Comments.find();

    const urlPhoto = config.photo_url;

    return res
      .status(200)
      .json({ category, products, productsFooter, comments, urlPhoto });
  } catch (error) {
    const erro = {
      message: "Erro ao buscar as informações",
      type: error.message,
    };
    return res.status(400).json(erro);
  }
});

module.exports = (app) => app.use("/", router);
