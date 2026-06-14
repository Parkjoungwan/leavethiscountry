"""
Inject related articles section + FAQ schema into all 63 comprehensive articles.
Run from project root: python scripts/inject_related_faq.py
"""
import os, re, json

ARTICLES_DIR = os.path.join(os.path.dirname(__file__), '..', 'articles')

FROM_INFO = {
    'india':    ('🇮🇳', 'India',     'Indian'),
    'korea':    ('🇰🇷', 'South Korea','Korean'),
    'japan':    ('🇯🇵', 'Japan',      'Japanese'),
    'hongkong': ('🇭🇰', 'Hong Kong', 'Hong Kong'),
}
TO_INFO = {
    'canada':      ('🇨🇦', 'Canada'),
    'australia':   ('🇦🇺', 'Australia'),
    'germany':     ('🇩🇪', 'Germany'),
    'singapore':   ('🇸🇬', 'Singapore'),
    'uae':         ('🇦🇪', 'UAE'),
    'uk':          ('🇬🇧', 'UK'),
    'japan':       ('🇯🇵', 'Japan'),
    'usa':         ('🇺🇸', 'USA'),
    'thailand':    ('🇹🇭', 'Thailand'),
    'france':      ('🇫🇷', 'France'),
    'portugal':    ('🇵🇹', 'Portugal'),
    'newzealand':  ('🇳🇿', 'New Zealand'),
    'netherlands': ('🇳🇱', 'Netherlands'),
    'malaysia':    ('🇲🇾', 'Malaysia'),
    'italy':       ('🇮🇹', 'Italy'),
    'spain':       ('🇪🇸', 'Spain'),
}

# Visa-free travel for Japan/Korea to most destinations (simplified)
VISA_FREE = {
    ('japan', 'canada'), ('japan', 'australia'), ('japan', 'germany'), ('japan', 'singapore'),
    ('japan', 'uae'), ('japan', 'uk'), ('japan', 'usa'), ('japan', 'france'),
    ('japan', 'portugal'), ('japan', 'newzealand'), ('japan', 'netherlands'),
    ('japan', 'malaysia'), ('japan', 'italy'), ('japan', 'spain'), ('japan', 'thailand'),
    ('korea', 'canada'), ('korea', 'australia'), ('korea', 'germany'), ('korea', 'singapore'),
    ('korea', 'uae'), ('korea', 'uk'), ('korea', 'usa'), ('korea', 'france'),
    ('korea', 'portugal'), ('korea', 'newzealand'), ('korea', 'netherlands'),
    ('korea', 'malaysia'), ('korea', 'italy'), ('korea', 'spain'), ('korea', 'thailand'),
    ('hongkong', 'uk'), ('hongkong', 'germany'), ('hongkong', 'france'),
    ('hongkong', 'australia'), ('hongkong', 'canada'), ('hongkong', 'newzealand'),
    ('hongkong', 'singapore'), ('hongkong', 'japan'), ('hongkong', 'usa'),
    ('hongkong', 'netherlands'), ('hongkong', 'italy'), ('hongkong', 'spain'),
    ('hongkong', 'portugal'), ('hongkong', 'thailand'), ('hongkong', 'malaysia'),
}

def make_faq(from_c, to_c):
    f_flag, f_name, f_adj = FROM_INFO[from_c]
    t_flag, t_name = TO_INFO[to_c]
    pair = (from_c, to_c)
    visa_free_travel = pair in VISA_FREE

    q1 = f"Is {t_name} a good destination for {f_name} nationals in 2026?"
    a1 = (
        f"{t_name} is one of the popular destinations for {f_adj} nationals due to its strong economy, "
        f"quality of life, and established expat communities. Whether for work, study, or immigration, "
        f"{t_name} offers multiple pathways — each with different requirements and processing timelines. "
        f"This guide covers all four routes in detail."
    )

    if visa_free_travel:
        q2 = f"Can {f_adj} citizens travel to {t_name} without a visa?"
        a2 = (
            f"Yes — {f_name} passport holders can enter {t_name} visa-free for short stays (typically 30–90 days "
            f"depending on the specific destination). No advance visa application is needed for tourism or "
            f"short business trips. For work, study, or long-term stays a separate permit is required."
        )
    else:
        q2 = f"What visa do {f_adj} nationals need to travel to {t_name}?"
        a2 = (
            f"{f_adj} passport holders generally require a tourist or visitor visa for {t_name}. "
            f"Applications are typically submitted online or through the destination country's embassy or VFS center. "
            f"Processing times range from a few days to several weeks. Fees and specific requirements vary by visa category."
        )

    q3 = f"How long does it take to get a work visa for {t_name} from {f_name}?"
    a3 = (
        f"Work visa processing times for {t_name} vary by category and visa type. Employer-sponsored permits "
        f"typically take 1–6 months from application to approval. Highly skilled worker or points-based routes "
        f"may have faster tracks. This guide outlines the main work visa categories and their current processing timelines."
    )

    q4 = f"What is the easiest immigration pathway from {f_name} to {t_name}?"
    a4 = (
        f"The easiest pathway depends on your profile. For most {f_adj} applicants, the fastest routes to {t_name} "
        f"involve points-based skilled immigration systems, employer sponsorship, or graduating from a local institution. "
        f"The immigration section of this guide compares all available pathways including eligibility, costs, and timelines."
    )

    return [
        {"@type": "Question", "name": q1, "acceptedAnswer": {"@type": "Answer", "text": a1}},
        {"@type": "Question", "name": q2, "acceptedAnswer": {"@type": "Answer", "text": a2}},
        {"@type": "Question", "name": q3, "acceptedAnswer": {"@type": "Answer", "text": a3}},
        {"@type": "Question", "name": q4, "acceptedAnswer": {"@type": "Answer", "text": a4}},
    ]


