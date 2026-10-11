#!/usr/bin/env bash
# Deploy this checkout to sonofgraig.com on the T110 (run from Git Bash on the 8200,
# in the repo root):
#
#   bash ops/deploy-t110.sh
#
# Same steps the site has always used on the T110: pack app/ components/ lib/ hooks/
# + config → ~/sog-website/sync.tgz → apply.sh (rsync --delete per dir) → check.sh
# (type-check; stops here on any error, the live site untouched) → prod.sh (build,
# restart sog-website, purge the Cloudflare cache, IndexNow).
set -euo pipefail
KEY=~/.ssh/graig_t110
HOST=graig@100.87.178.52
cd "$(git rev-parse --show-toplevel)"

if [ -n "$(git status --porcelain -- app components lib hooks next.config.ts package.json package-lock.json)" ]; then
  echo "Uncommitted changes in the site code — commit them first so the deploy matches a commit."; exit 1
fi
echo "Deploying $(git rev-parse --abbrev-ref HEAD) @ $(git rev-parse --short HEAD)"

tmp=$(mktemp -d)
tar -czf "$tmp/sync.tgz" app components lib hooks next.config.ts package.json package-lock.json
echo "1/3 uploading ($(du -h "$tmp/sync.tgz" | cut -f1))"
scp -q -i "$KEY" "$tmp/sync.tgz" "$HOST:sog-website/sync.tgz"
rm -rf "$tmp"

echo "2/3 applying + type-checking on the T110"
ssh -i "$KEY" "$HOST" 'cd ~/sog-website && bash apply.sh && bash check.sh' </dev/null

echo "3/3 building + restarting (several minutes on the T110)"
ssh -i "$KEY" "$HOST" 'cd ~/sog-website && bash prod.sh' </dev/null
echo "DEPLOYED $(git rev-parse --short HEAD)"

# End-to-end check of the live site (e2e/site-check.mjs) from the T110's Playwright
# toolchain (~/carousels). Read-only: forms are mocked inside the test browser. The
# script is shipped with every deploy so GRAIG's nightly run uses the same version.
echo "4/4 end-to-end check of https://sonofgraig.com"
scp -q -i "$KEY" e2e/site-check.mjs "$HOST:carousels/site-check.mjs"
if ssh -i "$KEY" "$HOST" 'cd ~/carousels && node site-check.mjs https://sonofgraig.com > /tmp/e2e-deploy.json' </dev/null; then
  E2E=PASS
else
  E2E=FAIL
fi
ssh -i "$KEY" "$HOST" "python3 -c \"import json;d=json.load(open('/tmp/e2e-deploy.json'));print('    ',d['summary']);[print('     FAIL',f['name'],'-',f['detail']) for f in d['flows'] if not f['ok']];[print('     PAGE',p['path'],p['problems']) for p in d['pages'] if p['problems']]\"" </dev/null || true
echo "E2E $E2E"
[ "$E2E" = PASS ] || { echo "The site is deployed but the end-to-end check FAILED — see above."; exit 1; }
