const express = require('express');
const router = express.Router();
const startBot = require('../../../lib/bot/startBot');
const BotFactory = require('../../../lib/bot/BotFactory');
const getChannels = require('../../../lib/slack/webclient/getChannels');

router.post('/start', async (req, res, next) => {
  const state = req.body;

  const bot = await startBot(state, { forceStart: true });
  await bot.syncUpdate({ running: true });

  res.send('success');
});

router.post('/stop', async (req, res, next) => {
  const bot = BotFactory.currentBot();
  if (bot) {
    await bot.syncUpdate({ running: false });
  }

  BotFactory.destroyAll();
  res.send('success');
});

router.post('/sync', async (req, res, next) => {
  const state = req.body;

  // BOT起動前や停止時でもsyncしたい
  const bot = BotFactory.currentBot();
  if (!bot) {
    res.send('success');
    return;
  }

  await bot.sync(state);

  res.send('success');
});

router.get('/channels', async (req, res, next) => {
  const token = req.query.token;
  const channels = await getChannels(token).catch(() => []);
  res.send(channels);
});

module.exports = router;
