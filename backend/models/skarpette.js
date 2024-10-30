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
        enum: ['Men', 'Women', 'Child'],
        required: true,
    },
    style: [
        {
            type: String,
            required: true,
        },
    ],
    is_new: {
        type: Boolean,
        default: false,
    },
    is_hit: {
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
    //Поняття не маю, як її назвати
    is_new_main: {
        type: Boolean,
        default: false,
    },
});

function calculateDiscount(price, price2) {
    if (price2 && price2 < price) {
        const discount = ((price - price2) / price) * 100;
        return Math.ceil(discount);
    }
    return 0;
}

skarpetteSchema.pre('save', function (next) {
    if (this.size.length === 0 && getSizesByType(this.type)) {
        this.size = getSizesByType(this.type);
    }
    this.discountPercentage = calculateDiscount(this.price, this.price2);
    next();
});

const Skarpette = mongoose.model('Skarpette', skarpetteSchema);

module.exports = Skarpette;
