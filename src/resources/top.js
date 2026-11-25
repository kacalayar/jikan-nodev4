/**
 * Top lists endpoints.
 * @see https://docs.api.jikan.moe/#tag/top
 */
export function createTopResource(client) {
  return {
    /**
     * Get top anime.
     * @param {object} [params] page, limit, type, filter
     */
    anime(params) {
      return client.get('/top/anime', params);
    },

    /**
     * Get top manga.
     * @param {object} [params] page, limit, type, filter
     */
    manga(params) {
      return client.get('/top/manga', params);
    },

    /**
     * Get top characters.
     * @param {object} [params] page, limit
     */
    characters(params) {
      return client.get('/top/characters', params);
    },

    /**
     * Get top people.
     * @param {object} [params] page, limit
     */
    people(params) {
      return client.get('/top/people', params);
    },

    /**
     * Get top reviews.
     * @param {object} [params] page, type, spoilers, preliminary, unapproved
     */
    reviews(params) {
      return client.get('/top/reviews', params);
    },
  };
}
