const Product = require("../models/products");
const path = require("path");
const fs = require("fs");

module.exports = {
  async editInfo(req, res) {
    const { name, description } = req.body;
    const { id } = req.params;

    try {
      await Product.findOneAndUpdate(
        { _id: id },
        { $set: { name, description } }
      );
      return res.status(200).json({ message: "Produto Alterado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao editar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async changeBanner(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    try {
      const product = await Product.findOne({ _id: id });
      const pathToImage = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${product.banner}`
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

        await Product.findOneAndUpdate(
          { _id: id },
          { $set: { banner: filename } }
        );
        return res
          .status(200)
          .json({ message: "Banner atualizado com sucesso" });
      }
    } catch (error) {
      const erro = {
        message: "Erro ao editar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async changeImage(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    try {
      const product = await Product.findOne({ _id: id });
      const pathToImage = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${product.image}`
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

        await Product.findOneAndUpdate(
          { _id: id },
          { $set: { image: filename } }
        );
        return res
          .status(200)
          .json({ message: "Imagem atualizada com sucesso" });
      }
    } catch (error) {
      const erro = {
        message: "Erro ao editar o produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
