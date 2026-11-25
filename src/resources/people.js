/**
 * People (staff/voice actors) endpoints.
 * @see https://docs.api.jikan.moe/#tag/people
 */
export function createPeopleResource(client) {
  return {
    /** Get person by MAL id. */
    get(id) {
      return client.get(`/people/${id}/full`);
    },

    getBasic(id) {
      return client.get(`/people/${id}`);
    },

    /** Get anime works by a person. */
    getAnime(id) {
      return client.get(`/people/${id}/anime`);
    },

    /** Get manga works by a person. */
    getManga(id) {
      return client.get(`/people/${id}/manga`);
    },

    /** Get voice acting roles for a person. */
    getVoices(id) {
      return client.get(`/people/${id}/voices`);
    },

    /** Get pictures of a person. */
    getPictures(id) {
      return client.get(`/people/${id}/pictures`);
    },

    /**
     * Search people.
     * @param {object} [params] q, page, limit, order_by, sort, letter
     */
    search(params) {
      return client.get('/people', params);
    },

    searchByName(query, params = {}) {
      return client.get('/people', { q: query, ...params });
    },
  };
}
