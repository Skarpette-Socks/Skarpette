const Order = require('../models/order');
const { format } = require('date-fns');

const generateOrderNumber = async (orderDate) => {
    const datePart = format(orderDate, 'ddMMyy');
    const startOfDay = new Date(orderDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(orderDate.setHours(23, 59, 59, 999));

    const latestOrder = await Order.findOne({
        orderDate: { $gte: startOfDay, $lt: endOfDay },
    }).sort({ orderNumber: -1 });

    let sequenceNumber = '0001';

    if (latestOrder) {
        const latestOrderNumber = latestOrder.orderNumber;
        const latestSequence = latestOrderNumber.slice(-4);
        sequenceNumber = (parseInt(latestSequence, 10) + 1)
            .toString()
            .padStart(4, '0');
    }

    return `${datePart}${sequenceNumber}`;
};

const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const orderDate = new Date();
        orderData.orderNumber = await generateOrderNumber(orderDate);
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
