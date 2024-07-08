const router = require('express').Router();
const skarpetteController = require('../controllers/skarpette');

router.get('/search', skarpetteController.getSkarpettesByNameOrVendorCode);
router.post('/', skarpetteController.createSkarpette);
router.delete('/:id', skarpetteController.deleteSkarpette);
router.get('/:id', skarpetteController.getSkarpetteById);
router.get('/', skarpetteController.getAllSkarpettes);
router.put('/:id', skarpetteController.updateSkarpette);

module.exports = router;
