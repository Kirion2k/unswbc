/**
 * Netlify Function: Starts Instagram Basic Display OAuth.
 *
 * Required env vars:
 * - INSTAGRAM_APP_ID
 * - INSTAGRAM_APP_SECRET (not used here, but required for callback)
 *
 * Optional env vars:
 * - INSTAGRAM_REDIRECT_URI (defaults to https://<site>/.netlify/functions/instagram-auth-callback)
 */

function getOrigin(headers) {
  const proto = headers['x-forwarded-proto'] || 'https';
  const host = headers['host'];
  return `${proto}://${host}`;
}

export async function handler(event) {
  const appId = process.env.INSTAGRAM_APP_ID;

  if (!appId) {
    return {
      statusCode: 501,
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: 'Missing INSTAGRAM_APP_ID' }),
    };
  }

  const origin = getOrigin(event.headers || {});
  const redirectUri =
    process.env.INSTAGRAM_REDIRECT_URI || `${origin}/.netlify/functions/instagram-auth-callback`;

  // state helps prevent CSRF; keep it simple here
  const state = 'unswbc_' + Date.now();

  const authUrl = new URL('https://api.instagram.com/oauth/authorize');
  authUrl.searchParams.set('client_id', appId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'user_profile,user_media');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('state', state);

  return {
    statusCode: 302,
    headers: {
      location: authUrl.toString(),
      'cache-control': 'no-store',
    },
    body: '',
  };
}



