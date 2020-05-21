const Depoiments = require("../models/depoiments");
const config = require("../configs/index");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const { title } = req.body;

    try {
      const depoiments = await Depoiments.find();

      if (depoiments.length) {
        let id = depoiments[0]._id;
        await Depoiments.findOneAndUpdate(
          { _id: id },
          { $push: { image: { photo: filename, title } } }
        );
      } else {
        await Depoiments.create({ image: { photo: filename, title } });
      }

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

  async sendVideo(req, res) {
    const { video } = req.body;
    console.log(video);
    try {
      const depoiments = await Depoiments.find();
      let id = depoiments[0]._id;

      await Depoiments.findOneAndUpdate(
        { _id: id },
        { $push: { video: { url: video } } }
      );

      return res.status(200).json({ message: "Video cadastrado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao cadastrar o video",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async updateImages(req, res) {
    const { images } = req.body;

    try {
      const depoiments = await Depoiments.find();
      let id = depoiments[0]._id;

      await Depoiments.findOneAndUpdate(
        { _id: id },
        { $set: { image: images } }
      );

      return res.status(200).json({ message: "Atualizado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao atualizar depoimentos",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async updateVideos(req, res) {
    const { videos } = req.body;

    try {
      const depoiments = await Depoiments.find();
      let id = depoiments[0]._id;

      await Depoiments.findOneAndUpdate(
        { _id: id },
        { $set: { video: videos } }
      );

      return res.status(200).json({ message: "Atualizado com sucesso" });
    } catch (error) {
      const erro = {
        message: "Erro ao atualizar depoimentos",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },

  async index(req, res) {
    try {
      const depoiments = await Depoiments.find();
      let allDepoiments = depoiments[0];
      let urlImages = `${config.photo_url}/img`;
      return res.status(200).json({ allDepoiments, urlImages });
    } catch (error) {
      const erro = {
        message: "Erro ao listar depoimentos",
        type: error.message,
      };
      return res.status(400).json(erro);
    }
  },
};
