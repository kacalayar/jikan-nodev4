/**
 * Random endpoints.
 * @see https://docs.api.jikan.moe/#tag/random
 */
export function createRandomResource(client) {
  return {
    /** Get a random anime. */
    anime() {
      return client.get('/random/anime');
    },

    /** Get a random manga. */
    manga() {
      return client.get('/random/manga');
    },

    /** Get a random character. */
    character() {
      return client.get('/random/characters');
    },

    /** Get a random person. */
    person() {
      return client.get('/random/people');
    },
  };
}
