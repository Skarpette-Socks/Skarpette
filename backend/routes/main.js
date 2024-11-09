const skarpetteRouter = require('./skarpette');
const orderRouter = require('./order');
const adminRouter = require('./admin');
const hitRouter = require('./hit');
const newRouter = require('./new');
const router = require('express').Router();

router.use('/skarpette', skarpetteRouter);
router.use('/order', orderRouter);
router.use('/admin', adminRouter);
router.use('/hit', hitRouter);
router.use('/new', newRouter);

module.exports = router;

