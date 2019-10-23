const router = require('express').Router();

router.use('/rooms', require('./rooms'));
router.use('/player', require('./player'));

module.exports = router;
