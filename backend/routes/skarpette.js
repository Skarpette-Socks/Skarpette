const router = require('express').Router();
const multer = require('multer');
const skarpetteController = require('../controllers/skarpette');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.delete('/clear', skarpetteController.clearDB);
router.get('/search', skarpetteController.getSkarpettesByNameOrVendorCode);
router.get('/filter', skarpetteController.getFilteredSkarpettes);
router.post(
    '/',
    upload.fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'additional_images', maxCount: 3 },
    ]),
    skarpetteController.createSkarpette
);
router.delete('/:id', skarpetteController.deleteSkarpette);
router.get('/:id', skarpetteController.getSkarpetteById);
router.get('/', skarpetteController.getAllSkarpettes);
router.put('/:id', skarpetteController.updateSkarpette);

module.exports = router;
