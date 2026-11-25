/**
 * Schedule endpoints.
 * @see https://docs.api.jikan.moe/#tag/schedules
 */
export function createSchedulesResource(client) {
  return {
    /**
     * Get anime airing on a given weekday.
     * @param {'monday'|'tuesday'|'wednesday'|'thursday'|'friday'|'saturday'|'sunday'|'other'|'unknown'} day
     * @param {object} [params] page, limit, kids, sfw, unapproved
     */
    get(day, params) {
      return client.get('/schedules', { filter: day, ...params });
    },
  };
}
