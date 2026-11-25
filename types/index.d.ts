export interface JikanClientOptions {
  /** Override the API base URL (default: https://api.jikan.moe/v4). */
  baseUrl?: string;
  /** Request timeout in ms (default 15000). */
  timeout?: number;
  /** Max retries on 429/5xx/network errors (default 2). */
  retries?: number;
  /** Base retry delay in ms, exponential backoff (default 1000). */
  retryDelay?: number;
  /** Max requests per second (default 3). */
  requestsPerSecond?: number;
  /** Max requests per minute (default 60). */
  requestsPerMinute?: number;
  /** Extra headers sent with every request. */
  headers?: Record<string, string>;
  /** Custom fetch implementation. */
  fetch?: typeof fetch;
}

export type QueryParams = Record<string, unknown>;

export interface JikanResponse<T = unknown> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page?: number;
    items?: { count: number; total: number; per_page: number };
  };
}

export interface SearchParams extends QueryParams {
  q?: string;
  page?: number;
  limit?: number;
  type?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: string;
  rating?: string;
  sfw?: boolean;
  genres?: string | number | Array<string | number>;
  genres_exclude?: string | number | Array<string | number>;
  order_by?: string;
  sort?: 'asc' | 'desc';
  letter?: string;
  producers?: string | number | Array<string | number>;
  magazines?: string | number | Array<string | number>;
  start_date?: string;
  end_date?: string;
  unapproved?: boolean;
}

