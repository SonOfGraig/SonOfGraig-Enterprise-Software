#!/usr/bin/env python3
"""Fortnightly sonofgraig Insights digest: reads the site's RSS feed and creates
a DRAFT campaign in listmonk for posts published since the last digest.
Never sends - Tumiso reviews and sends from the admin (Tailscale only)."""
import datetime as dt, html, json, os, sys, urllib.request, xml.etree.ElementTree as ET
sys.path.insert(0, os.path.expanduser('~/listmonk'))
from lm import api

FEED = 'https://sonofgraig.com/feed.xml'
STATE = os.path.expanduser('~/listmonk/digest_state.json')
TEMPLATE_NAME = 'sonofgraig Insights'
FIRST_ISSUE_POSTS = 3

def feed_items():
    req = urllib.request.Request(FEED, headers={'User-Agent': 'sonofgraig-digest/1'})
    root = ET.fromstring(urllib.request.urlopen(req, timeout=30).read())
    out = []
    for it in root.iter('item'):
        g = lambda t: (it.findtext(t) or '').strip()
        out.append({'title': g('title'), 'link': g('link'), 'desc': g('description'), 'cat': g('category'),
                    'date': dt.datetime.strptime(g('pubDate'), '%a, %d %b %Y %H:%M:%S %Z').replace(tzinfo=dt.timezone.utc)})
    return sorted(out, key=lambda x: x['date'], reverse=True)

def main():
    dry = '--dry-run' in sys.argv
    state = json.load(open(STATE)) if os.path.exists(STATE) else {}
    items = feed_items()
    if 'last' in state:
        last = dt.datetime.fromisoformat(state['last'])
        posts = [i for i in items if i['date'] > last]
    else:
        posts = items[:FIRST_ISSUE_POSTS]
    if not posts:
        print('no new posts since last digest; nothing drafted'); return

    lists = api('GET', '/api/lists?per_page=all')['data']['results']
    insights = [l['id'] for l in lists if 'insights' in l['tags']]
    tpl = [t['id'] for t in api('GET', '/api/templates')['data'] if t['name'] == TEMPLATE_NAME]
    today = dt.date.today()
    tag = f"insights-{today.isoformat()}"

    cards = []
    for p in posts:
        url = f"{p['link']}?utm_source=newsletter&utm_medium=email&utm_campaign={tag}"
        # Glass post card, same look as lib/email/kit.ts panels.
        cards.append(
            f'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;margin:0 0 14px;"><tr>'
            f'<td style="background-color:#F3F8FD;background-image:linear-gradient(180deg,#F7FBFE 0%,#EFF6FC 100%);border:1px solid #DCE7F2;border-radius:16px;padding:18px 20px;">'
            f'<span style="display:inline-block;background-color:#E6F4FC;color:#065A82;border:1px solid rgba(11,158,222,0.28);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;line-height:1;padding:5px 10px;border-radius:999px;">{html.escape(p["cat"])}</span>'
            f'<a href="{html.escape(url)}" style="display:block;margin-top:10px;font-family:Manrope,Inter,-apple-system,sans-serif;font-size:18px;line-height:1.3;font-weight:800;letter-spacing:-0.02em;color:#0D1117;text-decoration:none;">{html.escape(p["title"])}</a>'
            f'<p style="margin:6px 0 10px;color:#4B5563;font-size:14px;line-height:1.6;">{html.escape(p["desc"])}</p>'
            f'<a href="{html.escape(url)}" style="font-size:14px;font-weight:600;color:#0B9EDE;text-decoration:none;">Read the article &rarr;</a>'
            f'</td></tr></table>')
    body = ('<p>Hello,</p>'
            '<p>[Write a short personal intro here - what you are working on, one line on why these matter.]</p>'
            '<h2>New on Insights</h2>'
            + ''.join(cards) +
            '<p style="margin-top:24px;">Reply to this email any time - it comes straight to me.</p>'
            '<p style="margin:0;font-weight:700;color:#0D1117;">Tumiso Graig Ramaboya</p>'
            '<p style="margin:0;font-size:13px;color:#6B7280;">Founder, sonofgraig</p>')
    n = len(posts)
    subject = posts[0]['title'] if n == 1 else f"{posts[0]['title']} (+{n-1} more)"
    camp = {'name': f"sonofgraig Insights - {today:%d %b %Y}", 'subject': subject, 'lists': insights,
            'type': 'regular', 'content_type': 'html', 'body': body, 'tags': ['digest', tag],
            'messenger': 'email'}
    if tpl: camp['template_id'] = tpl[0]
    if dry:
        print(json.dumps({k: v for k, v in camp.items() if k != 'body'}, indent=1)); print(f'{n} posts'); return
    r = api('POST', '/api/campaigns', camp)
    if 'data' not in r: print('FAILED', r); sys.exit(1)
    json.dump({'last': posts[0]['date'].isoformat()}, open(STATE, 'w'))
    print(f"drafted campaign {r['data']['id']}: {subject} ({n} posts)")

if __name__ == '__main__':
    main()
