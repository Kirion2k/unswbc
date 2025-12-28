/**
 * Netlify Function: Live Instagram feed via Instagram Basic Display / Graph API.
 *
 * Required env var:
 * - INSTAGRAM_ACCESS_TOKEN
 *
 * Optional env vars:
 * - INSTAGRAM_LIMIT (default 12)
 *
 * Returns:
 * { posts: [{ id, title, caption, date, image, url }] }
 */

const DEFAULT_LIMIT = 12;

export async function handler() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const limit = Number(process.env.INSTAGRAM_LIMIT || DEFAULT_LIMIT) || DEFAULT_LIMIT;

  if (!token) {
    return {
      statusCode: 501,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
      body: JSON.stringify({
        error: 'Missing INSTAGRAM_ACCESS_TOKEN. Configure it in your hosting environment.',
      }),
    };
  }

  try {
    // Basic Display API:
    // https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type,thumbnail_url&access_token=...
    const fields = [
      'id',
      'caption',
      'media_url',
      'permalink',
      'timestamp',
      'media_type',
      'thumbnail_url',
    ].join(',');

    const url = `https://graph.instagram.com/me/media?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}&limit=${encodeURIComponent(String(limit))}`;
    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
        },
        body: JSON.stringify({ error: 'Instagram API request failed', details: json }),
      };
    }

    const posts = (json?.data || [])
      .filter((p) => p && (p.media_url || p.thumbnail_url))
      .map((p) => {
        const image = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url;
        const caption = p.caption || '';
        const title = caption.split('\n')[0]?.slice(0, 60) || 'Instagram post';
        const date = p.timestamp ? new Date(p.timestamp).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
        return {
          id: p.id,
          title,
          caption,
          date,
          image,
          url: p.permalink,
        };
      });

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        // Cache a bit to avoid rate limiting
        'cache-control': 'public, max-age=300',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify({ posts }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
      body: JSON.stringify({ error: 'Server error', details: String(e?.message || e) }),
    };
  }
}



