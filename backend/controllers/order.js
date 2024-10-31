const Order = require('../models/order');
const { format } = require('date-fns');
const { DateTime } = require('luxon');
const crypto = require('crypto');

const getKyivTime = () => {
    return DateTime.now().setZone('Europe/Kyiv').toJSDate();
};

const generateOrderNumber = async () => {
    const orderDate = getKyivTime();
    const datePart = format(orderDate, 'ddMMyy');

    let sequenceNumber = '0001';
    let orderNumber = `${datePart}${sequenceNumber}`;

    let latestOrder = await Order.findOne({ orderNumber });

    while (latestOrder) {
        const latestSequence = orderNumber.slice(-4);
        sequenceNumber = (parseInt(latestSequence, 10) + 1)
            .toString()
            .padStart(4, '0');

        orderNumber = `${datePart}${sequenceNumber}`;

        latestOrder = await Order.findOne({ orderNumber });
    }

    return orderNumber;
};

const validateRecipientData = (orderData) => {
    if (orderData.isDifferentRecipient) {
        if (
            !orderData.recipientData.firstName ||
            !orderData.recipientData.lastName ||
            !orderData.recipientData.phoneNumber
        ) {
            return 'All fields must be filled';
        }
    } else {
        if (
            orderData.recipientData.firstName ||
            orderData.recipientData.lastName ||
            orderData.recipientData.phoneNumber
        ) {
            return 'No fields should be filled';
        }
    }
    return null;
};

const validateDeliveryData = (deliveryData) => {
    if (!deliveryData.deliveryType) {
        return 'Delivery type is missing';
    }

    if (deliveryData.deliveryType === "НПКур'єр") {
        if (!deliveryData.street || !deliveryData.apartmentNumber) {
            return `Street and Apartment Number should be filled for ${deliveryData.deliveryType}`;
        } else if (deliveryData.departmentNumber) {
            return `${deliveryData.deliveryType} does not require Department Number`;
        }
    } else {
        if (!deliveryData.departmentNumber) {
            return `Department Number should be filled for ${deliveryData.deliveryType}`;
        } else if (deliveryData.street || deliveryData.apartmentNumber) {
            return `${deliveryData.deliveryType} does not require Street or Apartment Number`;
        }
    }
};

function encrypt(text) {
    const algorithm = process.env.CRYPTO_ALGORITHM;
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY, 'hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(encryptedData) {
    const algorithm = process.env.CRYPTO_ALGORITHM;
    const key = Buffer.from(process.env.CRYPTO_SECRET_KEY, 'hex');
    if (typeof encryptedData !== 'string') {
        return;
    }

    const parts = encryptedData.split(':');
    if (parts.length !== 2) {
        throw new Error('Invalid encrypted data format.');
    }

    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const encryptObject = (obj) => {
    const encryptedObject = {};
    for (let key in obj) {
        if (typeof obj[key] === 'string' && key !== 'deliveryType') {
            encryptedObject[key] = encrypt(obj[key]);
        } else {
            encryptedObject[key] = obj[key];
        }
    }
    return encryptedObject;
};

const decryptObject = (obj) => {
    const decryptedObject = {};
    for (let key in obj) {
        if (typeof obj[key] === 'string' && key !== 'deliveryType') {
            decryptedObject[key] = decrypt(obj[key]);
        } else {
            decryptedObject[key] = obj[key];
        }
    }
    return decryptedObject;
};

const createOrder = async (req, res) => {
    try {
        let orderData = req.body;
        orderData.orderDate = getKyivTime();
        const recipientValidationError = validateRecipientData(orderData);
        if (recipientValidationError) {
            return res.status(400).json(recipientValidationError);
        }
        const deliveryValidationError = validateDeliveryData(
            orderData.deliveryData
        );

        if (deliveryValidationError) {
            return res.status(400).json(deliveryValidationError);
        }
        orderData.customerData = encryptObject(orderData.customerData);
        orderData.deliveryData = encryptObject(orderData.deliveryData);
        if (orderData.recipientData) {
            orderData.recipientData = encryptObject(orderData.recipientData);
        }
        orderData.orderNumber = await generateOrderNumber();
        const newOrder = await Order.create(orderData);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json('Order not found');
        }
        order.customerData = decryptObject(order.customerData);
        order.deliveryData = decryptObject(order.deliveryData);
        if (order.recipientData) {
            order.recipientData = decryptObject(order.recipientData);
        }
        res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json('Orders not found');
        }
        for (let order of orders) {
            order.customerData = decryptObject(order.customerData);
            order.deliveryData = decryptObject(order.deliveryData);
            if (order.recipientData) {
                order.recipientData = decryptObject(order.recipientData);
            }
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json('Order not found');
        }
        await order.deleteOne();
        res.status(200).json('Order has been deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id },
            updateData,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json('Order not found');
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    updateOrder,
};
