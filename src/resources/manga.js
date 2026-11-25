/**
 * Manga endpoints.
 * @see https://docs.api.jikan.moe/#tag/manga
 */
export function createMangaResource(client) {
  return {
    getById(id) {
      return client.get(`/manga/${id}/full`);
    },

    get(id) {
      return client.get(`/manga/${id}`);
    },

    getCharacters(id) {
      return client.get(`/manga/${id}/characters`);
    },

    getPictures(id) {
      return client.get(`/manga/${id}/pictures`);
    },

    getStatistics(id) {
      return client.get(`/manga/${id}/statistics`);
    },

    getExternal(id) {
      return client.get(`/manga/${id}/external`);
    },

    getRelations(id) {
      return client.get(`/manga/${id}/relations`);
    },

    getRecommendations(id, params) {
      return client.get(`/manga/${id}/recommendations`, params);
    },

    getUserUpdates(id, params) {
      return client.get(`/manga/${id}/userupdates`, params);
    },

    getReviews(id, params) {
      return client.get(`/manga/${id}/reviews`, params);
    },

    getNews(id, params) {
      return client.get(`/manga/${id}/news`, params);
    },

    getForum(id, params) {
      return client.get(`/manga/${id}/forum`, params);
    },

    getMoreInfo(id) {
      return client.get(`/manga/${id}/moreinfo`);
    },

    /**
     * Search manga.
     * @param {object} [params] q, page, limit, type, score, min_score, max_score, status,
     *   sfw, genres, genres_exclude, order_by, sort, letter, magazines, start_date,
     *   end_date, unapproved
     */
    search(params) {
      return client.get('/manga', params);
    },

    searchByTitle(query, params = {}) {
      return client.get('/manga', { q: query, ...params });
    },
  };
}
