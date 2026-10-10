#!/usr/bin/env python3
"""Submit every URL in the sitemap to IndexNow (Bing, Yandex, Seznam, Naver, Yep).
Runs after each deploy from prod.sh. Key file: https://sonofgraig.com/c962bcbea1b552021851408d4f728008.txt"""
import json, re, urllib.request
KEY = 'c962bcbea1b552021851408d4f728008'
HOST = 'sonofgraig.com'
xml = urllib.request.urlopen(urllib.request.Request(f'https://{HOST}/sitemap.xml', headers={'User-Agent': 'sonofgraig-indexnow/1'}), timeout=30).read().decode()
urls = re.findall(r'<loc>(.*?)</loc>', xml)
body = json.dumps({'host': HOST, 'key': KEY, 'keyLocation': f'https://{HOST}/{KEY}.txt', 'urlList': urls}).encode()
req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body, method='POST', headers={'Content-Type': 'application/json; charset=utf-8'})
try:
    r = urllib.request.urlopen(req, timeout=30); print(f'indexnow: {r.status} ({len(urls)} urls)')
except urllib.error.HTTPError as e:
    print(f'indexnow: {e.code} {e.read().decode()[:200]}')
