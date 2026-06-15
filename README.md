# LeaveThisCountry

**Visa difficulty comparison tool for passport holders planning to work, study, immigrate, or travel abroad.**

Live: [leavethiscountry.cloud](https://leavethiscountry.cloud)

---

## What It Does

Interactive world map showing visa difficulty (Easy / Moderate / Hard), processing times, annual costs, and key conditions across 16 destination countries — for 7 origin passports.

**Origin countries:** India, South Korea, Japan, Hong Kong, USA, France, Tunisia  
**Destination countries:** Canada, Germany, Australia, Singapore, UAE, UK, Japan, Portugal, USA, Thailand, New Zealand, France, Netherlands, Italy, Spain, Malaysia  
**Purposes:** Work · Study · Immigration · Travel

Each origin × destination combination has a dedicated article with visa details, requirements, and official source links.

---

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS — no build step, no framework
- **Map:** D3.js v7 + TopoJSON (orthographic projection)
- **Globe animation:** D3 geoOrthographic + world-atlas 110m topology
- **Hosting:** Cloudflare Pages (auto-deploy from main branch)
- **i18n:** 5 languages (EN / KO / ZH / HI / JA) via localStorage

---

## Project Structure

```
/
├── index.html              # Main app (country selection + D3 map)
├── css/style.css
├── js/
│   ├── app.js              # Globe animation, country select, transitions
│   ├── map.js              # D3 world map rendering
│   ├── i18n.js             # Translation strings + language switcher
│   ├── tooltip.js          # Map hover tooltip
│   ├── ranking.js          # Side panel rankings
│   ├── rates.js            # Exchange rate fetching
│   └── article-map.js      # Article page map (mini)
├── data/
│   └── countries.js        # All visa data: FROM_COUNTRIES, TO_COUNTRIES, DATA
├── articles/               # 155+ country-pair guides (HTML)
├── scripts/
│   ├── generate_new_articles.py   # Article generator for usa/france/tunisia
│   └── inject_article_i18n.py     # Adds i18n attrs to article HTML
├── llms.txt                # LLM citation index (llmstxt.org format)
├── sitemap.xml
└── robots.txt              # Allows all major LLM crawlers
```

---

## Content Scale

| Origin | Articles |
|--------|---------|
| India | 33 (incl. purpose variants) |
| South Korea | 32 |
| Hong Kong | 32 |
| Japan | 30 |
| USA | 15 |
| France | 15 |
| Tunisia | 16 |
| **Total** | **173** |

---

## SEO / GEO Strategy

**Technical SEO**
- Canonical URLs, sitemap.xml (112 entries), robots.txt
- Schema.org: Article + FAQPage JSON-LD on all articles
- WebSite, WebApplication, Dataset schemas on homepage
- Speakable spec for voice search

**GEO (Generative Engine Optimization)**
- `llms.txt` in llmstxt.org format — all 109 main article URLs with descriptions
- `robots.txt` allowlist for 9 LLM crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
- Schema.org `about`, `keywords`, `spatialCoverage` on Dataset

**Planned growth levers**
1. Manual rewrites of high-traffic routes (india→canada, korea→germany) for content quality
2. Community distribution: Reddit r/IWantOut, r/expats, r/digitalnomad; Korean/Indian immigration forums
3. Shareable result cards feature (screenshot-friendly visa summary)
4. Monetization: AdSense (target after 3 months + real traffic), or direct affiliate with visa/immigration services

---

## Adding New Origin Countries

1. Add to `FROM_COUNTRIES` and `FROM_CURRENCY` in `data/countries.js`
2. Add country card to `index.html`
3. Add i18n keys to `js/i18n.js` (all 5 languages)
4. Add visa DATA block in `data/countries.js`
5. Run `python scripts/generate_new_articles.py` to generate articles
6. Update `llms.txt` and `sitemap.xml`

---

## Data Accuracy

Visa data sourced from official government immigration portals. Difficulty ratings:
- **Easy** — straightforward process, high approval rate, minimal documentation
- **Moderate** — requires preparation, some conditions, standard approval
- **Hard** — quotas, lotteries, language requirements, or long backlogs

Last data review: June 2026. This site provides general information only — not legal or immigration advice.
