/**
 * Genre endpoints.
 * @see https://docs.api.jikan.moe/#tag/genres
 */
export function createGenresResource(client) {
  return {
    /**
     * List anime genres.
     * @param {'genres'|'explicit'|'themes'|'demographics'} [filter]
     */
    getAnimeGenres(filter) {
      return client.get('/genres/anime', filter ? { filter } : undefined);
    },

    /**
     * List manga genres.
     * @param {'genres'|'explicit'|'themes'|'demographics'} [filter]
     */
    getMangaGenres(filter) {
      return client.get('/genres/manga', filter ? { filter } : undefined);
    },
  };
}
