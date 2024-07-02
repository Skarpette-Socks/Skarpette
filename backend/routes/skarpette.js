const router = require('express').Router();
const skarpetteController = require('../controllers/skarpette');

router.post('/', skarpetteController.createSkarpette);
router.delete('/:id', skarpetteController.deleteSkarpette);
router.get('/:id', skarpetteController.getSkarpetteById);
router.get('/', skarpetteController.getAllSkarpettes);
router.put('/:id', skarpetteController.updateSkarpette);
router.get('/search/:name', skarpetteController.getSkarpetteByName);

module.exports = router;
