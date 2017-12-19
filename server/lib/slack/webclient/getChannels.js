const { WebClient } = require('@slack/client');

module.exports = async (token) => {
  const web = new WebClient(token);
  const res = await web.channels.list();
  return res.channels;
};
