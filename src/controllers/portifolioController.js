const Portifolio = require("../models/portifilio");
const fs = require("fs");
const path = require("path");
const configs = require("../configs/index");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { product, imageDescription } = req.body;

    try {
      await Portifolio.create({ product, imageDescription, image: filename });
      return res
        .status(200)
        .json({ message: "Item do catálogo cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o item do catálogo",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async remove(req, res) {
    const { id } = req.params;

    try {
      const catalog = await Portifolio.findOne({ _id: id });

      const pathToImage = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${catalog.image}`
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

      await Portifolio.findOneAndRemove({ _id: id });

      return res
        .status(200)
        .json({ message: "Item do catálogo excluído com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o item do catálogo",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async show(req, res) {
    const { product } = req.params;
    try {
      const catalog = await Portifolio.find({ product: product });
      return res.status(200).json({ catalog });
    } catch (error) {
      const erro = {
        message: "Erro ao buscar o item do catálogo",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
