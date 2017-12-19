const BotModel = require('../../models/bot');
const actions = require('../common/actions');
const scheduler = require('./Scheduler');
const _ = require('lodash');

module.exports = class Bot {
  constructor (client) {
    this.started = false;
    this.client = client;
  }

  start (configuration) {
    this.started = true;
    this.client.start(configuration);
  }

  stop () {
    this.started = false;
    this.unbindAllTriggers();
    this.client.stop();
  }

  unbindAllTriggers () {
    this.client.removeAllListeners('messageReceived');
    scheduler.cancelAll();
  }

  async sync (state) {
    await BotModel.findOneAndRemove().exec();
    await new BotModel(state).save();

    this.bindAllFlows(state);
  }

  bindAllFlows (state = {}) {
    this.unbindAllTriggers();

    (state.flows || []).forEach(flow => {
      const kind = flow.trigger.kind || '';

      switch (kind) {
        case 'word':
          this.bindMessageTriggerFlow(flow);
          break;
        case 'schedule':
          this.bindScheduleTriggerFlow(flow);
          break;
        default:
          break;
      }
    });
  }

  bindMessageTriggerFlow (flow) {
    this.client.on('messageReceived', (data) => {
      if (!data.actionName || data.actionName !== flow.trigger.data.word) return;

      this.executeAllActions(flow, data);
    });
  }

  bindScheduleTriggerFlow (flow) {
    scheduler.schedule(flow.trigger.data.schedule, () => {
      this.executeAllActions(flow, { schedule: flow.trigger.data.schedule });
    });
  }

  async executeAllActions (flow, triggerMessage) {
    if (!this.started) return;

    // execute actions
    let nextMessage = triggerMessage;

    for (let i = 0; i < flow.actions.length; i++) {
      const action = flow.actions[i];
      const fireAction = actions[action.kind];
      if (fireAction) {
        nextMessage = await fireAction(action.data, nextMessage);
      }
    }

    // execute finisher
    const finisher = flow.finisher;
    const word = finisher.data.word;
    if (finisher.kind !== 'message') return;
    if (!word) return;

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = _.template(word || '');

    this.client.sendMessage({ message: compiled(nextMessage), data: finisher.data }, triggerMessage);
  }
};
