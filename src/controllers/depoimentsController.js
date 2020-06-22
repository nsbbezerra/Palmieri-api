const Depoiments = require("../models/depoiments");
const config = require("../configs/index");
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { text, author } = req.body;

    try {
      await Depoiments.create({ avatar: filename, text, author });

      return res
        .status(200)
        .json({ message: "Depoimento cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o depoimento",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async remove(req, res) {
    const { id } = req.params;

    try {
      const depoiment = await Depoiments.findOne({ _id: id });

      const pathToImage = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${depoiment.avatar}`
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

      await Depoiments.findOneAndRemove({ _id: id });

      return res
        .status(200)
        .json({ message: "Depoimeto excluído com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao excluir o depoimento",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async index(req, res) {
    try {
      const depoiments = await Depoiments.find();
      const urlImage = config.photo_url;

      return res.status(200).json({ depoiments, urlImage });
    } catch (error) {
      const erro = {
        message: "Erro ao buscar os depoimentos",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
