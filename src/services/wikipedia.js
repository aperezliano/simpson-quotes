const _base = require('./_base');

module.exports = { getArticleByTitle };

async function getArticleByTitle(title = '') {
  const response = await _base.fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&prop=text|images&format=json&redirects=true`
  );
  const content = await response.json();
  const imagesWithDomain = content.parse.images.map((image) => `https://en.wikipedia.org/wiki/File:${image}`);
  return { text: content.parse.text, images: imagesWithDomain };
}
