const mongoose = require("mongoose");

const hitSchema = new mongoose.Schema({
    skarpetteId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Skarpette",
        unique: true
    },
    skarpetteVendorCode: {
        type: Number,
        required: true,
        ref: "Skarpette",
        unique: true
    }
})

const Hit = mongoose.model('Hit', hitSchema);
module.exports = Hit;