# jikan-node

> Modern, zero-dependency Node.js wrapper for the [Jikan v4 API](https://docs.api.jikan.moe) - the unofficial, free MyAnimeList REST API.

[![npm version](https://img.shields.io/npm/v/jikan-node.svg)](https://www.npmjs.com/package/jikan-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

## Why this wrapper?

Most existing Jikan wrappers are outdated, unmaintained, or stuck on Jikan v3. **jikan-node** targets the **current Jikan v4 API** and is built around modern Node.js primitives:

- **Zero dependencies** - uses the built-in `fetch` (Node.js 18+).
- **Built-in rate limiting** - respects Jikan's `3 req/s` and `60 req/min` limits by default.
- **Automatic retries** - exponential backoff on `429`, `5xx`, and network errors.
- **Grouped resources** - `anime`, `manga`, `characters`, `people`, `seasons`, `top`, and more.
- **Typed errors** - `JikanApiError`, `JikanNetworkError`, `JikanRateLimitError`.
- **TypeScript types** - first-class `.d.ts` definitions included.
- **Tested** - uses the native `node:test` runner.

## Installation

```bash
npm install jikan-nodev4
# or
yarn add jikan-nodev4
# or
pnpm add jikan-nodev4
```

Requires **Node.js 18+** (for the global `fetch`).

## Quick start

```js
import { Jikan } from 'jikan-node';

const jikan = new Jikan();

const { data } = await jikan.anime.searchByTitle('Frieren', { limit: 3, sfw: true });
console.log(data[0].title);
```

CommonJS is also supported via dynamic import:

```js
const { Jikan } = await import('jikan-node');
```

## Client options

```js
import { Jikan } from 'jikan-node';

const jikan = new Jikan({
  baseUrl: 'https://api.jikan.moe/v4', // override the API base URL
  timeout: 15000,                        // request timeout (ms)
  retries: 2,                            // retries on 429 / 5xx / network errors
  retryDelay: 1000,                      // base backoff delay (ms, doubles each retry)
  requestsPerSecond: 3,                  // rate limit
  requestsPerMinute: 60,                 // rate limit
  headers: { 'User-Agent': 'my-app/1.0' }, // extra headers
  fetch: customFetch,                    // inject your own fetch
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `baseUrl` | `string` | `https://api.jikan.moe/v4` | API base URL |
| `timeout` | `number` | `15000` | Per-request timeout in ms |
| `retries` | `number` | `2` | Max retries on retriable errors |
| `retryDelay` | `number` | `1000` | Base backoff delay in ms |
| `requestsPerSecond` | `number` | `3` | Requests-per-second limit |
| `requestsPerMinute` | `number` | `60` | Requests-per-minute limit |
| `headers` | `Record<string,string>` | `{}` | Extra request headers |
| `fetch` | `typeof fetch` | global `fetch` | Custom fetch implementation |

## Resources & methods

Every method returns the **parsed JSON body** from Jikan (e.g. `{ data, pagination }`).

### `jikan.anime`

| Method | Endpoint |
| --- | --- |
| `getById(id)` | `GET /anime/{id}/full` |
| `get(id)` | `GET /anime/{id}` |
| `getCharacters(id)` | `GET /anime/{id}/characters` |
| `getStaff(id)` | `GET /anime/{id}/staff` |
| `getEpisodes(id, params?)` | `GET /anime/{id}/episodes` |
| `getEpisode(id, episode)` | `GET /anime/{id}/episodes/{episode}` |
| `getEpisodeVideos(id, params?)` | `GET /anime/{id}/videos/episodes` |
| `getStreaming(id)` | `GET /anime/{id}/streaming` |
| `getExternal(id)` | `GET /anime/{id}/external` |
| `getThemes(id)` | `GET /anime/{id}/themes` |
| `getRelations(id)` | `GET /anime/{id}/relations` |
| `getRecommendations(id, params?)` | `GET /anime/{id}/recommendations` |
| `getUserUpdates(id, params?)` | `GET /anime/{id}/userupdates` |
| `getReviews(id, params?)` | `GET /anime/{id}/reviews` |
| `getPictures(id)` | `GET /anime/{id}/pictures` |
| `getStatistics(id)` | `GET /anime/{id}/statistics` |
| `getNews(id, params?)` | `GET /anime/{id}/news` |
| `getForum(id, params?)` | `GET /anime/{id}/forum` |
| `getMoreInfo(id)` | `GET /anime/{id}/moreinfo` |
| `search(params?)` | `GET /anime` |
| `searchByTitle(q, params?)` | `GET /anime?q=...` |

### `jikan.manga`

| Method | Endpoint |
| --- | --- |
| `getById(id)` | `GET /manga/{id}/full` |
| `get(id)` | `GET /manga/{id}` |
| `getCharacters(id)` | `GET /manga/{id}/characters` |
| `getPictures(id)` | `GET /manga/{id}/pictures` |
| `getStatistics(id)` | `GET /manga/{id}/statistics` |
| `getExternal(id)` | `GET /manga/{id}/external` |
| `getRelations(id)` | `GET /manga/{id}/relations` |
| `getRecommendations(id, params?)` | `GET /manga/{id}/recommendations` |
| `getUserUpdates(id, params?)` | `GET /manga/{id}/userupdates` |
| `getReviews(id, params?)` | `GET /manga/{id}/reviews` |
| `getNews(id, params?)` | `GET /manga/{id}/news` |
| `getForum(id, params?)` | `GET /manga/{id}/forum` |
| `getMoreInfo(id)` | `GET /manga/{id}/moreinfo` |
| `search(params?)` | `GET /manga` |
| `searchByTitle(q, params?)` | `GET /manga?q=...` |

### `jikan.characters`

| Method | Endpoint |
| --- | --- |
| `get(id)` | `GET /characters/{id}/full` |
| `getBasic(id)` | `GET /characters/{id}` |
| `getAnime(id)` | `GET /characters/{id}/anime` |
| `getManga(id)` | `GET /characters/{id}/manga` |
| `getVoices(id)` | `GET /characters/{id}/voices` |
| `getPictures(id)` | `GET /characters/{id}/pictures` |
| `search(params?)` | `GET /characters` |
| `searchByName(q, params?)` | `GET /characters?q=...` |

### `jikan.people`

| Method | Endpoint |
| --- | --- |
| `get(id)` | `GET /people/{id}/full` |
| `getBasic(id)` | `GET /people/{id}` |
| `getAnime(id)` | `GET /people/{id}/anime` |
| `getManga(id)` | `GET /people/{id}/manga` |
| `getVoices(id)` | `GET /people/{id}/voices` |
| `getPictures(id)` | `GET /people/{id}/pictures` |
| `search(params?)` | `GET /people` |
| `searchByName(q, params?)` | `GET /people?q=...` |

### `jikan.genres`

| Method | Endpoint |
| --- | --- |
| `getAnimeGenres(filter?)` | `GET /genres/anime` |
| `getMangaGenres(filter?)` | `GET /genres/manga` |

`filter` can be `'genres'`, `'explicit'`, `'themes'`, or `'demographics'`.

### `jikan.producers`

| Method | Endpoint |
| --- | --- |
| `get(id)` | `GET /producers/{id}/full` |
| `getBasic(id)` | `GET /producers/{id}` |
| `getAnime(id)` | `GET /producers/{id}/anime` |
| `list(params?)` | `GET /producers` |

### `jikan.magazines`

| Method | Endpoint |
| --- | --- |
| `get(id)` | `GET /magazines/{id}/full` |
| `getBasic(id)` | `GET /magazines/{id}` |
| `list(params?)` | `GET /magazines` |

### `jikan.seasons`

| Method | Endpoint |
| --- | --- |
| `getNow(params?)` | `GET /seasons/now` |
| `getUpcoming(params?)` | `GET /seasons/upcoming` |
| `get(year, season, params?)` | `GET /seasons/{year}/{season}` |
| `list(params?)` | `GET /seasons` |

### `jikan.schedules`

| Method | Endpoint |
| --- | --- |
| `get(day, params?)` | `GET /schedules?filter={day}` |

`day` can be `'monday'` through `'sunday'`, `'other'`, or `'unknown'`.

### `jikan.top`

| Method | Endpoint |
| --- | --- |
| `anime(params?)` | `GET /top/anime` |
| `manga(params?)` | `GET /top/manga` |
| `characters(params?)` | `GET /top/characters` |
| `people(params?)` | `GET /top/people` |
| `reviews(params?)` | `GET /top/reviews` |

### `jikan.random`

| Method | Endpoint |
| --- | --- |
| `anime()` | `GET /random/anime` |
| `manga()` | `GET /random/manga` |
| `character()` | `GET /random/characters` |
| `person()` | `GET /random/people` |

### `jikan.watch`

| Method | Endpoint |
| --- | --- |
| `recentEpisodes(params?)` | `GET /watch/episodes` |
| `popularEpisodes(params?)` | `GET /watch/episodes/popular` |
| `recentPromos(params?)` | `GET /watch/promos` |
| `popularPromos(params?)` | `GET /watch/promos/popular` |

### Raw requests

For any endpoint not covered above, use the escape hatch:

```js
const data = await jikan.get('/anime/1/full', { sfw: true });
```

## Examples

### Search with pagination

```js
import { Jikan } from 'jikan-node';

const jikan = new Jikan();

const page1 = await jikan.anime.search({
  q: 'evangelion',
  page: 1,
  limit: 25,
  order_by: 'score',
  sort: 'desc',
});

console.log(page1.pagination.has_next_page);
```

### Top airing anime

```js
const top = await jikan.top.anime({ filter: 'airing', limit: 10 });
for (const anime of top.data) {
  console.log(anime.title, anime.score);
}
```

### Current season

```js
const season = await jikan.seasons.getNow({ limit: 20, sfw: true });
```

### A specific season

```js
const winter2024 = await jikan.seasons.get(2024, 'winter', { limit: 20 });
```

### Character details

```js
const { data: char } = await jikan.characters.get(1);
console.log(char.name, char.about);
```

## Error handling

All errors extend `JikanError`:

| Class | When | Extra fields |
| --- | --- | --- |
| `JikanApiError` | Non-2xx HTTP response | `status`, `body` |
| `JikanNetworkError` | Network failure or timeout | `cause` |
| `JikanRateLimitError` | HTTP `429` after retries | `status`, `cause` (may include `retryAfter`) |

```js
import {
  Jikan,
  JikanApiError,
  JikanNetworkError,
  JikanRateLimitError,
} from 'jikan-node';

const jikan = new Jikan();

try {
  const { data } = await jikan.anime.getById(999999999);
} catch (error) {
  if (error instanceof JikanApiError) {
    console.error(`API error ${error.status}: ${error.message}`);
  } else if (error instanceof JikanRateLimitError) {
    console.error('Rate limited - slow down or increase retryDelay.');
  } else if (error instanceof JikanNetworkError) {
    console.error('Network problem:', error.message);
  } else {
    throw error;
  }
}
```

### Retry behaviour

The client automatically retries (up to `retries`) with exponential backoff on:

- `JikanRateLimitError` (HTTP `429`)
- `JikanNetworkError` (timeouts and network failures)
- `JikanApiError` with `status >= 500`

`404` and other `4xx` errors are **not** retried.

## Rate limiting

Jikan enforces **3 requests/second** and **60 requests/minute**. This client queues and spaces requests by default to stay within those limits. Tune with `requestsPerSecond` / `requestsPerMinute` if Jikan changes its policy.

## TypeScript

Types are bundled and resolved automatically:

```ts
import { Jikan, JikanResponse } from 'jikan-node';

const jikan = new Jikan();
const res: JikanResponse = await jikan.anime.getById(1);
```

## Project structure

```
jikan-node/
+-- src/
|   +-- index.js          # Jikan class + exports
|   +-- client.js         # HTTP client (fetch, retries, timeouts)
|   +-- limiter.js        # rate limiter
|   +-- errors.js         # error classes
|   +-- resources/        # per-endpoint-group modules
+-- types/                # TypeScript definitions
+-- examples/             # runnable examples
+-- test/                 # node:test suites
+-- package.json
+-- LICENSE
+-- README.md
```

## Development

```bash
# run the test suite (node:test, no network required)
npm test

# run the example (hits the live API)
npm run example
```

## Security

For supported versions and how to report a vulnerability privately, see
[SECURITY.md](./SECURITY.md). Please do **not** open public issues for security
problems.

## Disclaimer

This package is **not** affiliated with MyAnimeList or Jikan. It is an unofficial client. Respect [Jikan's terms](https://docs.api.jikan.moe) and MyAnimeList's terms of service when using it.

## License

[MIT](./LICENSE)
