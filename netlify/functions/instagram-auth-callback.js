/**
 * Netlify Function: Instagram Basic Display OAuth callback.
 *
 * Required env vars:
 * - INSTAGRAM_APP_ID
 * - INSTAGRAM_APP_SECRET
 *
 * Optional env vars:
 * - INSTAGRAM_REDIRECT_URI (must match the one configured in Meta developer console)
 *
 * Output:
 * - JSON with long-lived token + expiry
 * You will manually copy it into Netlify env var INSTAGRAM_ACCESS_TOKEN.
 */

function getOrigin(headers) {
  const proto = headers['x-forwarded-proto'] || 'https';
  const host = headers['host'];
  return `${proto}://${host}`;
}

async function formPost(url, form) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(form).toString(),
  });
  const json = await res.json().catch(async () => ({ raw: await res.text() }));
  return { ok: res.ok, status: res.status, json };
}

export async function handler(event) {
  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;

  if (!appId || !appSecret) {
    return {
      statusCode: 501,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
      body: JSON.stringify({ error: 'Missing INSTAGRAM_APP_ID or INSTAGRAM_APP_SECRET' }),
    };
  }

  const params = event.queryStringParameters || {};
  const code = params.code;
  const error = params.error;
  const errorReason = params.error_reason;
  const errorDescription = params.error_description;

  if (error) {
    return {
      statusCode: 400,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
      body: JSON.stringify({ error, errorReason, errorDescription }),
    };
  }

  if (!code) {
    return {
      statusCode: 400,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
      body: JSON.stringify({ error: 'Missing ?code= in callback URL' }),
    };
  }

  const origin = getOrigin(event.headers || {});
  const redirectUri =
    process.env.INSTAGRAM_REDIRECT_URI || `${origin}/.netlify/functions/instagram-auth-callback`;

  // 1) Exchange code for short-lived token
  const shortRes = await formPost('https://api.instagram.com/oauth/access_token', {
    client_id: appId,
    client_secret: appSecret,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code,
  });

  if (!shortRes.ok) {
    return {
      statusCode: shortRes.status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
      body: JSON.stringify({ error: 'Failed to exchange code for short-lived token', details: shortRes.json }),
    };
  }

  const shortToken = shortRes.json?.access_token;
  if (!shortToken) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
      body: JSON.stringify({ error: 'No access_token returned in short-lived token response', details: shortRes.json }),
    };
  }

  // 2) Exchange short-lived token for long-lived token (valid ~60 days)
  const longUrl = new URL('https://graph.instagram.com/access_token');
  longUrl.searchParams.set('grant_type', 'ig_exchange_token');
  longUrl.searchParams.set('client_secret', appSecret);
  longUrl.searchParams.set('access_token', shortToken);

  const longRes = await fetch(longUrl.toString());
  const longJson = await longRes.json().catch(async () => ({ raw: await longRes.text() }));

  if (!longRes.ok) {
    return {
      statusCode: longRes.status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
      body: JSON.stringify({ error: 'Failed to exchange for long-lived token', details: longJson }),
    };
  }

  const longToken = longJson?.access_token;
  const expiresIn = longJson?.expires_in;

  // 3) Fetch profile (sanity check)
  let profile = null;
  try {
    const meUrl = new URL('https://graph.instagram.com/me');
    meUrl.searchParams.set('fields', 'id,username');
    meUrl.searchParams.set('access_token', longToken);
    const meRes = await fetch(meUrl.toString());
    profile = await meRes.json().catch(() => null);
  } catch {
    // ignore
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(
      {
        message: 'Copy this token into Netlify env var INSTAGRAM_ACCESS_TOKEN',
        token: longToken,
        expires_in_seconds: expiresIn,
        profile,
        next_steps: [
          'In Netlify: Site settings → Environment variables → Add: INSTAGRAM_ACCESS_TOKEN = <token>',
          'Redeploy site, then open /.netlify/functions/instagram-feed to confirm JSON.',
        ],
      },
      null,
      2
    ),
  };
}


