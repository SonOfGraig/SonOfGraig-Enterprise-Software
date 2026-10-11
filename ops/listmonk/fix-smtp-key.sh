#!/usr/bin/env bash
# Restore listmonk's Resend SMTP password (run ON the T110, as graig).
#
# 2026-10-11: every newsletter sign-up failed with "535 Authentication
# credentials invalid". listmonk's stored SMTP password had been replaced by
# the settings screen's masked placeholder ("re_xxxxx•••…") when the branding
# was applied on 2026-10-10 11:33 UTC (brand_apply.py saved the settings it had
# read back, mask included). The website's own Resend key still authenticates,
# so this copies it in — the key never leaves this machine or gets printed.
#
#   ssh -i ~/.ssh/graig_t110 graig@100.87.178.52 'bash -s' < ops/listmonk/fix-smtp-key.sh
#
# Lesson: never PUT listmonk settings that came from a GET — passwords come
# back masked. Change only the keys you mean to, or set SMTP last, by hand.
set -euo pipefail
# This script arrives on stdin (`bash -s`): any command that reads stdin would
# swallow the rest of it. Every docker call below gets </dev/null or a heredoc.
cd ~/listmonk

KEY=$(grep '^RESEND_API_KEY=' ~/sog-website/.env.production.local | cut -d= -f2- | tr -d '"\r')
[ -n "$KEY" ] || { echo "FAIL: no RESEND_API_KEY in the website env"; exit 1; }

echo "1/4 checking the key logs in to Resend SMTP (sends nothing)"
K="$KEY" python3 - <<'PY'
import os, smtplib, sys
s = smtplib.SMTP("smtp.resend.com", 587, timeout=15); s.starttls()
try:
    s.login("resend", os.environ["K"]); print("    AUTH OK")
except Exception as e:
    print("    AUTH FAILED:", e); sys.exit(1)
finally:
    s.quit()
PY

echo "2/4 backing up listmonk settings"
docker compose exec -T db pg_dump -U listmonk -d listmonk -t settings </dev/null > settings-backup-$(date +%Y%m%d-%H%M%S).sql
chmod 600 settings-backup-*.sql

echo "3/4 writing the key into the smtp.resend.com server entry"
# The key goes in through the environment (`-e K` with no value copies it from
# ours, so it is never on a command line) and the SQL through stdin.
export K="$KEY"
docker compose exec -T -e K db sh -c 'psql -U listmonk -d listmonk -v ON_ERROR_STOP=1 -q -v k="$K"' <<'SQL'
UPDATE settings SET value = (
  SELECT jsonb_agg(CASE WHEN e->>'host' = 'smtp.resend.com'
                        THEN jsonb_set(e, '{password}', to_jsonb(:'k'::text)) ELSE e END)
  FROM jsonb_array_elements(value) e), updated_at = now()
WHERE key = 'smtp';
SQL
unset K
STORED=$(docker compose exec -T db psql -U listmonk -d listmonk -tAc \
  "select e->>'password' from settings, jsonb_array_elements(value) e where key='smtp' and e->>'host'='smtp.resend.com'" </dev/null | tr -d '\r\n')
[ "$STORED" = "$KEY" ] || { echo "FAIL: stored password does not match after update"; exit 1; }
echo "    stored key matches"

echo "4/4 restarting listmonk"
docker compose restart app </dev/null >/dev/null
sleep 8
docker compose logs --since 20s app </dev/null | grep -E "messenger|error" || true
echo "DONE — subscribe on https://sonofgraig.com (footer) to confirm the email arrives."
