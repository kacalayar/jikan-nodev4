/**
 * Simple token-bucket style limiter to respect Jikan's rate limit.
 * Default Jikan limit: 3 requests/second, 60 requests/minute.
 */

export class RateLimiter {
  /**
   * @param {object} [options]
   * @param {number} [options.requestsPerSecond] Max requests per second (default 3)
   * @param {number} [options.requestsPerMinute] Max requests per minute (default 60)
   */
  constructor(options = {}) {
    this.perSecond = Math.max(1, options.requestsPerSecond ?? 3);
    this.perMinute = Math.max(1, options.requestsPerMinute ?? 60);
    this.secondWindow = [];
    this.minuteWindow = [];
    this.chain = Promise.resolve();
  }

  /**
   * Runs `fn` once a slot is available, serialized to preserve ordering.
   * @template T
   * @param {() => Promise<T>} fn
   * @returns {Promise<T>}
   */
  schedule(fn) {
    const run = async () => {
      await this.#waitForSlot();
      return fn();
    };
    const result = this.chain.then(run, run);
    // Keep the chain alive even if `run` rejects.
    this.chain = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  }

  async #waitForSlot() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const now = Date.now();
      this.secondWindow = this.secondWindow.filter((t) => now - t < 1000);
      this.minuteWindow = this.minuteWindow.filter((t) => now - t < 60_000);

      const secondOk = this.secondWindow.length < this.perSecond;
      const minuteOk = this.minuteWindow.length < this.perMinute;

      if (secondOk && minuteOk) {
        this.secondWindow.push(now);
        this.minuteWindow.push(now);
        return;
      }

      const secondDelay =
        !secondOk && this.secondWindow.length
          ? 1000 - (now - this.secondWindow[0])
          : 0;
      const minuteDelay =
        !minuteOk && this.minuteWindow.length
          ? 60_000 - (now - this.minuteWindow[0])
          : 0;
      const wait = Math.max(10, Math.min(secondDelay || Infinity, minuteDelay || Infinity));
      await sleep(Number.isFinite(wait) ? wait : 1000);
    }
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
