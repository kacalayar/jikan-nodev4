/**
 * Producer endpoints.
 * @see https://docs.api.jikan.moe/#tag/producers
 */
export function createProducersResource(client) {
  return {
    /** Get producer by MAL id. */
    get(id) {
      return client.get(`/producers/${id}/full`);
    },

    getBasic(id) {
      return client.get(`/producers/${id}`);
    },

    /** Get anime produced by a producer. */
    getAnime(id) {
      return client.get(`/producers/${id}/anime`);
    },

    /**
     * List producers.
     * @param {object} [params] page, limit, order_by, sort, q, letter
     */
    list(params) {
      return client.get('/producers', params);
    },
  };
}
