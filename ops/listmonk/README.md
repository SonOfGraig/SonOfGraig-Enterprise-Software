# sonofgraig Insights (listmonk on the T110)

Copies of the files that run on the T110 in `~/listmonk/`. Secrets live only there
(`.env`, `api.env`, mode 600) and are never committed.

- `template.html`: the default campaign template ("sonofgraig Insights").
- `digest.py`: runs from cron at `0 5 1,15 * *` (07:00 SAST). It reads
  https://sonofgraig.com/feed.xml and creates a **draft** campaign for the Insights list
  covering posts published since the last digest (`digest_state.json`). It never sends.

Admin: http://100.87.178.52:9000/admin (Tailscale only). The public paths
(`/subscription`, `/link`, `/campaign`, `/public`, `/uploads`) are served at
https://lists.sonofgraig.com through the Cloudflare Tunnel; everything else returns 404.
