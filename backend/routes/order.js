const router = require("express").Router();
const orderController = require("../controllers/order");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/checkAvailability", orderController.checkAvailability);
router.post("/", orderController.createOrder);
router.get("/", authMiddleware, orderController.getAllOrders);
router.get("/:id", authMiddleware, orderController.getOrderById);
router.delete("/:id", authMiddleware, orderController.deleteOrder);
router.put("/:id", authMiddleware, orderController.updateOrder);

module.exports = router;
