const Products = require("../models/products");
const Partners = require("../models/professional");
const Portifolio = require("../models/portifilio");

module.exports = {
  async dashboard(req, res) {
    try {
      const products = await Products.find().countDocuments();
      const partners = await Partners.find().countDocuments();
      const portifilio = await Portifolio.find().countDocuments();

      return res.status(200).json({ products, partners, portifilio });
    } catch (error) {
      const erro = {
        message: "Ocorreu um Erro ao buscar as Informações",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async findProducts(req, res) {
    try {
      var listProducts = [];
      const products = Products.find();
      (await products).forEach((prod) => {
        let info = { value: prod._id, label: prod.name };
        listProducts.push(info);
      });

      return res.status(200).json({ listProducts });
    } catch (error) {
      const erro = {
        message: "Ocorreu um Erro ao buscar as Informações",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
