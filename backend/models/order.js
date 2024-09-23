const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true,
    },
    items: [
        {
            skarpetteId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Skarpette',
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    orderDate: {
        type: String,
        required: true,
    },
    customerData: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    deliveryData: {
        deliveryType: {
            type: String,
            enum: ['НПВідділення', "НПКур'єр", 'НППоштомат', 'УПВідділення'],
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        departmentNumber: {
            type: String,
            required: true,
        },
    },
    paymentType: {
        type: String,
        enum: ['Card', 'Cash'],
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true,
    },
    isDifferentRecipient: {
        type: Boolean,
        default: false,
        required: true,
    },
    recipientData: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
