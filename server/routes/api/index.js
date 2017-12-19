const express = require('express');
const router = express.Router();

router.use('/bot', require('./bot'));

module.exports = router;
