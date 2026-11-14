const FEED_URL = process.env.REACT_APP_INSTAGRAM_FEED_URL || '/.netlify/functions/instagram-feed';

export async function fetchInstagramFeed() {
  const response = await fetch(FEED_URL);
  if (!response.ok) throw new Error(`Instagram feed unavailable (${response.status})`);
  const data = await response.json();
  if (Array.isArray(data)) return { posts: data };
  if (!Array.isArray(data?.posts)) throw new Error('Invalid Instagram feed response');
  return data;
}
