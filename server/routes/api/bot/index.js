const express = require('express');
const router = express.Router();
const Bot = require('../../../models/bot');

router.get('/', async (req, res, next) => {
  const bot = await Bot.findOne().exec();
  res.send(bot);
});

router.use('/slack', require('./slack'));

module.exports = router;
