const router = require('express').Router();
const multer = require('multer');
const skarpetteController = require('../controllers/skarpette');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    },
});

router.get('/search', skarpetteController.getSkarpettesByNameOrVendorCode);
router.get('/filter', skarpetteController.getFilteredSkarpettes);
router.get('/favorites', skarpetteController.getFavotireSkarpettes);
router.get('/new', skarpetteController.getNewSkarpettes);
router.post('/', upload.array('images'), skarpetteController.createSkarpette);
router.delete('/:id', skarpetteController.deleteSkarpette);
router.get('/:id', skarpetteController.getSkarpetteById);
router.get('/', skarpetteController.getAllSkarpettes);
router.put('/:id', skarpetteController.updateSkarpette);

module.exports = router;
