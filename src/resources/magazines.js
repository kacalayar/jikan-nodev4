/**
 * Magazine endpoints.
 * @see https://docs.api.jikan.moe/#tag/magazines
 */
export function createMagazinesResource(client) {
  return {
    /** Get magazine by MAL id. */
    get(id) {
      return client.get(`/magazines/${id}/full`);
    },

    getBasic(id) {
      return client.get(`/magazines/${id}`);
    },

    /**
     * List magazines.
     * @param {object} [params] page, limit, order_by, sort, q, letter
     */
    list(params) {
      return client.get('/magazines', params);
    },
  };
}
