import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Jikan, JikanApiError, JikanNetworkError, JikanRateLimitError } from '../src/index.js';

function mockFetch(handler) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url: String(url), init });
    return handler(String(url), init);
  };
  fetchImpl.calls = calls;
  return fetchImpl;
}

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

test('builds the correct URL with query params', async () => {
  const fetchImpl = mockFetch(() => jsonResponse({ data: [] }));
  const jikan = new Jikan({ fetch: fetchImpl });

  await jikan.anime.searchByTitle('frieren', { limit: 3, sfw: true });

  const url = new URL(fetchImpl.calls[0].url);
  assert.equal(url.pathname, '/v4/anime');
  assert.equal(url.searchParams.get('q'), 'frieren');
  assert.equal(url.searchParams.get('limit'), '3');
  assert.equal(url.searchParams.get('sfw'), 'true');
});

test('omits undefined and null params', async () => {
  const fetchImpl = mockFetch(() => jsonResponse({ data: [] }));
  const jikan = new Jikan({ fetch: fetchImpl });

  await jikan.client.get('/anime', { q: 'x', page: undefined, type: null });

  const url = new URL(fetchImpl.calls[0].url);
  assert.equal(url.searchParams.get('q'), 'x');
  assert.equal(url.searchParams.has('page'), false);
  assert.equal(url.searchParams.has('type'), false);
});

test('returns parsed JSON body', async () => {
  const payload = { data: { mal_id: 1, title: 'Cowboy Bebop' } };
  const fetchImpl = mockFetch(() => jsonResponse(payload));
  const jikan = new Jikan({ fetch: fetchImpl });

  const result = await jikan.anime.getById(1);
  assert.deepEqual(result, payload);
});

test('throws JikanApiError on 404 without retrying', async () => {
  let count = 0;
  const fetchImpl = mockFetch(() => {
    count += 1;
    return jsonResponse({ status: 404, message: 'Resource does not exist' }, 404);
  });
  const jikan = new Jikan({ fetch: fetchImpl, retries: 2 });

  await assert.rejects(
    () => jikan.anime.getById(999999999),
    (error) => {
      assert.ok(error instanceof JikanApiError);
      assert.equal(error.status, 404);
      assert.match(error.message, /does not exist/);
      return true;
    },
  );
  assert.equal(count, 1);
});

test('retries 5xx then succeeds', async () => {
  let count = 0;
  const fetchImpl = mockFetch(() => {
    count += 1;
    if (count === 1) return jsonResponse({ message: 'boom' }, 500);
    return jsonResponse({ data: { mal_id: 1 } });
  });
  const jikan = new Jikan({ fetch: fetchImpl, retries: 2, retryDelay: 1 });

  const result = await jikan.anime.getById(1);
  assert.equal(count, 2);
  assert.equal(result.data.mal_id, 1);
});

test('throws JikanRateLimitError on 429', async () => {
  const fetchImpl = mockFetch(() => jsonResponse({ message: 'rate limited' }, 429));
  const jikan = new Jikan({ fetch: fetchImpl, retries: 0 });

  await assert.rejects(() => jikan.anime.getById(1), JikanRateLimitError);
});

test('wraps fetch failures in JikanNetworkError', async () => {
  const fetchImpl = mockFetch(() => {
    throw new TypeError('fetch failed');
  });
  const jikan = new Jikan({ fetch: fetchImpl, retries: 0 });

  await assert.rejects(() => jikan.anime.getById(1), JikanNetworkError);
});

test('respects a custom baseUrl', async () => {
  const fetchImpl = mockFetch(() => jsonResponse({ data: [] }));
  const jikan = new Jikan({ fetch: fetchImpl, baseUrl: 'https://example.test/api/' });

  await jikan.top.anime();
  assert.equal(fetchImpl.calls[0].url.startsWith('https://example.test/api/top/anime'), true);
});

test('random resource hits the right paths', async () => {
  const fetchImpl = mockFetch(() => jsonResponse({ data: {} }));
  const jikan = new Jikan({ fetch: fetchImpl });

  await jikan.random.anime();
  await jikan.random.character();

  assert.equal(new URL(fetchImpl.calls[0].url).pathname, '/v4/random/anime');
  assert.equal(new URL(fetchImpl.calls[1].url).pathname, '/v4/random/characters');
});
