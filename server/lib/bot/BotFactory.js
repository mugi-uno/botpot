const Bot = require('./Bot');

class BotFactory {
  constructor () {
    this.bot = null;
  }

  currentBot () {
    return this.bot;
  }

  create (client) {
    if (this.bot) {
      return this.bot;
    }

    this.bot = new Bot(client);
    return this.bot;
  }

  destroyAll () {
    if (!this.bot) return;
    this.bot.stop();
    this.bot = null;
  }
}

module.exports = new BotFactory();
