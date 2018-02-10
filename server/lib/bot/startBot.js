const BotFactory = require('./BotFactory');
const SlackClient = require('../slack/SlackClient');

module.exports = async function (state, { forceStart = false } = {}) {
  const client = new SlackClient(state);
  const bot = BotFactory.create(client);

  await bot.sync(state);

  if (forceStart || state.running) {
    bot.start({ token: state.token });
  }

  return bot;
};
