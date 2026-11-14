import { fetchInstagramFeed } from './instagramFeed';

afterEach(() => { delete global.fetch; });

test('rejects API errors instead of displaying an empty feed', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 501 });
  await expect(fetchInstagramFeed()).rejects.toThrow('501');
});

test('rejects an HTML response from a server without functions', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => { throw new SyntaxError('HTML'); } });
  await expect(fetchInstagramFeed()).rejects.toThrow();
});

test('accepts the live feed response', async () => {
  const data = { profile: { username: 'unswbadminton' }, posts: [{ id: '1' }] };
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => data });
  await expect(fetchInstagramFeed()).resolves.toEqual(data);
});

test('rejects malformed responses', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ error: 'Unavailable' }) });
  await expect(fetchInstagramFeed()).rejects.toThrow();
});
