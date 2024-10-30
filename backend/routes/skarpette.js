const router = require('express').Router();
const multer = require('multer');
const skarpetteController = require('../controllers/skarpette');
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|webp)$/)) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    },
});

router.get('/search', skarpetteController.getSkarpettesByNameOrVendorCode);
router.get('/filter', skarpetteController.getFilteredSkarpettes);
router.get('/hit', skarpetteController.getHitSkarpettes);
router.get('/newMain', skarpetteController.getNewMainSkarpettes);
router.post('/updateIsNewMain', skarpetteController.updateIsNewMain);
router.post('/updateIsHit', skarpetteController.updateIsHit);
router.post(
    '/',
    authMiddleware,
    upload.array('images'),
    skarpetteController.createSkarpette
);
router.delete('/:id', authMiddleware, skarpetteController.deleteSkarpette);
router.get('/:id', skarpetteController.getSkarpetteById);
router.get('/', skarpetteController.getAllSkarpettes);
router.put(
    '/:id',
    authMiddleware,
    upload.array('images'),
    skarpetteController.updateSkarpette
);

module.exports = router;
