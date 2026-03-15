/**
 * Netlify Function: Live Instagram feed via Instagram Basic Display / Graph API.
 *
 * Required env var:
 * - INSTAGRAM_ACCESS_TOKEN
 *
 * Optional env vars:
 * - INSTAGRAM_MAX_POSTS (default 200, hard cap to avoid runaway fetches)
 *
 * Returns:
 * { profile: { username, profilePic, mediaCount }, posts: [...] }
 *
 * Each post:
 * { id, title, caption, date, image, videoUrl, mediaType, url, slides? }
 * slides is present for CAROUSEL_ALBUM posts: [{ image, mediaType, videoUrl }]
 */

const PAGE_SIZE = 50;
const MAX_POSTS = Number(process.env.INSTAGRAM_MAX_POSTS || 200);

const HEADERS_OK = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'public, max-age=300',
  'access-control-allow-origin': '*',
};
const HEADERS_ERR = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

function mapSlide(c) {
  if (!c.media_url && !c.thumbnail_url) return null;
  return {
    image:     c.media_type === 'VIDEO' ? c.thumbnail_url : c.media_url,
    videoUrl:  c.media_type === 'VIDEO' ? c.media_url : null,
    mediaType: c.media_type || 'IMAGE',
  };
}

function mapPost(p) {
  const image = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url;
  if (!image) return null;
  const caption = p.caption || '';
  const title   = caption.split('\n')[0]?.slice(0, 60) || 'Instagram post';
  const date    = p.timestamp
    ? new Date(p.timestamp).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  // Build slides array for carousel albums
  let slides = null;
  if (p.media_type === 'CAROUSEL_ALBUM' && p.children?.data?.length) {
    const mapped = p.children.data.map(mapSlide).filter(Boolean);
    if (mapped.length > 1) slides = mapped;
  }

  return {
    id:        p.id,
    title,
    caption,
    date,
    image,
    videoUrl:  p.media_type === 'VIDEO' ? p.media_url : null,
    mediaType: p.media_type || 'IMAGE',
    url:       p.permalink,
    slides,
  };
}

export async function handler() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return {
      statusCode: 501,
      headers: HEADERS_ERR,
      body: JSON.stringify({ error: 'Missing INSTAGRAM_ACCESS_TOKEN.' }),
    };
  }

  try {
    // ── Profile info ─────────────────────────────────────────────────────────
    const profileRes  = await fetch(
      `https://graph.instagram.com/me?fields=username,profile_picture_url,media_count&access_token=${encodeURIComponent(token)}`
    );
    const profileJson = await profileRes.json();

    const profile = {
      username:   profileJson.username   || 'unswbadminton',
      profilePic: profileJson.profile_picture_url || null,
      mediaCount: profileJson.media_count || null,
    };

    // ── Paginated media fetch ─────────────────────────────────────────────────
    // Note: children sub-fields must NOT be encoded with encodeURIComponent
    // so we build the fields string and encode only the token/limit values.
    const fields = 'id,caption,media_url,permalink,timestamp,media_type,thumbnail_url,children{id,media_url,media_type,thumbnail_url}';
    let nextUrl = `https://graph.instagram.com/me/media?fields=${fields}&limit=${PAGE_SIZE}&access_token=${encodeURIComponent(token)}`;
    const allPosts = [];

    while (nextUrl && allPosts.length < MAX_POSTS) {
      const res  = await fetch(nextUrl);
      const json = await res.json();

      if (!res.ok) {
        return {
          statusCode: res.status,
          headers: HEADERS_ERR,
          body: JSON.stringify({ error: 'Instagram API request failed', details: json }),
        };
      }

      for (const p of json?.data || []) {
        const mapped = mapPost(p);
        if (mapped) allPosts.push(mapped);
        if (allPosts.length >= MAX_POSTS) break;
      }

      nextUrl = json?.paging?.next || null;
    }

    return {
      statusCode: 200,
      headers: HEADERS_OK,
      body: JSON.stringify({ profile, posts: allPosts }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: HEADERS_ERR,
      body: JSON.stringify({ error: 'Server error', details: String(e?.message || e) }),
    };
  }
}
