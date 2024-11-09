const newController = require("../controllers/new");
const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post('/:vendor_code', authMiddleware, newController.createNew);
router.get('/:vendor_code', newController.getNewByVendorCode);
router.get('/', newController.getAllNews);
router.delete('/:id', authMiddleware, newController.deleteNew);

module.exports = router;
