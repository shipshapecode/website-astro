import truncate from 'lodash.truncate';

export async function getLatestBlogPost(){
const allPosts = await Astro.glob<MarkdownFrontmatter>('../post/*.md');
const sortedPosts = allPosts.sort(
  (a, b) =>
    new Date(b.frontmatter.date).valueOf() -
    new Date(a.frontmatter.date).valueOf()
);

return sortedPosts[0].frontmatter;
}

export async function getLatestPodcast() {
  try {
    const response = await fetch(
      'https://player.megaphone.fm/playlist/PODRYL5396410253/'
    );
    const podcastData = await response.json();
    const latestPodcastEpisode = podcastData?.episodes[0];

    const podcastDescription = truncate(
      latestPodcastEpisode?.summary?.replace(/(<([^>]+)>)/gi, ''),
      {
        length: 260,
        separator: /,?\.* +/
      }
    );

    latestPodcastEpisode.description = podcastDescription;

    return latestPodcastEpisode;
  } catch {}
}
