import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Reads the porter-extracted `_legacy.html` partial for a route from disk.
 * Used by every server `page.tsx` that hands off to `LegacyShell`.
 *
 * `routeSegments` is the path *under* `app/(public)/`, e.g. `["about"]` or
 * `["services", "ai-agent-implementation"]`.
 */
export async function loadLegacyHtml(...routeSegments: string[]): Promise<string> {
  const file = path.join(
    process.cwd(),
    'app',
    '(public)',
    ...routeSegments,
    '_legacy.html',
  );
  return fs.readFile(file, 'utf8');
}
