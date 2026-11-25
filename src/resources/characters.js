/**
 * Character endpoints.
 * @see https://docs.api.jikan.moe/#tag/characters
 */
export function createCharactersResource(client) {
  return {
    /** Get character by MAL id. */
    get(id) {
      return client.get(`/characters/${id}/full`);
    },

    /** Get character (standard payload). */
    getBasic(id) {
      return client.get(`/characters/${id}`);
    },

    /** Get anime a character appears in. */
    getAnime(id) {
      return client.get(`/characters/${id}/anime`);
    },

    /** Get manga a character appears in. */
    getManga(id) {
      return client.get(`/characters/${id}/manga`);
    },

    /** Get character voice actors. */
    getVoices(id) {
      return client.get(`/characters/${id}/voices`);
    },

    /** Get character pictures. */
    getPictures(id) {
      return client.get(`/characters/${id}/pictures`);
    },

    /**
     * Search characters.
     * @param {object} [params] q, page, limit, order_by, sort, letter
     */
    search(params) {
      return client.get('/characters', params);
    },

    searchByName(query, params = {}) {
      return client.get('/characters', { q: query, ...params });
    },
  };
}
