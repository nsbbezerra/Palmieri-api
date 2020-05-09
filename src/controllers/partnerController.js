const Partner = require("../models/professional");
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { name, func } = req.body;
    const { filename } = req.file;

    try {
      await Partner.create({ name, func, avatar: filename });
      return res
        .status(200)
        .json({ message: "Profissional cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o profissional",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    const { name, func } = req.body;

    try {
      const professional = await Partner.findOne({ _id: id });
      const pathToFile = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${professional.avatar}`
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
      const newProfessional = await Partner.findOneAndUpdate(
        { _id: id },
        { $set: { name, func, avatar: filename } },
        { new: true }
      );
      return res.status(200).json(newProfessional);
    } catch (error) {
      const erro = {
        message: "Erro ao atualizar o profissional",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
  async remove(req, res) {
    const { id } = req.params;

    try {
      const professional = await Partner.findOne({ _id: id });
      const pathToFile = path.resolve(
        __dirname,
        "..",
        "..",
        "uploads",
        `${professional.avatar}`
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
      await Partner.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .json({ message: "Profissional excluído com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao excluir o profissional",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
