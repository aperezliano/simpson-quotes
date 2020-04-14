const fetchNode = require('node-fetch');
var fetchRetry = require('fetch-retry')(fetchNode, {
  retries: 3,
  retryDelay: 1000,
});

module.exports = { fetch };

async function fetch(url) {
  return await fetchRetry(url).then((response) => response.json());
}
