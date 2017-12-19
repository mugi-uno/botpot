const express = require('express');
const router = express.Router();
const BotFactory = require('../../../lib/bot/BotFactory');
const SlackClient = require('../../../lib/slack/SlackClient');
const getChannels = require('../../../lib/slack/webclient/getChannels');

router.post('/start', async (req, res, next) => {
  const state = req.body;

  const client = new SlackClient(state);
  const bot = BotFactory.create(client);

  await bot.sync(state);
  bot.start({ token: state.token });

  res.send('success');
});

router.post('/stop', (req, res, next) => {
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
