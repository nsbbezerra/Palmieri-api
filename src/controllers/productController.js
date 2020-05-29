const Products = require("../models/products");
const Catalog = require("../models/portifilio");
const configs = require("../configs/index");
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { name, description, imageDescription } = req.body;

    try {
      const findProduct = await Products.findOne({ name });

      if (findProduct) {
        return res.status(400).send({ erro: "Produto já cadastrado" });
      }

      const product = await Products.create({
        name,
        description,
        image: filename,
        imageDescription,
      });

      return res
        .status(200)
        .json({ message: "Produto cadastrado com sucesso", id: product._id });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async saveBanner(req, res) {
    const { filename } = req.file;
    const { id } = req.params;
    try {
      await Products.findOneAndUpdate(
        { _id: id },
        { $set: { banner: filename } }
      );
      return res.status(200).json({ message: "Banner cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao salvar o banner do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async index(req, res) {
    try {
      const products = await Products.find().sort({ name: 1 });
      const urlImg = `${configs.photo_url}/img/`;

      return res.status(200).json({ products, urlImg });
    } catch (error) {
      const erro = {
        message: "Erro ao listar os produtos",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    try {
      const product = await Products.findOneAndUpdate(
        { _id: id },
        { $set: { name, description } },
        { new: true }
      );
      return res.status(200).json(product);
    } catch (error) {
      const erro = {
        message: "Erro ao atualizar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async remove(req, res) {
    const { id } = req.params;

    try {
      const product = await Products.findOne({ _id: id });
      const catalog = await Catalog.find({ product: id });
      const productLists = product.lists;
      const productCards = product.cards;
      const productsImages = product.detailsImage;

      if (catalog.length) {
        await catalog.forEach((element) => {
          let file = path.resolve(
            __dirname,
            "..",
            "..",
            "uploads",
            `${element.image}`
          );
          ulinkFile(file);
        });
      }

      if (product.firsPartOpt === "lists") {
        await productLists.forEach((element) => {
          let file = path.resolve(
            __dirname,
            "..",
            "..",
            "uploads",
            `${element.image}`
          );
          ulinkFile(file);
        });
      } else {
        await productCards.forEach((element) => {
          let file = path.resolve(
            __dirname,
            "..",
            "..",
            "uploads",
            `${element.image}`
          );
          ulinkFile(file);
        });
      }

      if (product.detailsOpt === "images") {
        await productsImages.forEach((element) => {
          let file = path.resolve(
            __dirname,
            "..",
            "..",
            "uploads",
            `${element.image}`
          );
          ulinkFile(file);
        });
      }

      if (product.comments.length) {
        await product.comments.forEach((element) => {
          let file = path.resolve(
            __dirname,
            "..",
            "..",
            "uploads",
            `${element.image}`
          );
          ulinkFile(file);
        });
      }

      const pathToBanner = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${product.banner}`
      );

      const pathToImage = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${product.image}`
      );

      await ulinkFile(pathToBanner);

      await ulinkFile(pathToImage);

      async function ulinkFile(filePath) {
        await fs.unlink(filePath, function (err) {
          if (err)
            return res.status(400).json({
              erro: {
                message: "Erro ao deletar o arquivo",
                type: err.message,
              },
            });
          console.log("file deleted successfully");
        });
      }

      await Products.findOneAndDelete({ _id: id });
      await Catalog.deleteMany({ product: id });

      return res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao apagar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async find(req, res) {
    const { id } = req.params;

    try {
      const product = await Products.findOne({ _id: id });
      const urlPhoto = `${configs.photo_url}/img`;
      return res.status(200).json({ product, urlPhoto });
    } catch (error) {
      const erro = {
        message: "Erro ao listar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
