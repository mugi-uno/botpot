const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bot = new Schema({
  token: String,
  running: Boolean,
  flows: [
    {
      name: String,
      trigger: {
        kind: String,
        data: {}
      },
      finisher: {
        kind: String,
        data: {}
      },
      actions: [
        {
          kind: String,
          data: {}
        }
      ]
    }
  ]
}, { minimize: false });

module.exports = mongoose.model('bot', Bot);
