const EventEmitter = require('events').EventEmitter;

module.exports = class BaseClient extends EventEmitter {
  start (state) {
    throw new Error('not implements error');
  }

  stop () {
    throw new Error('not implements error');
  }

  emitMessageReceived (message = {}) {
    this.emit('messageReceived', message);
  }

  sendMessage () {
    throw new Error('not implements error');
  }
};
