/**
 * Error classes for jikan-node.
 */

/**
 * Base error for all jikan-node errors.
 */
export class JikanError extends Error {
  /**
   * @param {string} message
   * @param {object} [options]
   * @param {string} [options.code]
   * @param {number} [options.status]
   * @param {unknown} [options.cause]
   */
  constructor(message, options = {}) {
    super(message, options.cause ? { cause: options.cause } : undefined);
    this.name = 'JikanError';
    this.code = options.code ?? 'JIKAN_ERROR';
    this.status = options.status;
  }
}

/**
 * Thrown when the API responds with a non-2xx status.
 */
export class JikanApiError extends JikanError {
  /**
   * @param {string} message
   * @param {object} options
   * @param {number} options.status HTTP status code
   * @param {unknown} [options.body] Parsed error body from the API
   * @param {string} [options.code]
   * @param {unknown} [options.cause]
   */
  constructor(message, options) {
    super(message, { ...options, code: options.code ?? 'JIKAN_API_ERROR' });
    this.name = 'JikanApiError';
    this.body = options.body;
  }
}

/**
 * Thrown when a request exceeds the configured timeout or the network fails.
 */
export class JikanNetworkError extends JikanError {
  constructor(message, options = {}) {
    super(message, { ...options, code: options.code ?? 'JIKAN_NETWORK_ERROR' });
    this.name = 'JikanNetworkError';
  }
}

/**
 * Thrown when the client gives up after exhausting retries.
 */
export class JikanRateLimitError extends JikanError {
  constructor(message, options = {}) {
    super(message, { ...options, code: options.code ?? 'JIKAN_RATE_LIMIT_ERROR' });
    this.name = 'JikanRateLimitError';
  }
}