def make_related_html(from_c, to_c, all_pairs):
    f_flag, f_name, f_adj = FROM_INFO[from_c]
    related = [(fn, tc) for fn, tc in all_pairs[from_c] if tc != to_c][:5]
    if not related:
        return ''
    items = '\n      '.join(
        f'<a href="{fn}" class="rel-link">{f_flag} → {TO_INFO[tc][0]} {TO_INFO[tc][1]}</a>'
        for fn, tc in related
    )
    return f'''
  <div class="related-box">
    <h3>More guides from {f_name}</h3>
    <div class="rel-links">
      {items}
    </div>
  </div>'''


RELATED_CSS = """
    .related-box { border-top: 1px solid #1e2d3a; padding-top: 24px; margin-top: 48px; }
    .related-box h3 { font-size: 15px; font-weight: 600; margin-bottom: 16px; color: var(--text); }
    .rel-links { display: flex; flex-wrap: wrap; gap: 10px; }
    .rel-link { display: inline-block; padding: 8px 16px; background: #111a2a; border: 1px solid #1e2d3a; border-radius: 20px; color: var(--accent); text-decoration: none; font-size: 13px; font-weight: 500; transition: border-color 0.2s, background 0.2s; }
    .rel-link:hover { background: #162033; border-color: var(--accent); }"""


def process_articles():
    # Collect all new-format articles
    pattern = re.compile(r'^(\w+)-to-(\w+)-2026\.html$')
    all_files = []
    for f in os.listdir(ARTICLES_DIR):
        m = pattern.match(f)
        if m and not re.search(r'-(work|study|immigration|travel)-', f):
            all_files.append((f, m.group(1), m.group(2)))

    # Build from→[(filename, to_c)] map
    all_pairs = {}
    for fn, fc, tc in all_files:
        if fc not in all_pairs:
            all_pairs[fc] = []
        all_pairs[fc].append((fn, tc))

    updated = 0
    skipped = 0

    for fn, fc, tc in sorted(all_files):
        if fc not in FROM_INFO or tc not in TO_INFO:
            print(f"SKIP (unknown country): {fn}")
            skipped += 1
            continue

        path = os.path.join(ARTICLES_DIR, fn)
        with open(path, 'r', encoding='utf-8') as fh:
            content = fh.read()

        already_related = 'related-box' in content
        already_faq = 'FAQPage' in content

        if already_related and already_faq:
            skipped += 1
            continue

        # 1. Add CSS for related-box (into existing <style> block)
        if not already_related and '.rel-link' not in content:
            content = content.replace('  </style>', RELATED_CSS + '\n  </style>', 1)

        # 2. Inject related articles before </div>\n<script>
        if not already_related:
            related_html = make_related_html(fc, tc, all_pairs)
            if related_html:
                # Insert before the art-wrap closing </div> which is just before <script>
                content = content.replace(
                    '\n</div>\n<script>',
                    related_html + '\n</div>\n<script>',
                    1
                )

        # 3. Inject FAQ JSON-LD after the existing Article JSON-LD
        if not already_faq:
            faq_items = make_faq(fc, tc)
            faq_schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faq_items
            }
            faq_tag = f'\n  <script type="application/ld+json">{json.dumps(faq_schema, ensure_ascii=False)}</script>'
            # Insert after the existing Article ld+json script tag
            content = content.replace(
                '</script>\n  <link rel="icon"',
                '</script>' + faq_tag + '\n  <link rel="icon"',
                1
            )

        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(content)

        updated += 1
        print(f"OK {fn}")

    print(f"\nDone. Updated: {updated}, Skipped: {skipped}")


if __name__ == '__main__':
    process_articles()
