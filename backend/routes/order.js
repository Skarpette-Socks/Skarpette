const router = require('express').Router();
const orderController = require('../controllers/order');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id', orderController.updateOrder);

module.exports = router;
