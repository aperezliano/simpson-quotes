const { fetchAndParseJson } = require('./_base');

module.exports = { getArticle };

async function getArticle({ title }) {
  const content = await fetchAndParseJson(
    `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&prop=text|images&format=json&redirects=true`
  );
  const imagesWithDomain = content.parse.images.map((image) => `https://en.wikipedia.org/wiki/File:${image}`);
  return { text: content.parse.text, images: imagesWithDomain };
}
