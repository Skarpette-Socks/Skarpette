const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
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

const New = mongoose.model('New', newSchema);
module.exports = New;