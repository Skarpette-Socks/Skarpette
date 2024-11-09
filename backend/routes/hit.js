const hitController = require('../controllers/hit');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:vendor_code',authMiddleware, hitController.createHit);
router.get('/:vendor_code', hitController.getHitByVendorCode)
router.get('/', hitController.getAllHits);
router.delete('/:id', authMiddleware, hitController.deleteHit);

module.exports = router;