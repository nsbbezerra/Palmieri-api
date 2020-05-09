const mongoose = require('../database/index');

const depoimentSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    title: String,
    image: String
});

const Depoiments = mongoose.model('Depoiments', depoimentSchema);

module.exports = Depoiments;