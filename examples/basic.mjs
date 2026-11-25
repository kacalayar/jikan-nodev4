import { Jikan } from '../src/index.js';

const jikan = new Jikan();

async function main() {
  // Search anime
  const search = await jikan.anime.searchByTitle('Frieren', { limit: 3, sfw: true });
  console.log('Search results:');
  for (const anime of search.data) {
    console.log(` - [${anime.mal_id}] ${anime.title} (score: ${anime.score ?? 'N/A'})`);
  }

  // Top airing anime
  const top = await jikan.top.anime({ filter: 'airing', limit: 5 });
  console.log('\nTop airing:');
  for (const anime of top.data) {
    console.log(` - ${anime.title}`);
  }

  // Current season
  const season = await jikan.seasons.getNow({ limit: 3, sfw: true });
  console.log('\nThis season:');
  for (const anime of season.data) {
    console.log(` - ${anime.title}`);
  }
}

main().catch((error) => {
  console.error('Request failed:', error.name, error.message);
  process.exitCode = 1;
});
