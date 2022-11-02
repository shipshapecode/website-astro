import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('/data/posts/**/*.md', {
  eager: true
});
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: 'Shipshape Blog',
    description:
      'Read our blog to stay ahead of trends in Ember.js, JavaScript, and everything in between.',
    site: import.meta.env.SITE,
    stylesheet: '/rss/style.xsl',
    items: posts.map((post) => ({
      link: `/blog/${post.frontmatter.slug}`,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.compiledContent()
    })),
    customData: `<language>en-us</language>`
  });
