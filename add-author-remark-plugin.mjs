import matter from 'gray-matter';
import authorData from './data/authors.mjs';

export function addAuthorRemarkPlugin() {
  return function (tree, post) {
    const file = matter.read(post.history[0]);
    const { authorId } = file.data;
    const author = authorData[authorId];

    post.data.astro.frontmatter.author = author;
  };
}
