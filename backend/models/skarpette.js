const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true,
        },
        is_available: {
            type: Boolean,
            default: true,
        },
    },
    { _id: false }
);

const skarpetteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    price2: {
        type: Number,
    },
    vendor_code: {
        type: Number,
        required: true,
        unique: true,
    },
    color: [
        {
            type: String,
            required: true,
        },
    ],
    size: [sizeSchema],
    images_urls: [
        {
            type: String,
            required: true,
        },
    ],
    composition_and_care: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
    is_new: {
        type: Boolean,
        default: false,
    },
    is_favorite: {
        type: Boolean,
        default: false,
    },
    is_in_stock: {
        type: Boolean,
        default: true,
    },
    discountPercentage: {
        type: Number,
    },
});

skarpetteSchema.methods.calculateDiscount = function () {
    if (this.price2 && this.price2 < this.price) {
        const discount = ((this.price - this.price2) / this.price) * 100;
        return Math.ceil(discount);
    }
    return 0;
};

function getSizesByType(type) {
    const sizes = {
        Men: ['25-27', '27-29', '29-31'],
        Women: ['23-25', '25-27'],
        Child: ['16', '18', '19-21', '21-23', '23-25'],
    };

    return sizes[type].map((size) => ({ size, is_available: true }));
}

skarpetteSchema.pre('save', function (next) {
    if (this.size.length === 0 && getSizesByType(this.type)) {
        this.size = getSizesByType(this.type);
    }
    next();
});

const Skarpette = mongoose.model('Skarpette', skarpetteSchema);

module.exports = Skarpette;
