/**
 * Watch (recently promoted/added) endpoints.
 * @see https://docs.api.jikan.moe/#tag/watch
 */
export function createWatchResource(client) {
  return {
    /**
     * Recent anime episodes.
     * @param {object} [params] page, limit, sfw
     */
    recentEpisodes(params) {
      return client.get('/watch/episodes', params);
    },

    /**
     * Popular anime episodes.
     * @param {object} [params] page, limit, sfw
     */
    popularEpisodes(params) {
      return client.get('/watch/episodes/popular', params);
    },

    /**
     * Recently promoted anime.
     * @param {object} [params] page, limit, sfw
     */
    recentPromos(params) {
      return client.get('/watch/promos', params);
    },

    /**
     * Popular anime promos.
     * @param {object} [params] page, limit, sfw
     */
    popularPromos(params) {
      return client.get('/watch/promos/popular', params);
    },
  };
}
