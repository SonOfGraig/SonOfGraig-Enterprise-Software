#!/usr/bin/env bash
# Deploy the sonofgraig Insights look to listmonk on the T110 (run from Git Bash
# on the 8200, in the repo root):
#
#   bash ops/listmonk/apply-branding.sh
#
# What it changes, and nothing else:
#   1. static overrides  → ~/listmonk/static/{email-templates,public/templates}
#      (opt-in email + public page shell; listmonk reads them at start)
#   2. campaign template → the "sonofgraig Insights" row in the templates table
#   3. public page CSS   → the single settings row appearance.public.custom_css
#   4. digest.py         → ~/listmonk/digest.py
#   then restarts the listmonk app container.
#
# NEVER save listmonk's whole settings object (UI or API): passwords come back
# masked and get stored as-is — that is how the SMTP key was wiped on 2026-10-10.
# Step 3 touches exactly one row, and the script proves the SMTP password is
# unchanged before and after.
set -euo pipefail
KEY=~/.ssh/graig_t110
HOST=graig@100.87.178.52
cd "$(git rev-parse --show-toplevel)/ops/listmonk"

tmp=$(mktemp -d)
tar -czf "$tmp/brand.tgz" brand template.html digest.py
echo "1/2 uploading"
scp -q -i "$KEY" "$tmp/brand.tgz" "$HOST:listmonk/brand.tgz"
rm -rf "$tmp"

echo "2/2 applying on the T110"
ssh -i "$KEY" "$HOST" 'bash -s' <<'REMOTE'
set -euo pipefail
cd ~/listmonk
# Every docker call gets </dev/null or its own heredoc: this script arrives on
# stdin, and a command that reads stdin would swallow the rest of it.
q() { docker compose exec -T db psql -U listmonk -d listmonk -tAc "$1" </dev/null | tr -d '\r'; }
smtp_sha() { q "select value from settings where key='smtp'" | sha256sum | cut -c1-16; }

before=$(smtp_sha)
docker compose exec -T db pg_dump -U listmonk -d listmonk -t settings -t templates </dev/null > "branding-backup-$(date +%Y%m%d-%H%M%S).sql"
chmod 600 branding-backup-*.sql

rm -rf /tmp/sg-brand && mkdir -p /tmp/sg-brand
tar -xzf brand.tgz -C /tmp/sg-brand && rm brand.tgz
cp /tmp/sg-brand/brand/email-templates/*.html static/email-templates/
cp /tmp/sg-brand/brand/public/templates/*.html static/public/templates/
cp /tmp/sg-brand/digest.py digest.py
echo "    static overrides + digest.py copied"

n=$(q "select count(*) from templates where name='sonofgraig Insights' and type='campaign'")
[ "$n" = "1" ] || { echo "FAIL: expected one campaign template named 'sonofgraig Insights', found $n"; exit 1; }
c=$(q "select count(*) from settings where key='appearance.public.custom_css'")
[ "$c" = "1" ] || { echo "FAIL: settings row appearance.public.custom_css not found ($c)"; exit 1; }
docker compose exec -T db sh -c 'cat > /tmp/sg-template.html' < /tmp/sg-brand/template.html
docker compose exec -T db sh -c 'cat > /tmp/sg-custom.css' < /tmp/sg-brand/brand/custom.css
docker compose exec -T db psql -U listmonk -d listmonk -v ON_ERROR_STOP=1 -q <<'SQL'
\set body `cat /tmp/sg-template.html`
\set css `cat /tmp/sg-custom.css`
UPDATE templates SET body = :'body', updated_at = now() WHERE name = 'sonofgraig Insights' AND type = 'campaign';
UPDATE settings SET value = to_jsonb(:'css'::text), updated_at = now() WHERE key = 'appearance.public.custom_css';
SQL
docker compose exec -T db rm -f /tmp/sg-template.html /tmp/sg-custom.css </dev/null
echo "    campaign template + public CSS written"

after=$(smtp_sha)
[ "$before" = "$after" ] || { echo "FAIL: the SMTP settings changed — restore from branding-backup-*.sql"; exit 1; }
echo "    SMTP settings untouched"

docker compose restart app </dev/null >/dev/null
sleep 8
docker compose logs --since 20s app </dev/null | grep -E "messenger|error|template" || true
curl -s -o /dev/null -w "    public page: %{http_code}\n" http://127.0.0.1:9000/subscription/form
echo "DONE"
REMOTE
