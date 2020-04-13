const fetch = require('node-fetch');

async function getArticle({ title }) {
  // Wiki images domain: https://en.wikipedia.org/wiki/File:{fileName}
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&prop=text|images&format=json&redirects=true`
  );
  const jsonContent = await response.json();
  return {
    text: jsonContent.parse.text,
    images: jsonContent.parse.images,
  };
}

module.exports = { getArticle };