interface AnimeResource {
  getById(id: number | string): Promise<JikanResponse>;
  get(id: number | string): Promise<JikanResponse>;
  getCharacters(id: number | string): Promise<JikanResponse>;
  getStaff(id: number | string): Promise<JikanResponse>;
  getEpisodes(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getEpisode(id: number | string, episode: number): Promise<JikanResponse>;
  getEpisodeVideos(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getStreaming(id: number | string): Promise<JikanResponse>;
  getExternal(id: number | string): Promise<JikanResponse>;
  getThemes(id: number | string): Promise<JikanResponse>;
  getRelations(id: number | string): Promise<JikanResponse>;
  getRecommendations(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getUserUpdates(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getReviews(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getPictures(id: number | string): Promise<JikanResponse>;
  getStatistics(id: number | string): Promise<JikanResponse>;
  getNews(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getForum(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getMoreInfo(id: number | string): Promise<JikanResponse>;
  search(params?: SearchParams): Promise<JikanResponse>;
  searchByTitle(query: string, params?: Omit<SearchParams, 'q'>): Promise<JikanResponse>;
}

interface MangaResource {
  getById(id: number | string): Promise<JikanResponse>;
  get(id: number | string): Promise<JikanResponse>;
  getCharacters(id: number | string): Promise<JikanResponse>;
  getPictures(id: number | string): Promise<JikanResponse>;
  getStatistics(id: number | string): Promise<JikanResponse>;
  getExternal(id: number | string): Promise<JikanResponse>;
  getRelations(id: number | string): Promise<JikanResponse>;
  getRecommendations(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getUserUpdates(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getReviews(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getNews(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getForum(id: number | string, params?: QueryParams): Promise<JikanResponse>;
  getMoreInfo(id: number | string): Promise<JikanResponse>;
  search(params?: SearchParams): Promise<JikanResponse>;
  searchByTitle(query: string, params?: Omit<SearchParams, 'q'>): Promise<JikanResponse>;
}

interface CharactersResource {
  get(id: number | string): Promise<JikanResponse>;
  getBasic(id: number | string): Promise<JikanResponse>;
  getAnime(id: number | string): Promise<JikanResponse>;
  getManga(id: number | string): Promise<JikanResponse>;
  getVoices(id: number | string): Promise<JikanResponse>;
  getPictures(id: number | string): Promise<JikanResponse>;
  search(params?: SearchParams): Promise<JikanResponse>;
  searchByName(query: string, params?: Omit<SearchParams, 'q'>): Promise<JikanResponse>;
}

interface PeopleResource {
  get(id: number | string): Promise<JikanResponse>;
  getBasic(id: number | string): Promise<JikanResponse>;
  getAnime(id: number | string): Promise<JikanResponse>;
  getManga(id: number | string): Promise<JikanResponse>;
  getVoices(id: number | string): Promise<JikanResponse>;
  getPictures(id: number | string): Promise<JikanResponse>;
  search(params?: SearchParams): Promise<JikanResponse>;
  searchByName(query: string, params?: Omit<SearchParams, 'q'>): Promise<JikanResponse>;
}

type GenreFilter = 'genres' | 'explicit' | 'themes' | 'demographics';

interface GenresResource {
  getAnimeGenres(filter?: GenreFilter): Promise<JikanResponse>;
  getMangaGenres(filter?: GenreFilter): Promise<JikanResponse>;
}

interface ProducersResource {
  get(id: number | string): Promise<JikanResponse>;
  getBasic(id: number | string): Promise<JikanResponse>;
  getAnime(id: number | string): Promise<JikanResponse>;
  list(params?: QueryParams): Promise<JikanResponse>;
}

interface MagazinesResource {
  get(id: number | string): Promise<JikanResponse>;
  getBasic(id: number | string): Promise<JikanResponse>;
  list(params?: QueryParams): Promise<JikanResponse>;
}

type SeasonName = 'winter' | 'spring' | 'summer' | 'fall';

interface SeasonsResource {
  getNow(params?: QueryParams): Promise<JikanResponse>;
  getUpcoming(params?: QueryParams): Promise<JikanResponse>;
  get(year: number, season: SeasonName, params?: QueryParams): Promise<JikanResponse>;
  list(params?: QueryParams): Promise<JikanResponse>;
}

type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | 'other'
  | 'unknown';

interface SchedulesResource {
  get(day: Weekday, params?: QueryParams): Promise<JikanResponse>;
}

interface TopResource {
  anime(params?: QueryParams): Promise<JikanResponse>;
  manga(params?: QueryParams): Promise<JikanResponse>;
  characters(params?: QueryParams): Promise<JikanResponse>;
  people(params?: QueryParams): Promise<JikanResponse>;
  reviews(params?: QueryParams): Promise<JikanResponse>;
}

interface RandomResource {
  anime(): Promise<JikanResponse>;
  manga(): Promise<JikanResponse>;
  character(): Promise<JikanResponse>;
  person(): Promise<JikanResponse>;
}

interface WatchResource {
  recentEpisodes(params?: QueryParams): Promise<JikanResponse>;
  popularEpisodes(params?: QueryParams): Promise<JikanResponse>;
  recentPromos(params?: QueryParams): Promise<JikanResponse>;
  popularPromos(params?: QueryParams): Promise<JikanResponse>;
}

export declare class JikanClient {
  constructor(options?: JikanClientOptions);
  baseUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  get<T = unknown>(path: string, query?: QueryParams): Promise<JikanResponse<T>>;
}

export declare class Jikan {
  constructor(options?: JikanClientOptions);
  client: JikanClient;
  anime: AnimeResource;
  manga: MangaResource;
  characters: CharactersResource;
  people: PeopleResource;
  genres: GenresResource;
  producers: ProducersResource;
  magazines: MagazinesResource;
  seasons: SeasonsResource;
  schedules: SchedulesResource;
  top: TopResource;
  random: RandomResource;
  watch: WatchResource;
  get<T = unknown>(path: string, query?: QueryParams): Promise<JikanResponse<T>>;
}

export declare class JikanError extends Error {
  code: string;
  status?: number;
  constructor(message: string, options?: { code?: string; status?: number; cause?: unknown });
}

export declare class JikanApiError extends JikanError {
  body?: unknown;
  constructor(message: string, options: { status: number; body?: unknown; code?: string; cause?: unknown });
}

export declare class JikanNetworkError extends JikanError {
  constructor(message: string, options?: { code?: string; cause?: unknown });
}

export declare class JikanRateLimitError extends JikanError {
  constructor(message: string, options?: { status?: number; code?: string; cause?: unknown });
}

export declare const DEFAULT_BASE_URL: string;

export default Jikan;
