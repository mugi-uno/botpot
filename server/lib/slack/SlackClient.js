const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');
const BaseClient = require('../common/BaseClient');

module.exports = class SlackClient extends BaseClient {
  constructor () {
    super();
    this.rtm = null;
  }

  async start (configuration) {
    if (this.rtm) {
      this.stop();
    }

    this.rtm = new RtmClient(configuration.token, {
      dataStore: false,
      useRtmConnect: true
    });

    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
      this.rtm.on(RTM_EVENTS.MESSAGE, (message) => {
        if (!message.text) return;

        // eslint-disable-next-line no-unused-vars
        const [to, actionName, ...actionParams] = message.text.split(/\s+/);

        const toMe = (org = '') => {
          const to = org.trim();
          return to.startsWith(connectData.self.name) || to === `<@${connectData.self.id}>`;
        };

        if (!toMe(to)) return;

        this.emitMessageReceived({
          message: message.text,
          actionName: actionName,
          data: {
            originalMessage: message,
            connectData: connectData
          }
        });
      });
    });

    this.rtm.start();
  }

  stop () {
    if (!this.rtm) return;
    this.rtm.disconnect();
    this.rtm = null;
  }

  sendMessage ({ message = '', data = {} }, triggerMessage) {
    const channel = data.channel || triggerMessage.data.originalMessage.channel;
    this.rtm.sendMessage(message, channel);
  }
};
