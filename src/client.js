import { JikanApiError, JikanNetworkError, JikanRateLimitError } from './errors.js';
import { RateLimiter, sleep } from './limiter.js';

export const DEFAULT_BASE_URL = 'https://api.jikan.moe/v4';

/**
 * @typedef {object} JikanClientOptions
 * @property {string} [baseUrl] Override API base URL
 * @property {number} [timeout] Request timeout in ms (default 15000)
 * @property {number} [retries] Max retries on 429/5xx/network errors (default 2)
 * @property {number} [retryDelay] Base retry delay in ms (default 1000, exponential backoff)
 * @property {number} [requestsPerSecond] Rate limit (default 3)
 * @property {number} [requestsPerMinute] Rate limit (default 60)
 * @property {Record<string,string>} [headers] Extra headers sent with every request
 * @property {typeof fetch} [fetch] Custom fetch implementation
 */

export class JikanClient {
  /** @param {JikanClientOptions} [options] */
  constructor(options = {}) {
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.timeout = options.timeout ?? 15_000;
    this.retries = options.retries ?? 2;
    this.retryDelay = options.retryDelay ?? 1_000;
    this.headers = { Accept: 'application/json', ...(options.headers ?? {}) };
    this.fetchImpl = options.fetch ?? globalThis.fetch;
    if (typeof this.fetchImpl !== 'function') {
      throw new JikanNetworkError(
        'No global fetch found. Use Node.js >= 18 or pass a fetch implementation.',
        { code: 'JIKAN_NO_FETCH' },
      );
    }
    this.limiter = new RateLimiter({
      requestsPerSecond: options.requestsPerSecond,
      requestsPerMinute: options.requestsPerMinute,
    });
  }

  /**
   * Performs a GET request against the API and returns the parsed JSON body.
   * @param {string} path e.g. "/anime/1"
   * @param {Record<string, unknown>} [query]
   * @returns {Promise<any>}
   */
  async get(path, query) {
    const url = this.#buildUrl(path, query);
    let lastError;

    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      try {
        return await this.limiter.schedule(() => this.#request(url));
      } catch (error) {
        lastError = error;
        const retriable = this.#isRetriable(error);
        if (!retriable || attempt === this.retries) break;
        const backoff = this.retryDelay * 2 ** attempt;
        await sleep(backoff);
      }
    }

    if (lastError instanceof JikanRateLimitError) throw lastError;
    throw lastError;
  }

  #buildUrl(path, query) {
    if (!path.startsWith('/')) path = `/${path}`;
    const url = new URL(this.baseUrl + path);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
          for (const item of value) url.searchParams.append(key, String(item));
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  async #request(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    let response;
    try {
      response = await this.fetchImpl(url, {
        method: 'GET',
        headers: this.headers,
        signal: controller.signal,
      });
    } catch (error) {
      if (error?.name === 'AbortError') {
        throw new JikanNetworkError(`Request timed out after ${this.timeout}ms`, {
          code: 'JIKAN_TIMEOUT',
          cause: error,
        });
      }
      throw new JikanNetworkError(`Network request failed: ${error?.message ?? error}`, {
        cause: error,
      });
    } finally {
      clearTimeout(timer);
    }

    if (response.status === 429) {
      const retryAfter = Number(response.headers.get('retry-after')) || undefined;
      throw new JikanRateLimitError('Rate limited by Jikan API (HTTP 429)', {
        status: 429,
        code: 'JIKAN_RATE_LIMITED',
        cause: retryAfter ? { retryAfter } : undefined,
      });
    }

    const text = await response.text();
    let body;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }

    if (!response.ok) {
      const message =
        (body && typeof body === 'object' && 'message' in body && body.message) ||
        `Jikan API responded with HTTP ${response.status}`;
      throw new JikanApiError(String(message), {
        status: response.status,
        body,
      });
    }

    return body;
  }

  #isRetriable(error) {
    if (error instanceof JikanRateLimitError) return true;
    if (error instanceof JikanNetworkError) {
      return error.code === 'JIKAN_TIMEOUT' || error.code === 'JIKAN_NETWORK_ERROR';
    }
    if (error instanceof JikanApiError) {
      return error.status >= 500;
    }
    return false;
  }
}
