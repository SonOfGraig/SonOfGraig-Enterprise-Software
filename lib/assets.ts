/**
 * Single source for marketing-asset URLs.
 *
 * NEXT_PUBLIC_ASSET_BASE_URL is baked in at build time. In production it points
 * to the GCS bucket (cheaper egress than serving from the Cloud Run container).
 * When unset (e.g. local dev with no .env.production), URLs fall back to the
 * repo's /public path so the dev server still works.
 */

const RAW_BASE = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? '';
// Trim trailing slashes so callers don't have to think about it.
const ASSET_BASE = RAW_BASE.replace(/\/+$/, '');

export function videoUrl(filename: string): string {
  return `${ASSET_BASE}/video/${filename}`;
}

export function posterUrl(filename: string): string {
  return `${ASSET_BASE}/poster/${filename}`;
}

/**
 * Build the full triple (mp4 + webm + poster) for an `ExplainerVideo` source.
 * Pass the basename without extension (e.g. "agent-builder" or "agent-builder-dark").
 */
export function explainerSources(basename: string) {
  return {
    mp4: videoUrl(`${basename}.mp4`),
    webm: videoUrl(`${basename}.webm`),
    poster: posterUrl(`${basename}.jpg`),
  };
}
