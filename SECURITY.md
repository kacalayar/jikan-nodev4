# Security Policy

## Supported Versions

This project follows [Semantic Versioning](https://semver.org/). Security fixes are
backported to the latest major/minor release line. Older versions are supported on
a best-effort basis only.

| Version | Supported          | Notes                                  |
| ------- | ------------------ | -------------------------------------- |
| 1.x     | :white_check_mark: | Current stable line, actively patched  |
| < 1.0   | :x:                | Pre-release, not supported             |

If you are on an unsupported version, please upgrade before reporting an issue
unless the vulnerability also affects a supported version.

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report privately using either of the following:

1. **GitHub Security Advisories** (preferred)
   Go to the repository's **Security** tab and click **"Report a vulnerability"**.
   This opens a private advisory visible only to maintainers.
2. **Email**
   Send details to the maintainer email listed in `package.json`
   (or the address on the maintainer's GitHub profile).

### What to include

To help us triage quickly, please provide:

- A clear description of the vulnerability and its potential impact.
- The affected version(s) and Node.js version.
- Step-by-step reproduction instructions or a minimal proof-of-concept.
- Any relevant logs, stack traces, or screenshots (redact secrets).
- Whether the issue is already public and, if so, where.

### What to expect

| Stage                          | Target timeframe        |
| ------------------------------ | ----------------------- |
| Acknowledgement of report      | within 3 business days  |
| Initial triage & severity      | within 7 business days  |
| Fix or mitigation plan         | within 30 days          |
| Public disclosure (coordinated)| after a fix is released |

We will keep you informed throughout the process and credit you in the release
notes and advisory unless you ask to remain anonymous.

## Disclosure Policy

- We follow **coordinated disclosure**. Please give us a reasonable window to
  release a fix before publishing details publicly.
- Once a fix is available, we publish a GitHub Security Advisory and a patched
  release on npm, referencing the reporter (with permission).

## Scope

This is an **unofficial, client-side wrapper** around the public Jikan v4 API. It
contains no server component, no authentication, and does not store credentials.

**In scope**

- Vulnerabilities in this package's own code (e.g. request handling, URL building,
  retry/limiter logic, error handling, ReDoS in any bundled parsing).
- Dependency-related issues (currently zero runtime dependencies).
- Supply-chain concerns affecting the published npm package (e.g. compromised
  release artifacts).

**Out of scope**

- Vulnerabilities in the Jikan API itself or MyAnimeList - report those to their
  respective maintainers.
- Issues that require the attacker to already control the user's machine, network,
  or `fetch` implementation.
- Missing security headers or rate limits on third-party infrastructure.
- Findings from automated scanners without a demonstrated impact.

## Security Considerations for Users

- **No credentials are handled.** This package does not require or store API keys.
- **User-Agent / headers.** Do not put secrets in the `headers` option; they are
  sent to `api.jikan.moe` on every request.
- **Custom `fetch`.** Only inject a `fetch` implementation you trust, since all
  requests (including URLs and headers) pass through it.
- **Input is sent as query parameters.** Avoid passing untrusted input that you do
  not intend to send to the remote API. Values are URL-encoded by the client.
- **Keep dependencies current.** Although the package has no runtime dependencies,
  keep Node.js on a supported LTS release (Node.js 18+).

## Acknowledgements

We are grateful to everyone who responsibly reports security issues and helps keep
this project and its users safe.
