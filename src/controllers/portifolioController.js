const Portifolio = require("../models/portifilio");
const fs = require("fs");
const path = require("path");
const configs = require("../configs/index");

module.exports = {
  async create(req, res) {
    const { filename } = req.file;
    const { product, imageDescription } = req.body;

    try {
      await Portifolio.create({
        product,
        imageDescription,
        image: filename,
        active: true,
      });
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
      const urlImage = configs.photo_url;
      return res.status(200).json({ catalog, urlImage });
    } catch (error) {
      const erro = {
        message: "Erro ao buscar o item do catálogo",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async active(req, res) {
    const { active } = req.body;
    const { id } = req.params;
    try {
      await Portifolio.findOneAndUpdate(
        { _id: id },
        { $set: { active: active } }
      );
      return res
        .status(200)
        .json({ message: "Item ativado/bloqueado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao ativar/bloquear o item do catálogo",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
