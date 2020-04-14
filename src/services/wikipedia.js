const { fetch } = require('./_base');

module.exports = { getArticle };

async function getArticle({ title }) {
  // Wiki images domain: https://en.wikipedia.org/wiki/File:{fileName}
  const content = await fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&prop=text|images&format=json&redirects=true`
  );
  return { text: content.parse.text, images: content.parse.images };
}
