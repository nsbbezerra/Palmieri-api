const Portifolio = require("../models/portifilio");
const fs = require("fs");
const path = require("path");
const configs = require("../configs/index");

module.exports = {
  async store(req, res) {
    const { product } = req.body;
    const { filename } = req.file;

    try {
      await Portifolio.create({ product, image: filename });
      return res
        .status(200)
        .json({ message: "Portifólio cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o portifólio do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async index(req, res) {
    const { id } = req.params;

    try {
      const portifolio = await Portifolio.find({ product: id });
      const urlImage = `${configs.photo_url}/img/`;
      return res.status(200).json({ portifolio, urlImage });
    } catch (error) {
      const erro = {
        message: "Erro ao listar o portifólio do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async remove(req, res) {
    const { id } = req.params;

    try {
      const porifolio = await Portifolio.findOne({ _id: id });
      const pathToFile = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${porifolio.image}`
      );
      await ulinkFile(pathToFile);
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
      await Portifolio.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .json({ message: "Portifólio excluído com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao excluir o portifólio do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
