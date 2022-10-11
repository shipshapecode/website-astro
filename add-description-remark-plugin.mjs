import matter from 'gray-matter';
import truncate from 'lodash.truncate';
import showdown from 'showdown';

const converter = new showdown.Converter();

function truncatedExcerpt(file, options) {
  const html = converter.makeHtml(file.content);
  const description = truncate(html.replace(/(<([^>]+)>)/gi, ''), {
    length: 260,
    separator: /,?\.* +/
  });
  file.excerpt = description;
}

export function addDescriptionRemarkPlugin() {
  return function (tree, post) {
    const file = matter.read(post.history[0], { excerpt: truncatedExcerpt });

    post.data.astro.frontmatter.description = file.excerpt;
  };
}
