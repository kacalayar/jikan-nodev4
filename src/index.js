import { JikanClient, DEFAULT_BASE_URL } from './client.js';
import {
  JikanError,
  JikanApiError,
  JikanNetworkError,
  JikanRateLimitError,
} from './errors.js';
import { createAnimeResource } from './resources/anime.js';
import { createMangaResource } from './resources/manga.js';
import { createCharactersResource } from './resources/characters.js';
import { createPeopleResource } from './resources/people.js';
import { createGenresResource } from './resources/genres.js';
import { createProducersResource } from './resources/producers.js';
import { createMagazinesResource } from './resources/magazines.js';
import { createSeasonsResource } from './resources/seasons.js';
import { createSchedulesResource } from './resources/schedules.js';
import { createTopResource } from './resources/top.js';
import { createRandomResource } from './resources/random.js';
import { createWatchResource } from './resources/watch.js';

/**
 * High-level Jikan v4 client with grouped resources.
 *
 * @example
 * import { Jikan } from 'jikan-node';
 * const jikan = new Jikan();
 * const { data } = await jikan.anime.searchByTitle('Frieren');
 */
export class Jikan {
  /**
   * @param {import('./client.js').JikanClientOptions} [options]
   */
  constructor(options = {}) {
    this.client = new JikanClient(options);
    this.anime = createAnimeResource(this.client);
    this.manga = createMangaResource(this.client);
    this.characters = createCharactersResource(this.client);
    this.people = createPeopleResource(this.client);
    this.genres = createGenresResource(this.client);
    this.producers = createProducersResource(this.client);
    this.magazines = createMagazinesResource(this.client);
    this.seasons = createSeasonsResource(this.client);
    this.schedules = createSchedulesResource(this.client);
    this.top = createTopResource(this.client);
    this.random = createRandomResource(this.client);
    this.watch = createWatchResource(this.client);
  }

  /**
   * Escape hatch: perform a raw GET against the API.
   * @param {string} path
   * @param {Record<string, unknown>} [query]
   */
  get(path, query) {
    return this.client.get(path, query);
  }
}

export { JikanClient, DEFAULT_BASE_URL };
export {
  JikanError,
  JikanApiError,
  JikanNetworkError,
  JikanRateLimitError,
};

export default Jikan;
