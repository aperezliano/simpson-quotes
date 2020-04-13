const fetch = require('node-fetch');

async function getArticle({ searchTerm }) {
  const response = await `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json`;
  const json = await response.json();
  return json;
}

module.exports = { getArticle };
