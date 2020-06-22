const Products = require("../models/products");
const configs = require("../configs/index");
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const {
      name,
      category,
      description,
      slug,
      video,
      imageDescription,
    } = req.body;
    const { filename } = req.file;

    try {
      const product = await Products.findOne({ name });
      if (product) {
        return res.status(400).json({ message: "Produto já cadastrado" });
      }
      await Products.create({
        name,
        category,
        description,
        thumbnail: filename,
        slug,
        video,
        imageDescription,
      });
      return res
        .status(200)
        .json({ message: "Produto cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async edit(req, res) {
    const {
      name,
      category,
      description,
      slug,
      video,
      imageDescription,
    } = req.body;
    const { filename } = req.file;
    try {
      const product = await Products.findOne({ name });
      if (product.thumbnail !== filename) {
        const pathToImage = path.resolve(
          __dirname,
          "..",
          "..",
          "uploads",
          `${product.thumbnail}`
        );

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

        await Products.findOneAndUpdate(
          { name: name },
          {
            $set: {
              name,
              category,
              description,
              thumbnail: filename,
              slug,
              video,
              imageDescription,
            },
          }
        );
        return res
          .status(200)
          .json({ message: "Produto alterado com sucesso" });
      } else {
        await Products.findOneAndUpdate(
          { name: name },
          {
            $set: {
              name,
              category,
              description,
              slug,
              video,
              imageDescription,
            },
          }
        );
        return res
          .status(200)
          .json({ message: "Produto alterado com sucesso" });
      }
    } catch (error) {
      const erro = {
        message: "Erro ao editar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async index(req, res) {
    try {
      const products = await Products.find();
      const urlImage = configs.photo_url;
      return res.status(200).json({ products, urlImage });
    } catch (error) {
      const erro = {
        message: "Erro ao buscar os produtos",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
