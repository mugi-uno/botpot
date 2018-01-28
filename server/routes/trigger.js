const express = require('express');
const router = express.Router();
const BotFactory = require('../lib/bot/BotFactory');

router.get('/:token', async (req, res, next) => {
  const bot = BotFactory.currentBot();
  if (!bot || !req.params.token) {
    res.send('success');
    return;
  }

  bot.emit('urlReceived', req.params);

  res.send('success');
});

module.exports = router;
