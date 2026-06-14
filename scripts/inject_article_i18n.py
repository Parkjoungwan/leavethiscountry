"""
Add data-i18n attributes, lang switcher, and i18n.js script to all 63 articles.
Run from project root: python scripts/inject_article_i18n.py
"""
import os, re

ARTICLES_DIR = os.path.join(os.path.dirname(__file__), '..', 'articles')

FROM_INFO = {
    'india':    ('India',     'from_india'),
    'korea':    ('South Korea', 'from_korea'),
    'japan':    ('Japan',     'from_japan'),
    'hongkong': ('Hong Kong', 'from_hongkong'),
}

LANG_SW = '''\
<div class="lang-sw art-lang-sw">
      <button class="lang-trigger">&#127760; <span class="lang-current">EN</span></button>
      <div class="lang-menu">
        <button class="lang-opt" data-lang="en">English</button>
        <button class="lang-opt" data-lang="ko">한국어</button>
        <button class="lang-opt" data-lang="zh">繁中</button>
        <button class="lang-opt" data-lang="hi">हिंदी</button>
        <button class="lang-opt" data-lang="ja">日本語</button>
      </div>
    </div>'''

REPLACEMENTS = [
    # Back to map link
    ('<a href="../index.html">← Back to map</a>',
     '<a href="../index.html" data-i18n="back_to_map">← Back to map</a>'),
    # Breadcrumb Home
    ('<a href="../index.html">Home</a>',
     '<a href="../index.html" data-i18n="home">Home</a>'),
    # Purpose tabs
    ('<a href="#work" class="purpose-tab">Work</a>',
     '<a href="#work" class="purpose-tab" data-i18n="art_work">Work</a>'),
    ('<a href="#study" class="purpose-tab">Study</a>',
     '<a href="#study" class="purpose-tab" data-i18n="art_study">Study</a>'),
    ('<a href="#immigration" class="purpose-tab">Immigration</a>',
     '<a href="#immigration" class="purpose-tab" data-i18n="art_immigration">Immigration</a>'),
    ('<a href="#travel" class="purpose-tab">Travel</a>',
     '<a href="#travel" class="purpose-tab" data-i18n="art_travel">Travel</a>'),
    # Summary box h3 titles
    ('<h3>Quick Facts — Work</h3>',
     '<h3 data-i18n="qf_work">Quick Facts — Work</h3>'),
    ('<h3>Quick Facts — Study</h3>',
     '<h3 data-i18n="qf_study">Quick Facts — Study</h3>'),
    ('<h3>Quick Facts — Immigration</h3>',
     '<h3 data-i18n="qf_immigration">Quick Facts — Immigration</h3>'),
    ('<h3>Quick Facts — Travel</h3>',
     '<h3 data-i18n="qf_travel">Quick Facts — Travel</h3>'),
    # Common summary labels
    ('<div class="label">Difficulty</div>',
     '<div class="label" data-i18n="label_difficulty">Difficulty</div>'),
    ('<div class="label">Processing Time</div>',
     '<div class="label" data-i18n="label_processing">Processing Time</div>'),
    # Official Sources
    ('<h3>Official Sources</h3>',
     '<h3 data-i18n="official_sources">Official Sources</h3>'),
    # About this guide
    ('<strong style="color:var(--text)">About this guide</strong>',
     '<strong style="color:var(--text)" data-i18n="about_guide">About this guide</strong>'),
]


def process(fn, from_c):
    path = os.path.join(ARTICLES_DIR, fn)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'data-i18n="back_to_map"' in content:
        return False  # already done

    # Apply simple replacements
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)

    # "More guides from {Country}" → split spans
    from_name, from_key = FROM_INFO[from_c]
    old_h3 = f'<h3>More guides from {from_name}</h3>'
    new_h3 = (f'<h3>'
              f'<span data-i18n="more_guides_from">More guides from</span> '
              f'<span data-i18n="{from_key}">{from_name}</span>'
              f'</h3>')
    content = content.replace(old_h3, new_h3)

    # Add lang switcher to art-nav (after back-to-map link)
    content = content.replace(
        '<a href="../index.html" data-i18n="back_to_map">← Back to map</a>\n  </nav>',
        '<a href="../index.html" data-i18n="back_to_map">← Back to map</a>\n    ' + LANG_SW + '\n  </nav>'
    )

    # Add i18n.js before </body>
    content = content.replace('</body>', '<script src="../js/i18n.js"></script>\n</body>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    return True


def main():
    pattern = re.compile(r'^(\w+)-to-(\w+)-2026\.html$')
    updated = skipped = 0
    for fn in sorted(os.listdir(ARTICLES_DIR)):
        m = pattern.match(fn)
        if not m or re.search(r'-(work|study|immigration|travel)-', fn):
            continue
        fc = m.group(1)
        if fc not in FROM_INFO:
            continue
        if process(fn, fc):
            updated += 1
            print(f'OK {fn}')
        else:
            skipped += 1
    print(f'\nDone. Updated: {updated}, Skipped: {skipped}')


if __name__ == '__main__':
    main()
