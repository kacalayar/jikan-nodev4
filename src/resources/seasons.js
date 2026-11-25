/**
 * Seasonal anime endpoints.
 * @see https://docs.api.jikan.moe/#tag/seasons
 */
export function createSeasonsResource(client) {
  return {
    /**
     * Get the current season's anime.
     * @param {object} [params] page, limit, filter, sfw, unapproved, continuing
     */
    getNow(params) {
      return client.get('/seasons/now', params);
    },

    /**
     * Get an upcoming season's anime.
     * @param {object} [params] page, limit, filter, sfw, unapproved, continuing
     */
    getUpcoming(params) {
      return client.get('/seasons/upcoming', params);
    },

    /**
     * Get a specific season's anime.
     * @param {number} year
     * @param {'winter'|'spring'|'summer'|'fall'} season
     * @param {object} [params] page, limit, filter, sfw, unapproved, continuing
     */
    get(year, season, params) {
      return client.get(`/seasons/${year}/${season}`, params);
    },

    /**
     * Get the list of available seasons.
     * @param {object} [params] page, limit, filter
     */
    list(params) {
      return client.get('/seasons', params);
    },
  };
}
