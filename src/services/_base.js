const fetchNode = require('node-fetch');
var fetchRetry = require('fetch-retry')(fetchNode, {
  retries: 3,
  retryDelay: 1000,
});

module.exports = { fetch };

async function fetch(url) {
  const result = await fetchRetry(url);
  if (result.status == 200) {
    return result;
  }
  throw Error(
    `Request error:
      Status: ${result.status}
      Text: ${await result.text()}`
  );
}
