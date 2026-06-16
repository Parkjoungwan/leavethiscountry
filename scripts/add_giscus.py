#!/usr/bin/env python3
"""Wrap art-wrap in art-layout and inject Giscus comments sidebar into all article HTML files."""
import os, re

ARTICLES_DIR = os.path.join(os.path.dirname(__file__), '..', 'articles')

GISCUS_ASIDE = '''\n<aside class="art-comments">\n  <div class="art-comments-title">Comments</div>\n  <script src="https://giscus.app/client.js"\n          data-repo="Parkjoungwan/leavethiscountry"\n          data-repo-id="R_kgDOS5qvFg"\n          data-category="General"\n          data-category-id="DIC_kwDOS5qvFs4C_Opp"\n          data-mapping="pathname"\n          data-strict="0"\n          data-reactions-enabled="1"\n          data-emit-metadata="0"\n          data-input-position="bottom"\n          data-theme="preferred_color_scheme"\n          data-lang="ko"\n          crossorigin="anonymous"\n          async>\n  </script>\n</aside>\n</div>'''

updated = 0
skipped = 0

for fname in sorted(os.listdir(ARTICLES_DIR)):
    if not fname.endswith('.html'):
        continue
    fpath = os.path.join(ARTICLES_DIR, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'art-layout' in content:
        skipped += 1
        continue

    # 1. Wrap body opening: <body>\n<div class="art-wrap"> → <body>\n<div class="art-layout">\n<div class="art-wrap">
    new_content = content.replace(
        '<body>\n<div class="art-wrap">',
        '<body>\n<div class="art-layout">\n<div class="art-wrap">'
    )
    if new_content == content:
        print(f'SKIP (no match): {fname}')
        skipped += 1
        continue

    # 2. Close art-wrap and insert sidebar before <script>
    # Pattern: unindented </div> followed by \n<script>
    new_content, n = re.subn(
        r'\n</div>\n(<script>)',
        GISCUS_ASIDE + r'\n<\1>',
        new_content,
        count=1
    )
    if n == 0:
        print(f'WARN (no script tag found): {fname}')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    updated += 1

print(f'\nDone: {updated} updated, {skipped} skipped')
