const Products = require("../models/products");
const fs = require("fs");
const path = require("path");

module.exports = {
  async storePageConfig(req, res) {
    const { id } = req.params;
    const { firsPartOpt } = req.body;

    try {
      await Products.findOneAndUpdate({ _id: id }, { $set: { firsPartOpt } });
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

  async storeDetailsConfig(req, res) {
    const { id } = req.params;
    const { detailsOpt } = req.body;

    try {
      await Products.findOneAndUpdate({ _id: id }, { $set: { detailsOpt } });
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

  async saveCards(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    const { header, color, description, bg } = req.body;

    try {
      await Products.findOneAndUpdate(
        { _id: id },
        {
          $push: { cards: { header, color, description, image: filename, bg } },
        }
      );
      return res.status(200).json({ message: "Card cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o card do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async saveLists(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    const { title, description } = req.body;

    try {
      await Products.findOneAndUpdate(
        { _id: id },
        { $push: { lists: { title, description, image: filename } } }
      );
      return res
        .status(200)
        .json({ message: "Item da lista cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar a lista do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async saveDetailsImages(req, res) {
    const { id } = req.params;
    const { filename } = req.file;

    try {
      const findImages = await Products.findOne({ _id: id });
      const imagesProducts = findImages.detailsImage;

      if (imagesProducts.length === 2) {
        let fileToDel = path.resolve(
          __dirname,
          "..",
          "..",
          "uploads",
          `${filename}`
        );
        await ulinkFile(fileToDel);
        return res.status(400).json({
          erro: "Você não pode mais cadastrar imagens para este produto",
        });
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

      await Products.findOneAndUpdate(
        { _id: id },
        { $push: { detailsImage: { image: filename } } }
      );
      return res.status(200).json({ message: "Imagem cadastrada com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar a imagem do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async saveDetailsList(req, res) {
    const { id } = req.params;
    const { title, description, firstItem } = req.body;

    try {
      const findFirst = await Products.findOne({ _id: id }).select(
        "detailsLists"
      );
      const arrayFirts = findFirst.detailsLists;
      const result = await arrayFirts.find((obj) => obj.firstItem === true);
      if (result && firstItem === true) {
        return res
          .status(400)
          .json({ erro: "Já existe um item setado para o topo da lista" });
      }
      await Products.findOneAndUpdate(
        { _id: id },
        { $push: { detailsLists: { title, description, firstItem } } }
      );
      return res.status(200).json({ message: "Lista cadastrada com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar a lista do produto",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async saveComments(req, res) {
    const { id } = req.params;
    const { filename } = req.file;

    try {
      await Products.findOneAndUpdate(
        { _id: id },
        { $push: { comments: { image: filename } } }
      );
      return res
        .status(200)
        .json({ message: "Comentário cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar comentário",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
