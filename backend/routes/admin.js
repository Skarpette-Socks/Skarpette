const adminController = require('../controllers/admin');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

//public routes
router.post('/login', adminController.login);

//private routes
router.post('/createAdmin', authMiddleware, adminController.createAdmin);
router.get('/', authMiddleware, adminController.getAllAdmins);
router.delete('/deleteAdmin/:id', authMiddleware, adminController.deleteAdmin);

module.exports = router;
