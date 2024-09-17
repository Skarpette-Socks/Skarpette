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
        type: Date,
        default: Date.now,
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
    recipientData: {
        firstName: {
            type: String,
            validate: {
                validator: function (v) {
                    // Перевірка на існування recipientData та наявність першого елемента
                    return this.recipientData &&
                        this.recipientData[0] &&
                        this.recipientData[0].name
                        ? !!this.recipientData[0].phoneNumber
                        : true;
                },
                message:
                    'If recipient name is provided, phoneNumber must be provided as well.',
            },
        },
        lastName: {
            type: String,
            validate: {
                validator: function (v) {
                    // Перевірка на існування recipientData та наявність першого елемента
                    return this.recipientData &&
                        this.recipientData[0] &&
                        (this.recipientData[0].name ||
                            this.recipientData[0].phoneNumber)
                        ? !!this.recipientData[0].lastName
                        : true;
                },
                message:
                    'If recipient name or phoneNumber is provided, lastName must be provided as well.',
            },
        },
        phoneNumber: {
            type: String,
            validate: {
                validator: function (v) {
                    // Перевірка на існування recipientData та наявність першого елемента
                    return this.recipientData &&
                        this.recipientData[0] &&
                        this.recipientData[0].phoneNumber
                        ? !!this.recipientData[0].name
                        : true;
                },
                message:
                    'If recipient phoneNumber is provided, name must be provided as well.',
            },
        },
    },

    isCompleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
