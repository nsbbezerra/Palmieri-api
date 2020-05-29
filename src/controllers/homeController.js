const Home = require("../models/home");
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { video } = req.body;

    try {
      const home = await Home.find();
      if (home.length) {
        const pathToImage = path.resolve(
          __dirname,
          "..",
          "..",
          "uploads",
          `${home[0].banner}`
        );
        await ulinkFile(pathToImage);
        await Home.findOneAndUpdate(
          { _id: home[0]._id },
          { $set: { banner: filename, video } }
        );
      } else {
        await Home.create({ banner: filename, video });
      }

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

      return res
        .status(200)
        .json({ message: "Configurações salvas com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar as configurações da página",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async index(req, res) {
    try {
      const home = Home.find();
      let info = home[0];
      return res.status(200).json(info);
    } catch (error) {
      const erro = {
        message: "Erro ao listar as configurações da página",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
