const Category = require("../models/categrory");
const Product = require("../models/products");
const Products = require("../models/products");

module.exports = {
  async findCategory(req, res) {
    try {
      let categories = new Array();

      const category = await Category.find();

      await category.forEach((element) => {
        let info = { value: element._id, label: element.name };
        categories.push(info);
      });

      return res.status(200).json({ categories });
    } catch (error) {
      const erro = {
        message: "Erro ao buscar as informações",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async findProduct(req, res) {
    try {
      let products = new Array();
      const product = await Products.find();

      await product.forEach((element) => {
        let info = { value: element._id, label: element.name };
        products.push(info);
      });

      return res.status(200).json({ products });
    } catch (error) {
      const erro = {
        message: "Erro ao buscar as informações",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
