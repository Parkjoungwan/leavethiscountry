#!/usr/bin/env python3
"""Fix WARN files: inject Giscus sidebar + close art-layout for articles without <script> tags."""
import os, re

ARTICLES_DIR = os.path.join(os.path.dirname(__file__), '..', 'articles')

GISCUS_ASIDE = '''\n<aside class="art-comments">\n  <div class="art-comments-title">Comments</div>\n  <script src="https://giscus.app/client.js"\n          data-repo="Parkjoungwan/leavethiscountry"\n          data-repo-id="R_kgDOS5qvFg"\n          data-category="General"\n          data-category-id="DIC_kwDOS5qvFs4C_Opp"\n          data-mapping="pathname"\n          data-strict="0"\n          data-reactions-enabled="1"\n          data-emit-metadata="0"\n          data-input-position="bottom"\n          data-theme="preferred_color_scheme"\n          data-lang="ko"\n          crossorigin="anonymous"\n          async>\n  </script>\n</aside>\n</div>'''

fixed = 0
skipped = 0

for fname in sorted(os.listdir(ARTICLES_DIR)):
    if not fname.endswith('.html'):
        continue
    fpath = os.path.join(ARTICLES_DIR, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Only fix files that have art-layout (already processed) but no art-comments yet
    if 'art-layout' not in content or 'art-comments' in content:
        skipped += 1
        continue

    # These files end with: \n</div>\n</body>
    new_content, n = re.subn(
        r'\n</div>\n</body>',
        GISCUS_ASIDE + '\n</body>',
        new_content if False else content,
        count=1
    )
    if n == 0:
        print(f'SKIP (no match): {fname}')
        skipped += 1
        continue

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    fixed += 1

print(f'\nDone: {fixed} fixed, {skipped} skipped')
