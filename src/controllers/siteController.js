const Category = require("../models/categrory");
const Product = require("../models/products");
const Catalog = require("../models/portifilio");
const config = require("../configs/index");
const express = require("express");
const router = express.Router();

router.get("/home", async (req, res) => {
  try {
    const category = await Category.find({ active: true });
    const product = await Product.find({ active: true });
    const urlImage = config.photo_url;
    return res.status(200).json({ category, product, urlImage });
  } catch (error) {
    const erro = {
      message: "Erro ao buscar informações",
      type: error.message,
    };
    return res.status(400).json(erro);
  }
});

router.post("/productPage", async (req, res) => {
  const { finder, id, page } = req.body;

  try {
    let limit = 12;
    let skip = limit * (page - 1);
    const totalProducts = await Product.countDocuments();

    if (finder === 1) {
      const products = await Product.find({ active: true })
        .skip(skip)
        .limit(limit);
      const urlImage = config.photo_url;
      return res.status(200).json({ products, urlImage, totalProducts });
    }

    if (finder === 2) {
      const products = await Product.find({ category: id, active: true })
        .skip(skip)
        .limit(limit);
      const urlImage = config.photo_url;
      return res.status(200).json({ products, urlImage, totalProducts });
    }
  } catch (error) {
    const erro = {
      message: "Erro ao buscar informações",
      type: error.message,
    };
    return res.status(400).json(erro);
  }
});

router.post("/findProduct", async (req, res) => {
  const { id } = req.body;

  try {
    const product = await Product.findOne({ _id: id, active: true });
    const catalog = await Catalog.find({ product: product._id });
    const urlImage = config.photo_url;
    return res.status(200).json({ product, catalog, urlImage });
  } catch (error) {
    const erro = {
      message: "Erro ao buscar informações",
      type: error.message,
    };
    return res.status(400).json(erro);
  }
});

router.get("/category", async (req, res) => {
  try {
    const category = await Category.find({ active: true });
    const urlImage = config.photo_url;
    return res.status(200).json({ category, urlImage });
  } catch (error) {
    const erro = {
      message: "Erro ao buscar informações",
      type: error.message,
    };
    return res.status(400).json(erro);
  }
});

module.exports = (app) => app.use("/", router);
