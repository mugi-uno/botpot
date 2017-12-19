const axios = require('axios');

module.exports.request = async (data, message) => {
  const res = await axios({
    method: data.method,
    url: data.url
  });

  return res;
};
