/**
 * Anime endpoints.
 * @see https://docs.api.jikan.moe/#tag/anime
 */
export function createAnimeResource(client) {
  return {
    /** Get full anime by MAL id. */
    getById(id) {
      return client.get(`/anime/${id}/full`);
    },

    /** Get anime by MAL id (standard payload). */
    get(id) {
      return client.get(`/anime/${id}`);
    },

    /** Get anime characters & staff. */
    getCharacters(id) {
      return client.get(`/anime/${id}/characters`);
    },

    /** Get anime staff. */
    getStaff(id) {
      return client.get(`/anime/${id}/staff`);
    },

    /** Get anime episodes (paginated). */
    getEpisodes(id, params) {
      return client.get(`/anime/${id}/episodes`, params);
    },

    /** Get a single episode by number. */
    getEpisode(id, episode) {
      return client.get(`/anime/${id}/episodes/${episode}`);
    },

    /** Get anime episode videos. */
    getEpisodeVideos(id, params) {
      return client.get(`/anime/${id}/videos/episodes`, params);
    },

    /** Get anime streaming links. */
    getStreaming(id) {
      return client.get(`/anime/${id}/streaming`);
    },

    /** Get anime external links. */
    getExternal(id) {
      return client.get(`/anime/${id}/external`);
    },

    /** Get anime opening/ending themes. */
    getThemes(id) {
      return client.get(`/anime/${id}/themes`);
    },

    /** Get anime relations. */
    getRelations(id) {
      return client.get(`/anime/${id}/relations`);
    },

    /** Get anime recommendations. */
    getRecommendations(id, params) {
      return client.get(`/anime/${id}/recommendations`, params);
    },

    /** Get anime user updates. */
    getUserUpdates(id, params) {
      return client.get(`/anime/${id}/userupdates`, params);
    },

    /** Get anime reviews. */
    getReviews(id, params) {
      return client.get(`/anime/${id}/reviews`, params);
    },

    /** Get anime pictures. */
    getPictures(id) {
      return client.get(`/anime/${id}/pictures`);
    },

    /** Get anime statistics. */
    getStatistics(id) {
      return client.get(`/anime/${id}/statistics`);
    },

    /** Get anime news. */
    getNews(id, params) {
      return client.get(`/anime/${id}/news`, params);
    },

    /** Get anime forum topics. */
    getForum(id, params) {
      return client.get(`/anime/${id}/forum`, params);
    },

    /** Get anime more info. */
    getMoreInfo(id) {
      return client.get(`/anime/${id}/moreinfo`);
    },

    /**
     * Search anime.
     * @param {object} [params] q, page, limit, type, score, min_score, max_score, status,
     *   rating, sfw, genres, genres_exclude, order_by, sort, letter, producers, start_date,
     *   end_date, unapproved
     */
    search(params) {
      return client.get('/anime', params);
    },

    /**
     * Search anime by title (convenience).
     * @param {string} query
     * @param {object} [params]
     */
    searchByTitle(query, params = {}) {
      return client.get('/anime', { q: query, ...params });
    },
  };
}
