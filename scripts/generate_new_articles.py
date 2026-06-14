"""
Generate 46 new articles for USA, France, Tunisia as origin countries.
Run from project root: python scripts/generate_new_articles.py
"""
import os, re

ARTICLES_DIR = os.path.join(os.path.dirname(__file__), '..', 'articles')

FROM_INFO = {
    'usa': {
        'name': 'USA', 'flag': '\U0001f1fa\U0001f1f8', 'code': 'US', 'rank': 8,
        'i18n_key': 'from_usa',
        'currency_note': 'Costs in USD.',
    },
    'france': {
        'name': 'France', 'flag': '\U0001f1eb\U0001f1f7', 'code': 'FR', 'rank': 4,
        'i18n_key': 'from_france',
        'currency_note': 'Costs shown in USD equivalent.',
    },
    'tunisia': {
        'name': 'Tunisia', 'flag': '\U0001f1f9\U0001f1f3', 'code': 'TN', 'rank': 82,
        'i18n_key': 'from_tunisia',
        'currency_note': 'Costs shown in USD equivalent.',
    },
}

TO_INFO = {
    'canada':      {'name': 'Canada',      'flag': '\U0001f1e8\U0001f1e6', 'code': 'CA'},
    'germany':     {'name': 'Germany',     'flag': '\U0001f1e9\U0001f1ea', 'code': 'DE'},
    'australia':   {'name': 'Australia',   'flag': '\U0001f1e6\U0001f1fa', 'code': 'AU'},
    'singapore':   {'name': 'Singapore',   'flag': '\U0001f1f8\U0001f1ec', 'code': 'SG'},
    'uae':         {'name': 'UAE',         'flag': '\U0001f1e6\U0001f1ea', 'code': 'AE'},
    'uk':          {'name': 'UK',          'flag': '\U0001f1ec\U0001f1e7', 'code': 'GB'},
    'japan':       {'name': 'Japan',       'flag': '\U0001f1ef\U0001f1f5', 'code': 'JP'},
    'portugal':    {'name': 'Portugal',    'flag': '\U0001f1f5\U0001f1f9', 'code': 'PT'},
    'usa':         {'name': 'USA',         'flag': '\U0001f1fa\U0001f1f8', 'code': 'US'},
    'thailand':    {'name': 'Thailand',    'flag': '\U0001f1f9\U0001f1ed', 'code': 'TH'},
    'newzealand':  {'name': 'New Zealand', 'flag': '\U0001f1f3\U0001f1ff', 'code': 'NZ'},
    'france':      {'name': 'France',      'flag': '\U0001f1eb\U0001f1f7', 'code': 'FR'},
    'netherlands': {'name': 'Netherlands', 'flag': '\U0001f1f3\U0001f1f1', 'code': 'NL'},
    'italy':       {'name': 'Italy',       'flag': '\U0001f1ee\U0001f1f9', 'code': 'IT'},
    'spain':       {'name': 'Spain',       'flag': '\U0001f1ea\U0001f1f8', 'code': 'ES'},
    'malaysia':    {'name': 'Malaysia',    'flag': '\U0001f1f2\U0001f1fe', 'code': 'MY'},
}

# ── Visa data embedded from countries.js DATA block ──────────────────────────
DATA = {
    'usa': {
        'study': {
            'canada':      {'difficulty':'easy','processingDays':'8–12 weeks','visaFee':150,'special':'Study Permit easy for Americans. No GIC required. CUSMA/USMCA professionals pathway post-study. Quebec French programs available.','mainVisa':'Study Permit','cost':'CAD 30K–45K/yr'},
            'germany':     {'difficulty':'easy','processingDays':'60–90 days','visaFee':75,'special':'Public universities nearly free (€170–350/semester). Blocked account €11,904 required. DAAD scholarships available for Americans.','mainVisa':'National Visa (Studium)','cost':'€8K–12K/yr'},
            'australia':   {'difficulty':'easy','processingDays':'14–21 days','visaFee':710,'special':'Student visa 500. Americans fast-tracked. GTE statement required. 48hr/week work allowed. Post-study Graduate visa 2–4yr.','mainVisa':'Student Visa 500','cost':'AUD 30K–45K/yr'},
            'singapore':   {'difficulty':'easy','processingDays':'14–28 days','visaFee':30,'special':'NUS and NTU attract many American students. Strong English instruction. Excellent APAC job placement for graduates.','mainVisa':'Student Pass (ICA)','cost':'SGD 20K–30K/yr'},
            'uae':         {'difficulty':'easy','processingDays':'7 days','visaFee':270,'special':'MBZUAI and Khalifa University attract international students. Visa linked to enrollment. Strong scholarships. Tax-free living.','mainVisa':'University Student Visa','cost':'AED 50K–80K/yr'},
            'uk':          {'difficulty':'easy','processingDays':'3 weeks','visaFee':490,'special':'Student visa for Americans same as other nationalities. IHS fee £776/yr. 2yr Graduate visa after study.','mainVisa':'UK Student Visa','cost':'£20K–35K/yr'},
            'japan':       {'difficulty':'moderate','processingDays':'3–5 days (after CoE: 3 months)','visaFee':30,'special':'CoE from school takes 3 months. English-taught programs expanding at Waseda, Keio. JET Programme available post-graduation.','mainVisa':'College Student Visa (CoE)','cost':'¥1.2M–2M/yr'},
            'portugal':    {'difficulty':'easy','processingDays':'30 days','visaFee':90,'special':'D4 Student Visa. Public universities €700–1,500/yr. EU access after residency. Popular with American students for affordability.','mainVisa':'D4 Student Visa','cost':'€7K–12K/yr'},
            'thailand':    {'difficulty':'easy','processingDays':'7 days','visaFee':40,'special':'ED (Education) visa. Many English-taught programs at MUIC and Mahidol International. Low cost of living.','mainVisa':'Non-ED Visa','cost':'฿120K–200K/yr'},
            'newzealand':  {'difficulty':'easy','processingDays':'14 days','visaFee':330,'special':'Post-study work visa 3yr. Part-time work 20hr/wk during study. Auckland and Otago University popular with American students.','mainVisa':'Student Visa','cost':'NZD 25K–40K/yr'},
            'france':      {'difficulty':'moderate','processingDays':'30 days','visaFee':99,'special':'Long-stay VLS-TS student visa. Campus France procedure mandatory for Grandes Écoles. Public universities from €170/yr.','mainVisa':'VLS-TS Étudiant','cost':'€8K–15K/yr'},
            'netherlands': {'difficulty':'easy','processingDays':'30 days','visaFee':207,'special':'MVV + residence permit via university. Orientation year after graduation. TU Delft and UvA popular with Americans.','mainVisa':'MVV + Residence Permit','cost':'€12K–20K/yr'},
            'italy':       {'difficulty':'easy','processingDays':'15–30 days','visaFee':116,'special':'Type D national visa. Public universities €900–4,000/yr. Many Americans study art and design in Florence and Milan.','mainVisa':'Type D Student Visa','cost':'€5K–15K/yr'},
            'spain':       {'difficulty':'easy','processingDays':'15–30 days','visaFee':80,'special':'National D student visa. Public universities from €800/yr. NIE number required. Barcelona and Madrid top choices.','mainVisa':'National D Student Visa','cost':'€8K–14K/yr'},
            'malaysia':    {'difficulty':'easy','processingDays':'7–14 days','visaFee':110,'special':'Student Pass via EMGS. Low cost vs. Western universities. UTM and UM ranked top in Southeast Asia. English-medium instruction.','mainVisa':'Student Pass (EMGS)','cost':'MYR 25K–45K/yr'},
        },
        'work': {
            'canada':      {'difficulty':'easy','processingDays':'3–7 days (CUSMA)','visaFee':155,'special':'CUSMA (USMCA) covers 60+ professions — no LMIA needed. Present qualifications at port of entry. 1-year permit, renewable.','mainVisa':'CUSMA Work Permit','cost':'Minimal fees'},
            'germany':     {'difficulty':'easy','processingDays':'14–21 days','visaFee':120,'special':'EU Blue Card for salary €45K+. Opportunity Card for job seekers. Americans in high demand in tech, auto, and engineering.','mainVisa':'EU Blue Card / Opportunity Card','cost':'€120–450 visa fee'},
            'australia':   {'difficulty':'moderate','processingDays':'60–90 days','visaFee':3115,'special':'TSS (482) employer sponsor required. Points-tested skilled migration via 189/190. Large American expat community.','mainVisa':'TSS 482 / Skilled 189','cost':'AUD 4,640 visa fee'},
            'singapore':   {'difficulty':'moderate','processingDays':'3–8 weeks','visaFee':105,'special':'Employment Pass requires salary SGD 5,000+/month. American professionals highly competitive in finance, tech, consulting.','mainVisa':'Employment Pass (EP)','cost':'SGD 105 EP fee'},
            'uae':         {'difficulty':'easy','processingDays':'2–4 weeks','visaFee':500,'special':'Employer-sponsored work visa easy for Americans. Golden Visa (10yr) for salary AED 30K+/month. Tax-free income.','mainVisa':'Employment Visa / Golden Visa','cost':'AED 500–2,000 fees'},
            'uk':          {'difficulty':'moderate','processingDays':'3–8 weeks','visaFee':239,'special':'Skilled Worker visa. Certificate of Sponsorship required. Salary threshold £38,700+. Americans competitive in finance, law, tech.','mainVisa':'Skilled Worker Visa','cost':'£239 visa fee'},
            'japan':       {'difficulty':'moderate','processingDays':'1–3 months','visaFee':20,'special':'Engineer/Specialist in Humanities visa. JET Programme entry available. HSP highly skilled professional fast-track route.','mainVisa':'Engineer / Specialist Visa','cost':'¥3,000 visa fee'},
            'portugal':    {'difficulty':'easy','processingDays':'30–60 days','visaFee':83,'special':'D3 Highly Qualified or D8 Digital Nomad Visa (income €3,480+/month). Popular destination for American remote workers.','mainVisa':'D3 / D8 Visa','cost':'€83–440 visa fee'},
            'thailand':    {'difficulty':'moderate','processingDays':'3–4 weeks','visaFee':80,'special':'Non-Immigrant B visa + Work Permit required. BOI company sponsorship helps. LTR Visa for high-income remote workers.','mainVisa':'Non-B + Work Permit','cost':'฿2,000 Non-B + permit'},
            'newzealand':  {'difficulty':'easy','processingDays':'14–28 days','visaFee':470,'special':'Accredited Employer Work Visa (AEWV). Americans in demand for tech and finance. Skilled Migrant PR pathway available.','mainVisa':'AEWV','cost':'NZD 700 AEWV fee'},
            'france':      {'difficulty':'moderate','processingDays':'30–60 days','visaFee':99,'special':'Talent Passport for salary €35K+ or in-demand profession. Employer sponsorship for other cases. Some tech roles English-only.','mainVisa':'Talent Passport / Salarié','cost':'€99 Talent Passport'},
            'netherlands': {'difficulty':'easy','processingDays':'30–45 days','visaFee':207,'special':'Highly Skilled Migrant visa. Salary threshold €5,670+/month. ASML, Booking.com, Philips hire Americans. 30% tax ruling available.','mainVisa':'Highly Skilled Migrant (HSM)','cost':'€207 HSM permit'},
            'italy':       {'difficulty':'moderate','processingDays':'30–60 days','visaFee':116,'special':'Decreto Flussi quota for non-EU workers. EU Blue Card via local company also viable. Permesso di soggiorno required.','mainVisa':'Decreto Flussi / EU Blue Card','cost':'€116 visa fee'},
            'spain':       {'difficulty':'moderate','processingDays':'1–3 months','visaFee':80,'special':'Digital Nomad Visa for remote workers (income €2,300+/month). Highly Qualified Professionals visa also available.','mainVisa':'Digital Nomad Visa / HQP','cost':'€80–200 visa fee'},
            'malaysia':    {'difficulty':'easy','processingDays':'2–4 weeks','visaFee':330,'special':'Employment Pass Tier 1 (salary RM 10,000+). Many MNCs hire Americans for KL offices. Tech incentive zones and tax benefits.','mainVisa':'Employment Pass Tier 1','cost':'MYR 1,500 EP fee'},
        },
        'immigration': {
            'canada':      {'difficulty':'moderate','processingDays':'6–12 months','visaFee':1325,'special':'Express Entry: CRS 460+ typical. English native = high language score. CUSMA workers can switch to PR track. Americans among top nationalities in Express Entry draws.','mainVisa':'Express Entry / PNP','cost':'CAD 1,325–2,140 fees'},
            'germany':     {'difficulty':'easy','processingDays':'3–6 months','visaFee':120,'special':'Niederlassungserlaubnis after 4–5 years work. EU Blue Card holders eligible after 2 years. High STEM demand.','mainVisa':'Niederlassungserlaubnis','cost':'€120–500 permit fees'},
            'australia':   {'difficulty':'moderate','processingDays':'12–24 months','visaFee':4115,'special':'Points-based 189/190 Skilled Migration. Americans score high: English, education. State nomination (190) adds 5 points.','mainVisa':'Skilled Independent 189','cost':'AUD 4,195 visa fee'},
            'singapore':   {'difficulty':'hard','processingDays':'2–5 years','visaFee':100,'special':'PR application highly discretionary. Americans have good standing but must demonstrate strong economic ties and community integration.','mainVisa':'Singapore PR (discretionary)','cost':'Varies'},
            'uae':         {'difficulty':'easy','processingDays':'1–2 years','visaFee':2800,'special':'Golden Visa (10yr): salary AED 30K+/month, $545K property investment, or exceptional talent. No citizenship path.','mainVisa':'Golden Visa (10yr)','cost':'AED 2,800–10,000'},
            'uk':          {'difficulty':'moderate','processingDays':'5 years','visaFee':2389,'special':'ILR after 5yr on Skilled Worker. B1 English, Life in UK test. Americans among top 5 nationalities for UK settlement.','mainVisa':'Indefinite Leave to Remain (ILR)','cost':'£2,389+ ILR fee'},
            'japan':       {'difficulty':'hard','processingDays':'10 years (or 3 via HSP)','visaFee':80,'special':'Standard PR requires 10yr. HSP (Highly Skilled Professional) fast-track: PR after 3yr with 70+ points.','mainVisa':'Permanent Residency / HSP','cost':'¥8,000 application fee'},
            'portugal':    {'difficulty':'easy','processingDays':'5 years → PR','visaFee':320,'special':'D7/D8/D3 visa → 5yr residency → Permanent Residence. Golden Visa (€500K) accelerated. Portuguese B2 language required.','mainVisa':'Autorização de Residência Permanente','cost':'€320+ residence fee'},
            'thailand':    {'difficulty':'hard','processingDays':'No standard PR','visaFee':10000,'special':'No standard PR path. Thailand Elite Visa (THB 600,000) for 5–20yr stays. LTR Wealthy Pensioner requires $80K income.','mainVisa':'Thailand Elite / LTR Visa','cost':'THB 600,000 Elite / LTR'},
            'newzealand':  {'difficulty':'moderate','processingDays':'12–18 months','visaFee':2610,'special':'Skilled Migrant Category points-based. Americans typically strong candidates. 5yr residency → citizenship eligible.','mainVisa':'Skilled Migrant Resident Visa','cost':'NZD 3,310 visa fee'},
            'france':      {'difficulty':'moderate','processingDays':'5 years → Carte de Résident','visaFee':269,'special':'Carte de Résident after 5yr legal residency. Talent Passport holders may fast-track. French language B1 required.','mainVisa':'Carte de Résident','cost':'€269+ residence fees'},
            'netherlands': {'difficulty':'moderate','processingDays':'5 years → PR','visaFee':183,'special':'Permanent Residence after 5yr legal residency. Dutch A2 language required. Integration exam. Citizenship after 5yr PR.','mainVisa':'Permanent Residency (IND)','cost':'€183+ IND fee'},
            'italy':       {'difficulty':'moderate','processingDays':'5 years → EU PR','visaFee':10,'special':'EU Long-term Residence Permit after 5yr. Italian A2 language test. Income requirement.','mainVisa':'Permesso di soggiorno UE','cost':'€10.20+ permit fee'},
            'spain':       {'difficulty':'moderate','processingDays':'5 years → EU PR','visaFee':20,'special':'Long-term EU Residency after 5yr. Spanish A2 language test. Income proof required.','mainVisa':'Residencia de Larga Duración UE','cost':'€20+ residence card'},
            'malaysia':    {'difficulty':'hard','processingDays':'10+ years','visaFee':5000,'special':'PR is discretionary and extremely rare. MM2H (10yr renewable) practical long-term option: MYR 500K fixed deposit required.','mainVisa':'PR (discretionary) / MM2H','cost':'MYR 500K MM2H deposit'},
        },
        'travel': {
            'canada':      {'difficulty':'easy','processingDays':'Minutes (eTA)','visaFee':7,'special':'eTA only (no full visa). Up to 6 months per stay. NEXUS card for fast border crossing. Canada is the most visited country by Americans.','mainVisa':'eTA (CAD 7)','weeklyLiving':420,'flightMinUSD':250},
            'germany':     {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'US passport → Schengen visa-free 90/180 days. Germany entry = 26 Schengen countries. Berlin, Munich, Frankfurt, Rhine Valley all accessible.','mainVisa':'Visa-free (Schengen)','weeklyLiving':350,'flightMinUSD':500},
            'australia':   {'difficulty':'easy','processingDays':'24–48 hours','visaFee':0,'special':'eVisitor (subclass 651) is FREE for Americans. Online application, approved within 48hr. 12-month multiple entry, 3 months per stay.','mainVisa':'eVisitor 651 (Free)','weeklyLiving':400,'flightMinUSD':1200},
            'singapore':   {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'US passport → 30-day visa-free entry. Strong US-Singapore diplomatic ties. Changi Airport is world-class transit hub.','mainVisa':'Visa-free 30 days','weeklyLiving':280,'flightMinUSD':900},
            'uae':         {'difficulty':'easy','processingDays':'On arrival','visaFee':0,'special':'Americans receive 90-day visa on arrival at UAE airports. Renewable once. Dubai and Abu Dhabi popular with American tourists.','mainVisa':'Visa on arrival (90 days)','weeklyLiving':350,'flightMinUSD':800},
            'uk':          {'difficulty':'easy','processingDays':'24 hours (ETA)','visaFee':10,'special':'UK ETA required for Americans (introduced 2024). £10 fee. Up to 6 months per visit. London is the #1 destination for US travelers to Europe.','mainVisa':'UK ETA (£10)','weeklyLiving':500,'flightMinUSD':450},
            'japan':       {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'US passport → 90-day visa-free entry. Multiple entry allowed. Japan is a top destination for American tourists.','mainVisa':'Visa-free 90 days','weeklyLiving':250,'flightMinUSD':800},
            'portugal':    {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'US passport → Schengen visa-free 90/180 days. Lisbon and Porto among fastest-growing American expat destinations.','mainVisa':'Visa-free (Schengen)','weeklyLiving':220,'flightMinUSD':500},
            'thailand':    {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'Americans get 60-day visa-free entry (extended 2024). Extendable 30 days at local immigration. Bangkok, Phuket, Chiang Mai all popular.','mainVisa':'Visa-free 60 days','weeklyLiving':150,'flightMinUSD':900},
            'newzealand':  {'difficulty':'easy','processingDays':'Minutes (NZeTA)','visaFee':23,'special':'NZeTA online in minutes. 90-day entry per visit. IVL tourism levy NZD 35. New Zealand is a top adventure travel destination for Americans.','mainVisa':'NZeTA (NZD 23)','weeklyLiving':300,'flightMinUSD':1200},
            'france':      {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'US passport → Schengen visa-free 90/180 days. France is the world\'s most visited country. Paris, French Riviera, Loire Valley all accessible.','mainVisa':'Visa-free (Schengen)','weeklyLiving':300,'flightMinUSD':450},
            'netherlands': {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'Schengen visa-free. Amsterdam, The Hague, Rotterdam popular with Americans. Tulip season and world-class museums draw millions annually.','mainVisa':'Visa-free (Schengen)','weeklyLiving':320,'flightMinUSD':450},
            'italy':       {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'Schengen visa-free. Italy among top 5 destinations for American tourists. Rome, Venice, Amalfi, Tuscany. Direct flights from major US cities.','mainVisa':'Visa-free (Schengen)','weeklyLiving':250,'flightMinUSD':450},
            'spain':       {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'Schengen visa-free. Barcelona, Madrid, Seville, Ibiza all accessible. Americans love Spain for food, culture, and architecture.','mainVisa':'Visa-free (Schengen)','weeklyLiving':220,'flightMinUSD':450},
            'malaysia':    {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'Americans get 90-day visa-free entry to Malaysia. One of Asia\'s most accessible and affordable destinations.','mainVisa':'Visa-free 90 days','weeklyLiving':100,'flightMinUSD':900},
        },
    },
    'france': {
        'study': {
            'canada':      {'difficulty':'easy','processingDays':'8–12 weeks','visaFee':150,'special':'Study Permit straightforward for French nationals. Quebec French-language stream gives competitive advantage. PGWP 3yr post-study work.','mainVisa':'Study Permit','cost':'CAD 28K–40K/yr'},
            'germany':     {'difficulty':'easy','processingDays':'No visa — EU freedom of movement','visaFee':0,'special':'EU citizen — no visa needed. Study immediately under EU Freedom of Movement. Register at Einwohnermeldeamt within 2 weeks.','mainVisa':'EU Freedom of Movement','cost':'€500–1,200/yr (EU rate)'},
            'australia':   {'difficulty':'easy','processingDays':'14–21 days','visaFee':710,'special':'Student visa 500. French nationals eligible for Working Holiday (417). 2yr Graduate visa post-study available.','mainVisa':'Student Visa 500','cost':'AUD 30K–45K/yr'},
            'singapore':   {'difficulty':'easy','processingDays':'14–28 days','visaFee':30,'special':'NUS and NTU well-known in France. INSEAD Singapore campus popular for MBA. Strong English instruction.','mainVisa':'Student Pass (ICA)','cost':'SGD 20K–30K/yr'},
            'uae':         {'difficulty':'easy','processingDays':'7 days','visaFee':270,'special':'Student visa via university enrollment. MBZUAI has French research partnerships. No income tax. Popular for French engineering graduates.','mainVisa':'University Student Visa','cost':'AED 50K–80K/yr'},
            'uk':          {'difficulty':'moderate','processingDays':'3 weeks','visaFee':490,'special':'Post-Brexit: French nationals now need UK Student visa. IHS fee £776/yr. 2yr Graduate visa after. Oxford, Imperial, LSE popular.','mainVisa':'UK Student Visa','cost':'£20K–35K/yr'},
            'japan':       {'difficulty':'moderate','processingDays':'3–5 days (after CoE: 3 months)','visaFee':30,'special':'CoE from school takes 3 months. French-Japanese cultural ties strong. PVT Working Holiday also available.','mainVisa':'College Student Visa (CoE)','cost':'¥1.2M–2M/yr'},
            'portugal':    {'difficulty':'easy','processingDays':'No visa — EU freedom of movement','visaFee':0,'special':'EU citizen — no visa needed. Full EU tuition rates at Portuguese public universities. Lisbon and Porto very popular with French expats.','mainVisa':'EU Freedom of Movement','cost':'€500–1,200/yr (EU rate)'},
            'usa':         {'difficulty':'moderate','processingDays':'30–60 days','visaFee':510,'special':'F-1 visa + SEVIS fee. Campus interview at US Embassy Paris. OPT 1yr + STEM OPT 2yr. French students at MIT, Columbia, NYU.','mainVisa':'F-1 Student Visa','cost':'$40K–60K/yr'},
            'thailand':    {'difficulty':'easy','processingDays':'7 days','visaFee':40,'special':'ED visa. Many French schools partner with Thai institutions. Low cost of living. French expat community in Bangkok and Chiang Mai.','mainVisa':'Non-ED Visa','cost':'฿120K–200K/yr'},
            'newzealand':  {'difficulty':'easy','processingDays':'14 days','visaFee':330,'special':'Student visa easy for French nationals. PVT Working Holiday available. Post-study work visa 3yr. Auckland popular with French students.','mainVisa':'Student Visa','cost':'NZD 25K–40K/yr'},
            'netherlands': {'difficulty':'easy','processingDays':'No visa — EU freedom of movement','visaFee':0,'special':'EU citizen — no visa needed. Public university EU rates. Orientation year after graduation. TU Delft and Leiden popular.','mainVisa':'EU Freedom of Movement','cost':'€2K–4K/yr (EU rate)'},
            'italy':       {'difficulty':'easy','processingDays':'No visa — EU freedom of movement','visaFee':0,'special':'EU citizen — no visa needed. Milan Polytechnic, Bologna, Sapienza popular for French Erasmus and long-term students.','mainVisa':'EU Freedom of Movement','cost':'€900–3K/yr (EU rate)'},
            'spain':       {'difficulty':'easy','processingDays':'No visa — EU freedom of movement','visaFee':0,'special':'EU citizen — no visa needed. Spanish public universities charge EU rates. Barcelona and Madrid popular. Erasmus widely used.','mainVisa':'EU Freedom of Movement','cost':'€800–2K/yr (EU rate)'},
            'malaysia':    {'difficulty':'easy','processingDays':'7–14 days','visaFee':110,'special':'Student Pass via EMGS. Some French schools operate campuses in KL. English-medium instruction. Affordable vs. Western options.','mainVisa':'Student Pass (EMGS)','cost':'MYR 25K–45K/yr'},
        },
        'work': {
            'canada':      {'difficulty':'easy','processingDays':'2 weeks (IEC) / 6–12 months (Express Entry)','visaFee':1050,'special':'IEC Working Holiday for French under 35. Francophone bonus points in Express Entry. Quebec Skilled Worker fast-track.','mainVisa':'IEC Working Holiday / Express Entry','cost':'CAD 1,050 permit fee'},
            'germany':     {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — work anywhere in Germany immediately. No work permit needed. Strong demand for French speakers in auto and aerospace.','mainVisa':'EU Freedom of Movement','cost':'EU Freedom of Movement'},
            'australia':   {'difficulty':'easy','processingDays':'14–28 days','visaFee':635,'special':'Working Holiday (417) for French under 35. Can extend to 3 years. TSS 482 for employer-sponsored longer term.','mainVisa':'Working Holiday 417 / TSS 482','cost':'AUD 635 WHV fee'},
            'singapore':   {'difficulty':'moderate','processingDays':'3–8 weeks','visaFee':105,'special':'Employment Pass requires SGD 5,000+/month. French MNCs (TotalEnergies, AXA, L\'Oréal) sponsor employees to Singapore.','mainVisa':'Employment Pass (EP)','cost':'SGD 105 EP fee'},
            'uae':         {'difficulty':'easy','processingDays':'2–4 weeks','visaFee':500,'special':'French professionals recruited in engineering, finance, luxury, and education. French community ~60,000 in UAE. Golden Visa for high earners.','mainVisa':'Employment Visa / Golden Visa','cost':'AED 500–2,000 fees'},
            'uk':          {'difficulty':'moderate','processingDays':'3–8 weeks','visaFee':239,'special':'Post-Brexit: French nationals need Skilled Worker visa for UK work. Certificate of Sponsorship required. YMS available for French under 30.','mainVisa':'Skilled Worker / Youth Mobility','cost':'£239 visa fee'},
            'japan':       {'difficulty':'moderate','processingDays':'1–3 months','visaFee':20,'special':'Engineer/Specialist or Cultural Activities visa. PVT Working Holiday for French under 30. HSP route for highly skilled.','mainVisa':'Engineer Visa / PVT Working Holiday','cost':'¥3,000 visa fee'},
            'portugal':    {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — work anywhere in Portugal immediately. Large and growing French expat community in Lisbon and Algarve.','mainVisa':'EU Freedom of Movement','cost':'EU Freedom of Movement'},
            'usa':         {'difficulty':'hard','processingDays':'6–9 months','visaFee':1710,'special':'H-1B cap lottery (85,000 spots). Employer must sponsor. L-1 intracompany transfer easier. E-3 visa not available for French.','mainVisa':'H-1B / L-1','cost':'H-1B: $1,710+ fees'},
            'thailand':    {'difficulty':'moderate','processingDays':'3–4 weeks','visaFee':80,'special':'Non-B + work permit required. French companies (Michelin, Airbus Thailand) sponsor employees. Active French community in Bangkok.','mainVisa':'Non-B + Work Permit','cost':'฿2,000 Non-B + permit'},
            'newzealand':  {'difficulty':'easy','processingDays':'14–28 days','visaFee':470,'special':'Working Holiday (PVT) allows 23 months work+travel. AEWV for accredited employer roles. French professionals in-demand.','mainVisa':'PVT Working Holiday / AEWV','cost':'NZD 700 AEWV fee'},
            'netherlands': {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — work in Netherlands immediately. ASML, Booking, Shell hire many French speakers. 30% tax ruling available.','mainVisa':'EU Freedom of Movement','cost':'EU Freedom of Movement'},
            'italy':       {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — work in Italy immediately. Milan luxury fashion and design sector hires many French professionals.','mainVisa':'EU Freedom of Movement','cost':'EU Freedom of Movement'},
            'spain':       {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — work in Spain immediately. NIE number required for tax/admin. Barcelona tech and Madrid finance draw French workers.','mainVisa':'EU Freedom of Movement','cost':'EU Freedom of Movement'},
            'malaysia':    {'difficulty':'moderate','processingDays':'2–4 weeks','visaFee':330,'special':'Employment Pass Tier 1 for salary RM 10,000+. French companies (Airbus, Schneider) recruit locally.','mainVisa':'Employment Pass Tier 1','cost':'MYR 1,500 EP fee'},
        },
        'immigration': {
            'canada':      {'difficulty':'moderate','processingDays':'6–12 months','visaFee':1325,'special':'Express Entry: French speakers receive Francophone bonus — up to 50 extra CRS points. Quebec PNP stream very fast for French speakers.','mainVisa':'Express Entry / Quebec PNP','cost':'CAD 1,325–2,140 fees'},
            'germany':     {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — permanent right of residence after 5yr. No formal PR application needed — just register.','mainVisa':'EU Permanent Residence Right','cost':'EU right — no fees'},
            'australia':   {'difficulty':'moderate','processingDays':'12–24 months','visaFee':4115,'special':'189/190 skilled migration points-based. French nationals score well: English, education, experience.','mainVisa':'Skilled Independent 189','cost':'AUD 4,195 visa fee'},
            'singapore':   {'difficulty':'hard','processingDays':'2–5 years','visaFee':100,'special':'PR highly discretionary. French nationals with strong employment history and community ties have reasonable chances.','mainVisa':'Singapore PR (discretionary)','cost':'Varies'},
            'uae':         {'difficulty':'easy','processingDays':'1–2 years','visaFee':2800,'special':'Golden Visa (10yr) for salary AED 30K+/month or investment. France among top source countries for UAE Golden Visa holders.','mainVisa':'Golden Visa (10yr)','cost':'AED 2,800–10,000'},
            'uk':          {'difficulty':'moderate','processingDays':'5 years','visaFee':2389,'special':'ILR after 5yr Skilled Worker. B1 English, Life in UK test. French community ~150,000 in London area.','mainVisa':'Indefinite Leave to Remain (ILR)','cost':'£2,389+ ILR fee'},
            'japan':       {'difficulty':'hard','processingDays':'10 years (or 3 via HSP)','visaFee':80,'special':'Standard PR 10yr. HSP fast-track 3yr with 70+ points. French-Japanese cultural ties (Alliance Française) help.','mainVisa':'Permanent Residency / HSP','cost':'¥8,000 application fee'},
            'portugal':    {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — automatic permanent residence right after 5yr. No formal PR needed. Portugal most popular EU destination for French emigrants.','mainVisa':'EU Permanent Residence Right','cost':'EU right — minimal fees'},
            'usa':         {'difficulty':'hard','processingDays':'3–10+ years','visaFee':325,'special':'Green Card via employer EB-1/EB-2/EB-3 or Diversity Visa Lottery (French eligible). Investment EB-5 ($800K) faster.','mainVisa':'Green Card (EB / DV Lottery)','cost':'DV Lottery or EB petition'},
            'thailand':    {'difficulty':'hard','processingDays':'No standard PR','visaFee':10000,'special':'No standard PR. Thailand Elite Visa (THB 600,000) for long stays. LTR Wealthy Pensioner requires $80K income.','mainVisa':'Thailand Elite / LTR Visa','cost':'THB 600,000 Elite / LTR'},
            'newzealand':  {'difficulty':'moderate','processingDays':'12–18 months','visaFee':2610,'special':'Skilled Migrant points-based. French professionals strong candidates. 5yr residency → citizenship.','mainVisa':'Skilled Migrant Resident Visa','cost':'NZD 3,310 visa fee'},
            'netherlands': {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — automatic permanent right after 5yr. Amsterdam and Rotterdam attract French professionals in tech and finance.','mainVisa':'EU Permanent Residence Right','cost':'EU right — minimal fees'},
            'italy':       {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — automatic permanent right after 5yr. Milan, Turin, Rome all have French communities.','mainVisa':'EU Permanent Residence Right','cost':'EU right — minimal fees'},
            'spain':       {'difficulty':'easy','processingDays':'No wait — EU right','visaFee':0,'special':'EU citizen — automatic permanent right after 5yr. Barcelona and Madrid have the largest French communities in Spain.','mainVisa':'EU Permanent Residence Right','cost':'EU right — minimal fees'},
            'malaysia':    {'difficulty':'hard','processingDays':'10+ years','visaFee':5000,'special':'PR is discretionary and rare. MM2H (10yr renewable) practical option: MYR 500K fixed deposit. French community ~3,000 in Malaysia.','mainVisa':'PR (discretionary) / MM2H','cost':'MYR 500K MM2H deposit'},
        },
        'travel': {
            'canada':      {'difficulty':'easy','processingDays':'Minutes (eTA)','visaFee':7,'special':'French passport → eTA only. Up to 6 months. Quebec very popular with French tourists for cultural and linguistic connection.','mainVisa':'eTA (CAD 7)','weeklyLiving':420,'flightMinUSD':650},
            'germany':     {'difficulty':'easy','processingDays':'No visa — EU FoM','visaFee':0,'special':'EU citizen — no restrictions. Drive, train (TGV), or fly. Berlin, Munich, Hamburg all accessible without any limit.','mainVisa':'EU Freedom of Movement','weeklyLiving':350,'flightMinUSD':50},
            'australia':   {'difficulty':'easy','processingDays':'Instant (ETA)','visaFee':20,'special':'French passport → ETA (subclass 601). Instant approval. 12-month multiple entry. Barrier Reef and Melbourne popular.','mainVisa':'ETA (AUD 20)','weeklyLiving':400,'flightMinUSD':900},
            'singapore':   {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'French passport → 30-day visa-free. Singapore is key transit hub for French travelers heading to Southeast Asia.','mainVisa':'Visa-free 30 days','weeklyLiving':280,'flightMinUSD':700},
            'uae':         {'difficulty':'easy','processingDays':'On arrival','visaFee':0,'special':'French passport → 90-day visa on arrival. Dubai popular luxury destination for French tourists. Direct Air France flights daily.','mainVisa':'Visa on arrival (90 days)','weeklyLiving':350,'flightMinUSD':250},
            'uk':          {'difficulty':'easy','processingDays':'24 hours (ETA)','visaFee':10,'special':'UK ETA required for French (post-Brexit, 2024). £10, valid 2yr. Up to 6 months per visit. London top destination for French. Eurostar 2hr 15min.','mainVisa':'UK ETA (£10)','weeklyLiving':500,'flightMinUSD':50},
            'japan':       {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'French passport → 90-day visa-free. Japan very popular with French tourists (Japonisme cultural affinity). Direct Air France Paris-Tokyo.','mainVisa':'Visa-free 90 days','weeklyLiving':250,'flightMinUSD':600},
            'portugal':    {'difficulty':'easy','processingDays':'No visa — EU FoM','visaFee':0,'special':'EU citizen — drive or fly, no limit. Lisbon 2hr from Paris by plane. Porto, Algarve, Madeira. Portugal top destination for French tourists.','mainVisa':'EU Freedom of Movement','weeklyLiving':220,'flightMinUSD':80},
            'usa':         {'difficulty':'easy','processingDays':'Minutes (ESTA)','visaFee':21,'special':'ESTA Visa Waiver: 90-day visa-free entry. New York, Los Angeles, Miami, Chicago. Direct Air France and Delta flights.','mainVisa':'ESTA ($21)','weeklyLiving':350,'flightMinUSD':350},
            'thailand':    {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'French passport → 60-day visa-free. Extendable 30 days. Thailand popular with French backpackers and retirees.','mainVisa':'Visa-free 60 days','weeklyLiving':150,'flightMinUSD':600},
            'newzealand':  {'difficulty':'easy','processingDays':'Minutes (NZeTA)','visaFee':23,'special':'French passport → NZeTA in minutes. 90-day entry. Hobbiton, Milford Sound, Queenstown. PVT Working Holiday very popular.','mainVisa':'NZeTA (NZD 23)','weeklyLiving':300,'flightMinUSD':1200},
            'netherlands': {'difficulty':'easy','processingDays':'No visa — EU FoM','visaFee':0,'special':'EU citizen — 1hr flight or 3hr train from Paris. Amsterdam, Rotterdam, The Hague. No 90-day limit for EU citizens.','mainVisa':'EU Freedom of Movement','weeklyLiving':320,'flightMinUSD':50},
            'italy':       {'difficulty':'easy','processingDays':'No visa — EU FoM','visaFee':0,'special':'EU citizen — drive through Alps or fly. Rome 2hr from Paris. No restrictions. Italy is the #1 EU destination for French tourists.','mainVisa':'EU Freedom of Movement','weeklyLiving':250,'flightMinUSD':80},
            'spain':       {'difficulty':'easy','processingDays':'No visa — EU FoM','visaFee':0,'special':'EU citizen — drive through Pyrenees or fly. Barcelona 6hr train from Paris. No restrictions. Spain largest foreign destination for French tourists.','mainVisa':'EU Freedom of Movement','weeklyLiving':220,'flightMinUSD':80},
            'malaysia':    {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'French passport → 90-day visa-free. KL, Penang, Langkawi, Borneo. Air France via hub. Affordable and diverse destination.','mainVisa':'Visa-free 90 days','weeklyLiving':100,'flightMinUSD':650},
        },
    },
    'tunisia': {
        'study': {
            'canada':      {'difficulty':'moderate','processingDays':'8–16 weeks','visaFee':150,'special':'Canadian Study Permit requires proof of funds, IELTS/TEF, acceptance letter. French-language Quebec programs have easier path.','mainVisa':'Study Permit','cost':'CAD 28K–40K/yr'},
            'germany':     {'difficulty':'moderate','processingDays':'120–180 days','visaFee':75,'special':'Studienkolleg preparatory course may be required. DAAD scholarships available. Blocked account €11,904. Apply early — appointment bottleneck.','mainVisa':'National Visa (Studium)','cost':'€8K–12K/yr'},
            'australia':   {'difficulty':'hard','processingDays':'30–60 days','visaFee':710,'special':'GTE (Genuine Temporary Entrant) statement critical. Strong ties-to-Tunisia evidence required. Must demonstrate compelling reason to return.','mainVisa':'Student Visa 500','cost':'AUD 30K–45K/yr'},
            'singapore':   {'difficulty':'hard','processingDays':'14–28 days','visaFee':30,'special':'Student Pass via ICA. Tunisian applicants face closer scrutiny. Strong financial evidence and clear academic track required.','mainVisa':'Student Pass (ICA)','cost':'SGD 20K–30K/yr'},
            'uae':         {'difficulty':'easy','processingDays':'7 days','visaFee':270,'special':'UAE has large Tunisian community. MBZUAI and AUS welcome North African students. Student visa via enrollment. Arabic shared advantage.','mainVisa':'University Student Visa','cost':'AED 50K–80K/yr'},
            'uk':          {'difficulty':'hard','processingDays':'3–8 weeks','visaFee':490,'special':'UK Student visa. Higher scrutiny for some North African passports. Strong bank statements (3–6 months), IELTS 5.5+, non-immigrant intent required.','mainVisa':'UK Student Visa','cost':'£20K–35K/yr'},
            'japan':       {'difficulty':'hard','processingDays':'3–5 days (after CoE: 3 months)','visaFee':30,'special':'Rare pathway for Tunisian students. CoE from school takes 3 months. JLPT N4+ or English required. High documentation burden.','mainVisa':'College Student Visa (CoE)','cost':'¥1.2M–2M/yr'},
            'portugal':    {'difficulty':'moderate','processingDays':'30–60 days','visaFee':90,'special':'D4 student visa. Portugal has more accommodating processes for North African students. French language advantage. Public universities affordable.','mainVisa':'D4 Student Visa','cost':'€7K–12K/yr'},
            'usa':         {'difficulty':'hard','processingDays':'2–6 months','visaFee':510,'special':'F-1 visa requires US Embassy interview in Tunis. Must prove non-immigrant intent strongly. TOEFL/IELTS required. Apply 6+ months in advance.','mainVisa':'F-1 Student Visa','cost':'$40K–60K/yr'},
            'thailand':    {'difficulty':'easy','processingDays':'7–14 days','visaFee':40,'special':'Thai ED visa relatively easy for Tunisians. Low scrutiny. Low cost of living. English-taught programs at MUIC and Mahidol.','mainVisa':'Non-ED Visa','cost':'฿120K–200K/yr'},
            'newzealand':  {'difficulty':'moderate','processingDays':'20–35 days','visaFee':330,'special':'Student visa possible for Tunisians. Financial evidence and IELTS required. Clear academic purpose and return ties strengthen application.','mainVisa':'Student Visa','cost':'NZD 25K–40K/yr'},
            'france':      {'difficulty':'moderate','processingDays':'15–30 days','visaFee':99,'special':'Very large Tunisian student community in France. Campus France procedure mandatory. French language major advantage. Documents must be apostilled.','mainVisa':'VLS-TS Étudiant','cost':'€8K–15K/yr'},
            'netherlands': {'difficulty':'hard','processingDays':'30–60 days','visaFee':207,'special':'IND strict for Tunisian applicants. Full financial evidence package mandatory. Must apply from Tunisia. University acceptance letter and insurance required.','mainVisa':'MVV + Residence Permit','cost':'€12K–20K/yr'},
            'italy':       {'difficulty':'moderate','processingDays':'15–30 days','visaFee':116,'special':'Strong historical Tunisian community in Italy (Sicily, Turin). Italian consulate in Tunis familiar with North African applicants. Public universities affordable.','mainVisa':'Type D Student Visa','cost':'€5K–15K/yr'},
            'spain':       {'difficulty':'moderate','processingDays':'15–30 days','visaFee':80,'special':'National D student visa. Spanish consulate in Tunis processes applications. Public universities from €800/yr. Growing Tunisian community.','mainVisa':'National D Student Visa','cost':'€8K–14K/yr'},
            'malaysia':    {'difficulty':'easy','processingDays':'7–14 days','visaFee':110,'special':'EMGS system. Tunisian students welcomed as OIC member. Low cost. English-medium instruction at private universities. Halal environment familiar.','mainVisa':'Student Pass (EMGS)','cost':'MYR 25K–45K/yr'},
        },
        'work': {
            'canada':      {'difficulty':'hard','processingDays':'2–6 months','visaFee':1050,'special':'LMIA-backed work permit required. Francophone Tunisians can apply via Quebec MOI or Francophone Mobility. Express Entry CRS 460+ competitive.','mainVisa':'LMIA Work Permit / Express Entry','cost':'CAD 1,050 fees'},
            'germany':     {'difficulty':'moderate','processingDays':'30–60 days','visaFee':120,'special':'Germany-Tunisia Skilled Worker Agreement (2022) creates facilitated pathway. Chancenkarte allows job-seeking. EU Blue Card needs €45K+ salary.','mainVisa':'EU Blue Card / Chancenkarte','cost':'€120–450 fees'},
            'australia':   {'difficulty':'hard','processingDays':'2–4 months','visaFee':3115,'special':'TSS (482) employer sponsor required. Skills assessment by relevant body. Immigration background check thorough. IELTS 6.0+ required.','mainVisa':'TSS 482 / Skilled 189','cost':'AUD 4,640 TSS fee'},
            'singapore':   {'difficulty':'hard','processingDays':'3–8 weeks','visaFee':105,'special':'Employment Pass requires SGD 5,000+/month. Competitive — STEM and finance professionals with top qualifications succeed.','mainVisa':'Employment Pass (EP)','cost':'SGD 105 EP fee'},
            'uae':         {'difficulty':'easy','processingDays':'2–4 weeks','visaFee':500,'special':'UAE has large Tunisian expatriate workforce. Employer-sponsored visa. Dubai and Abu Dhabi popular. Tax-free income major draw.','mainVisa':'Employment Visa / Golden Visa','cost':'AED 500–2,000 fees'},
            'uk':          {'difficulty':'hard','processingDays':'3–8 weeks','visaFee':239,'special':'Skilled Worker visa needs UK licensed sponsor + CoS + English language. Salary threshold £38,700+. Background check thorough.','mainVisa':'Skilled Worker Visa','cost':'£239 Skilled Worker fee'},
            'japan':       {'difficulty':'hard','processingDays':'1–3 months','visaFee':20,'special':'Very rare pathway for Tunisian workers. Engineer/Specialist visa requires university degree in relevant field. Japanese or English needed.','mainVisa':'Engineer / Specialist Visa','cost':'¥3,000 visa fee'},
            'portugal':    {'difficulty':'moderate','processingDays':'30–60 days','visaFee':83,'special':'D3 Highly Qualified or D7 Passive Income. Portugal has bilateral agreement facilitating North African worker mobility. Francophone advantage.','mainVisa':'D3 / D8 Visa','cost':'€83–440 visa fee'},
            'usa':         {'difficulty':'hard','processingDays':'6–9 months','visaFee':1710,'special':'H-1B annual cap lottery (85,000 spots). Employer must sponsor. No E-3 for Tunisians. L-1 intracompany transfer possible for MNC employees.','mainVisa':'H-1B / L-1','cost':'H-1B: $1,710+ fees'},
            'thailand':    {'difficulty':'moderate','processingDays':'3–4 weeks','visaFee':80,'special':'Non-Immigrant B visa + Work Permit. BOI-registered companies help with sponsorship. LTR Visa for qualifying professionals.','mainVisa':'Non-B + Work Permit','cost':'฿2,000 Non-B + permit'},
            'newzealand':  {'difficulty':'hard','processingDays':'4–8 weeks','visaFee':470,'special':'AEWV requires employer accreditation. Immigration health and character standards checked. IELTS 6.5+ typically required.','mainVisa':'AEWV','cost':'NZD 700 AEWV fee'},
            'france':      {'difficulty':'easy','processingDays':'1–3 months','visaFee':99,'special':'France-Tunisia bilateral labor agreement (one of oldest in Europe). Tech, healthcare, construction actively recruit. Largest Tunisian diaspora in Europe.','mainVisa':'Carte de séjour salarié','cost':'€99–265 permit fees'},
            'netherlands': {'difficulty':'hard','processingDays':'30–60 days','visaFee':207,'special':'Highly Skilled Migrant threshold €5,670+/month. IND-recognized sponsor required. Achievable for qualified engineers and IT professionals.','mainVisa':'Highly Skilled Migrant (HSM)','cost':'€207 HSM permit'},
            'italy':       {'difficulty':'moderate','processingDays':'1–3 months','visaFee':116,'special':'Italy has historic Decreto Flussi quota specifically including Tunisia. One of easier EU routes for Tunisians. Seasonal and permanent quotas.','mainVisa':'Decreto Flussi / EU Blue Card','cost':'€116 visa fee'},
            'spain':       {'difficulty':'moderate','processingDays':'1–3 months','visaFee':80,'special':'Spain-Tunisia bilateral agreement for seasonal workers. Digital Nomad Visa for remote income €2,300+/month. Growing Tunisian community in Valencia.','mainVisa':'Seasonal Quota / Digital Nomad','cost':'€80–200 visa fee'},
            'malaysia':    {'difficulty':'easy','processingDays':'2–4 weeks','visaFee':330,'special':'Employment Pass feasible for Tunisian STEM professionals. OIC solidarity. English working environment in MNCs. Halal environment familiar.','mainVisa':'Employment Pass Tier 1','cost':'MYR 1,500 EP fee'},
        },
        'immigration': {
            'canada':      {'difficulty':'moderate','processingDays':'6–18 months','visaFee':1325,'special':'Express Entry: French-speaking Tunisians receive Francophone priority — up to 50 bonus CRS points. Quebec PNP fast-track for French speakers.','mainVisa':'Express Entry / Quebec PNP','cost':'CAD 1,325–2,140 fees'},
            'germany':     {'difficulty':'moderate','processingDays':'3–5 years','visaFee':120,'special':'Niederlassungserlaubnis after 3–5yr legal work. Germany-Tunisia bilateral agreement helps. B1 German language required.','mainVisa':'Niederlassungserlaubnis','cost':'€120–500 permit fees'},
            'australia':   {'difficulty':'hard','processingDays':'2–4 years','visaFee':4115,'special':'Skills assessment mandatory. IELTS 7.0+ strongly advised. Points test competitive. Credential recognition may require additional steps.','mainVisa':'Skilled Independent 189','cost':'AUD 4,195 visa fee'},
            'singapore':   {'difficulty':'hard','processingDays':'3–6 years','visaFee':100,'special':'PR highly selective and discretionary. Extended work history and community integration key. Very rare for Tunisian nationals.','mainVisa':'Singapore PR (discretionary)','cost':'Varies'},
            'uae':         {'difficulty':'moderate','processingDays':'1–2 years','visaFee':2800,'special':'Golden Visa (10yr) for professionals earning AED 30K+/month, investors, or exceptional talent. Large Tunisian diaspora facilitates path.','mainVisa':'Golden Visa (10yr)','cost':'AED 2,800–10,000'},
            'uk':          {'difficulty':'hard','processingDays':'5+ years','visaFee':2389,'special':'ILR after 5yr continuous legal stay on Skilled Worker. B1 English, Life in UK test, criminal record check. Consistent employment record critical.','mainVisa':'Indefinite Leave to Remain (ILR)','cost':'£2,389+ ILR fee'},
            'japan':       {'difficulty':'hard','processingDays':'10 years (or 3 via HSP)','visaFee':80,'special':'Standard PR requires 10yr. HSP fast-track: 3yr with 70+ points. Japanese language required for naturalization. Very rare for Tunisian nationals.','mainVisa':'Permanent Residency / HSP','cost':'¥8,000 application fee'},
            'portugal':    {'difficulty':'moderate','processingDays':'5 years → PR','visaFee':320,'special':'D3/D7/D8 visa → 5yr legal residency → Permanent Residence. Portuguese B2 required. Portugal popular with Tunisian professionals as EU gateway.','mainVisa':'Autorização de Residência Permanente','cost':'€320+ residence fee'},
            'usa':         {'difficulty':'hard','processingDays':'3–15+ years','visaFee':325,'special':'Diversity Visa (DV) Lottery: Tunisia eligible most years. Employment-based EB Green Card via employer. Long queues for most EB categories.','mainVisa':'Green Card (EB / DV Lottery)','cost':'DV Lottery or EB petition'},
            'thailand':    {'difficulty':'hard','processingDays':'No standard PR','visaFee':10000,'special':'No standard PR path. Thailand Elite Visa (THB 600,000) for long-term stays. LTR requires $80K income or $250K savings.','mainVisa':'Thailand Elite / LTR Visa','cost':'THB 600,000 Elite / LTR'},
            'newzealand':  {'difficulty':'moderate','processingDays':'18–36 months','visaFee':2610,'special':'Points-based Skilled Migrant. Skills assessment for Tunisian qualifications required. IELTS 6.5+ typically needed. 5yr residency → citizenship.','mainVisa':'Skilled Migrant Resident Visa','cost':'NZD 3,310 visa fee'},
            'france':      {'difficulty':'easy','processingDays':'3–5 years → Carte de Résident','visaFee':269,'special':'Franco-Tunisian bilateral treaty (1988) one of most advantageous in Europe. ~640,000 Tunisian diaspora in France. After 3yr → Carte de Résident possible.','mainVisa':'Carte de Résident','cost':'€269+ residence fees'},
            'netherlands': {'difficulty':'hard','processingDays':'5 years → PR','visaFee':183,'special':'5yr continuous legal stay → PR. Dutch language A2 required. Integration contract (inburgering). Difficult process for non-EU applicants.','mainVisa':'Permanent Residency (IND)','cost':'€183+ IND fee'},
            'italy':       {'difficulty':'moderate','processingDays':'5 years → EU PR','visaFee':10,'special':'EU Long-term Residence after 5yr. Italian A2 language. Largest Tunisian community in EU outside France. Italy-Tunisia bilateral agreement facilitates path.','mainVisa':'Permesso di soggiorno UE','cost':'€10.20+ permit fee'},
            'spain':       {'difficulty':'moderate','processingDays':'5 years → EU PR','visaFee':20,'special':'Long-term EU Residency after 5yr. Spanish A2 language. Arraigo social path after 3yr with documented community ties. Growing Tunisian community.','mainVisa':'Residencia de Larga Duración UE','cost':'€20+ residence card'},
            'malaysia':    {'difficulty':'hard','processingDays':'10+ years','visaFee':5000,'special':'PR highly discretionary and very difficult. MM2H (10yr renewable): MYR 500K fixed deposit. OIC connection makes Malaysia culturally familiar.','mainVisa':'PR (discretionary) / MM2H','cost':'MYR 500K MM2H deposit'},
        },
        'travel': {
            'canada':      {'difficulty':'hard','processingDays':'2–8 weeks','visaFee':100,'special':'Tunisian passport requires Temporary Resident Visa. Apply online or via VAC in Tunis. Financial proof, accommodation, and ties to Tunisia required.','mainVisa':'Temporary Resident Visa (TRV)','weeklyLiving':420,'flightMinUSD':900},
            'germany':     {'difficulty':'hard','processingDays':'15–30 days','visaFee':80,'special':'Schengen visa required at German consulate in Tunis. Appointment wait 2–4 weeks. Financial proof, accommodation, travel insurance required.','mainVisa':'Schengen Visa','weeklyLiving':350,'flightMinUSD':200},
            'australia':   {'difficulty':'hard','processingDays':'2–4 weeks','visaFee':145,'special':'Australian visitor visa required for Tunisians. Apply online with financial evidence and ties to Tunisia. ETA not available for Tunisian passport.','mainVisa':'Visitor Visa 600','weeklyLiving':400,'flightMinUSD':1100},
            'singapore':   {'difficulty':'hard','processingDays':'5–10 days','visaFee':30,'special':'Visa required for Tunisian passport holders. Apply via Singapore embassy. Financial evidence required. 96hr IPATA transit without visa available.','mainVisa':'Singapore Visit Visa','weeklyLiving':280,'flightMinUSD':600},
            'uae':         {'difficulty':'easy','processingDays':'On arrival','visaFee':0,'special':'Tunisian passport → 30-day visa on arrival at UAE airports. One of easiest entries for Tunisian travelers. Dubai very popular destination.','mainVisa':'Visa on arrival (30 days)','weeklyLiving':350,'flightMinUSD':300},
            'uk':          {'difficulty':'hard','processingDays':'3–6 weeks','visaFee':115,'special':'UK Standard Visitor Visa required. Financial evidence, accommodation, return ticket, employment proof. Apply minimum 3–4 weeks before travel.','mainVisa':'UK Standard Visitor Visa','weeklyLiving':500,'flightMinUSD':300},
            'japan':       {'difficulty':'hard','processingDays':'3–5 days','visaFee':20,'special':'Japanese tourist visa required for Tunisian passport. Apply at Japanese Embassy Tunis. Financial evidence, itinerary, accommodation proof.','mainVisa':'Japanese Tourist Visa','weeklyLiving':250,'flightMinUSD':800},
            'portugal':    {'difficulty':'hard','processingDays':'15–30 days','visaFee':80,'special':'Schengen visa required. Can apply via French, Spanish, or Portuguese consulate. French consulate in Tunis has historically fast processing.','mainVisa':'Schengen Visa','weeklyLiving':220,'flightMinUSD':200},
            'usa':         {'difficulty':'hard','processingDays':'2–6 months','visaFee':185,'special':'B-2 visitor visa requires US Embassy interview in Tunis. Non-immigrant intent proof essential. Financial ties to Tunisia required. Apply 6 months ahead.','mainVisa':'B-2 Tourist Visa','weeklyLiving':350,'flightMinUSD':800},
            'thailand':    {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'Tunisian passport → 30-day visa-free entry to Thailand. Popular holiday destination. Phuket, Bangkok, Koh Samui accessible. Extendable 30 days locally.','mainVisa':'Visa-free 30 days','weeklyLiving':150,'flightMinUSD':500},
            'newzealand':  {'difficulty':'hard','processingDays':'2–4 weeks','visaFee':170,'special':'NZeTA not available for Tunisian passport. Standard visitor visa required. Financial evidence and ties to Tunisia needed.','mainVisa':'Visitor Visa','weeklyLiving':300,'flightMinUSD':1200},
            'france':      {'difficulty':'moderate','processingDays':'15–30 days','visaFee':80,'special':'Schengen visa via French consulate in Tunis — one of world\'s busiest. Large applicant volume can cause delays. Bilateral ties facilitate processing.','mainVisa':'Schengen Visa (French Consulate)','weeklyLiving':300,'flightMinUSD':150},
            'netherlands': {'difficulty':'hard','processingDays':'15–30 days','visaFee':80,'special':'Schengen visa required. Can apply at Dutch, French, or German consulate. Financial proof, hotel bookings, and travel insurance required.','mainVisa':'Schengen Visa','weeklyLiving':320,'flightMinUSD':200},
            'italy':       {'difficulty':'hard','processingDays':'15–30 days','visaFee':80,'special':'Schengen visa via Italian consulate in Tunis. Italy-Tunisia proximity (shortest Mediterranean crossing). Historical Tunisian community in Italy.','mainVisa':'Schengen Visa (Italian Consulate)','weeklyLiving':250,'flightMinUSD':100},
            'spain':       {'difficulty':'hard','processingDays':'15–30 days','visaFee':80,'special':'Schengen visa via Spanish consulate in Tunis. Spain-Tunisia bilateral goodwill. Some historically faster processing than northern EU consulates.','mainVisa':'Schengen Visa','weeklyLiving':220,'flightMinUSD':150},
            'malaysia':    {'difficulty':'easy','processingDays':'Visa-free','visaFee':0,'special':'Tunisian passport → 30-day visa-free entry to Malaysia. OIC solidarity. KL popular for Tunisian travelers. Halal food widely available. Very affordable.','mainVisa':'Visa-free 30 days','weeklyLiving':80,'flightMinUSD':500},
        },
    },
}

# Official sources for each destination
OFFICIAL_SOURCES = {
    'canada':      [('Immigration, Refugees and Citizenship Canada', 'https://www.canada.ca/en/immigration-refugees-citizenship.html'), ('Express Entry', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html'), ('eTA Application', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html')],
    'germany':     [('Make it in Germany', 'https://www.make-it-in-germany.com/en'), ('DAAD Germany', 'https://www.daad.de/en'), ('German Embassy Visa', 'https://www.germany.info/us-en/service/visa')],
    'australia':   [('Home Affairs Australia', 'https://immi.homeaffairs.gov.au'), ('Study in Australia', 'https://www.studyinaustralia.gov.au'), ('Skilled Migration', 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupations-for-visas')],
    'singapore':   [('ICA Singapore', 'https://www.ica.gov.sg'), ('MOM Employment Pass', 'https://www.mom.gov.sg/passes-and-permits/employment-pass'), ('Study in Singapore', 'https://www.moe.gov.sg')],
    'uae':         [('UAE Visa Portal', 'https://u.ae/en/information-and-services/visa-and-emirates-id'), ('Golden Visa UAE', 'https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/golden-visa'), ('MBZUAI', 'https://mbzuai.ac.ae')],
    'uk':          [('UK Visas & Immigration', 'https://www.gov.uk/browse/visas-immigration'), ('Skilled Worker Visa', 'https://www.gov.uk/skilled-worker-visa'), ('Student Visa UK', 'https://www.gov.uk/student-visa')],
    'japan':       [('Immigration Services Agency Japan', 'https://www.moj.go.jp/isa/'), ('JASSO Scholarships', 'https://www.jasso.or.jp/en'), ('Japan Visa Info', 'https://www.mofa.go.jp/j_info/visit/visa/index.html')],
    'portugal':    [('AIMA Portugal', 'https://aima.gov.pt/en'), ('SEF Portal', 'https://www.sef.pt/en'), ('Study in Portugal', 'https://www.dges.gov.pt/en')],
    'usa':         [('USCIS', 'https://www.uscis.gov'), ('Study in the USA', 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html'), ('H-1B Program', 'https://www.dol.gov/agencies/eta/foreign-labor/programs/h-1b')],
    'thailand':    [('Thailand Immigration Bureau', 'https://www.immigration.go.th'), ('LTR Visa Thailand', 'https://ltr.boi.go.th'), ('Thailand Elite', 'https://www.thailand-elite.com')],
    'newzealand':  [('Immigration New Zealand', 'https://www.immigration.govt.nz'), ('NZeTA', 'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta'), ('Skilled Migrant NZ', 'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-category-resident-visa')],
    'france':      [('France-Visas', 'https://france-visas.gouv.fr/en'), ('Campus France', 'https://www.campusfrance.org/en'), ('Service-Public FR', 'https://www.service-public.fr/particuliers/vosdroits/N110')],
    'netherlands': [('IND Netherlands', 'https://ind.nl/en'), ('Nuffic Study NL', 'https://www.nuffic.nl/en'), ('Highly Skilled Migrant', 'https://ind.nl/en/work/working_in_the_Netherlands/Pages/Highly-skilled-migrant.aspx')],
    'italy':       [('Visti per l\'Italia', 'https://vistoperitalia.esteri.it/home/en'), ('Study in Italy', 'https://www.studiare-in-italia.it/studentistranieri/index_en.html'), ('Decreto Flussi', 'https://www.lavoro.gov.it/en')],
    'spain':       [('Spain Visa Portal', 'https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visas.aspx'), ('Study in Spain', 'https://www.educacion.gob.es/en'), ('Digital Nomad Visa', 'https://www.inclusion.gob.es/web/migraciones')],
    'malaysia':    [('Immigration Malaysia', 'https://www.imi.gov.my'), ('EMGS Malaysia', 'https://educationmalaysia.gov.my'), ('MM2H Program', 'https://mm2h.gov.my')],
}

DIFF_CHIP_CLASS = {'easy': 'easy', 'moderate': 'moderate', 'hard': 'hard'}
DIFF_LABEL = {'easy': 'Easy', 'moderate': 'Moderate', 'hard': 'Hard'}
PURPOSE_LABELS = {'work': 'Work', 'study': 'Study', 'immigration': 'Immigration', 'travel': 'Travel'}
PURPOSE_ICONS = {'work': '💼', 'study': '🎓', 'immigration': '🏠', 'travel': '✈️'}

# ── Get all same-origin guides for the related section ───────────────────────
SAME_ORIGIN_ARTICLES = {fc: [(tc, TO_INFO[tc]) for tc in TO_INFO if tc != fc] for fc in FROM_INFO}


def related_links(from_c, to_c, max_links=8):
    fi = FROM_INFO[from_c]
    links = []
    others = [t for t in TO_INFO if t != to_c and t != from_c]
    for tc in others[:max_links]:
        ti = TO_INFO[tc]
        links.append(f'<a href="{from_c}-to-{tc}-2026.html" class="rel-link">{fi["flag"]} → {ti["flag"]} {ti["name"]}</a>')
    return '\n      '.join(links)


def section_html(from_c, to_c, purpose):
    fi = FROM_INFO[from_c]
    ti = TO_INFO[to_c]
    d = DATA[from_c][purpose].get(to_c, {})
    if not d:
        return ''

    diff = d.get('difficulty', 'moderate')
    diff_class = DIFF_CHIP_CLASS.get(diff, 'moderate')
    diff_label = DIFF_LABEL.get(diff, 'Moderate')
    processing = d.get('processingDays', 'Varies')
    special = d.get('special', '')
    main_visa = d.get('mainVisa', '—')
    visa_fee = d.get('visaFee', 0)
    visa_fee_str = f'${visa_fee:,} (approx.)' if isinstance(visa_fee, int) and visa_fee > 0 else ('Free' if visa_fee == 0 else str(visa_fee))

    if purpose == 'travel':
        weekly = d.get('weeklyLiving', 0)
        flight = d.get('flightMinUSD', 0)
        extra_row1 = f'<div class="summary-item"><div class="label">Weekly Living</div><div class="value">${weekly:,}/wk</div></div>'
        extra_row2 = f'<div class="summary-item"><div class="label">Cheapest Flight</div><div class="value">from ${flight:,}</div></div>'
        cost_str = main_visa
    else:
        cost = d.get('cost', '—')
        extra_row1 = f'<div class="summary-item"><div class="label">Est. Annual Cost</div><div class="value">{cost}</div></div>'
        extra_row2 = f'<div class="summary-item"><div class="label">Visa Fee</div><div class="value">{visa_fee_str}</div></div>'
        cost_str = cost

    purpose_caps = purpose.capitalize()
    from_name = fi['name']
    to_name = ti['name']

    # Generate body paragraphs based on purpose and data
    body = body_content(from_c, to_c, purpose, d, fi, ti)

    return f'''  <section id="{purpose}">
    <h2>{PURPOSE_ICONS[purpose]} {PURPOSE_LABELS[purpose]} in {to_name} from {from_name}</h2>
    <div class="summary-box">
      <h3 data-i18n="qf_{purpose}">Quick Facts — {purpose_caps}</h3>
      <div class="summary-grid">
        <div class="summary-item"><div class="label">Main Visa</div><div class="value">{main_visa}</div></div>
        <div class="summary-item"><div class="label" data-i18n="label_difficulty">Difficulty</div><div class="value"><span class="diff-chip {diff_class}">{diff_label}</span></div></div>
        <div class="summary-item"><div class="label" data-i18n="label_processing">Processing Time</div><div class="value">{processing}</div></div>
        {extra_row1}
        {extra_row2}
      </div>
    </div>
{body}
  </section>'''


def body_content(from_c, to_c, purpose, d, fi, ti):
    from_name = fi['name']
    to_name = ti['name']
    special = d.get('special', '')
    diff = d.get('difficulty', 'moderate')
    main_visa = d.get('mainVisa', '—')
    processing = d.get('processingDays', 'Varies')

    if purpose == 'work':
        return f'''    <h3>Main Work Visa: {main_visa}</h3>
    <p>{special} Processing typically takes <strong>{processing}</strong>.</p>

    <h3>Key Requirements</h3>
    <ul>
      <li>Valid passport (minimum 6 months validity beyond intended stay)</li>
      <li>Job offer from {to_name} employer (most routes)</li>
      <li>Relevant qualifications and work experience</li>
      <li>Language proficiency (English and/or local language)</li>
      <li>Health insurance coverage</li>
    </ul>

    <h3>Tips for {from_name} Applicants</h3>
    <p>Nationals from {from_name} should research sector-specific demand in {to_name} before applying. Professional credential recognition, language requirements, and sponsor availability vary widely by industry. LinkedIn and country-specific job boards are the best starting point for identifying sponsoring employers.</p>'''

    elif purpose == 'study':
        cost = d.get('cost', 'varies')
        return f'''    <h3>Main Study Visa: {main_visa}</h3>
    <p>{special} Processing typically takes <strong>{processing}</strong>.</p>

    <h3>Tuition and Costs</h3>
    <p>Annual costs for international students from {from_name} in {to_name} are approximately <strong>{cost}</strong>. This includes tuition but not always accommodation and living expenses. Scholarship opportunities at public institutions are available — research university-specific financial aid early.</p>

    <h3>Application Checklist</h3>
    <ul>
      <li>Acceptance letter from a recognized institution in {to_name}</li>
      <li>Proof of financial means (tuition + living costs)</li>
      <li>Language proficiency test (IELTS/TOEFL or local equivalent)</li>
      <li>Academic transcripts and diplomas (apostilled/notarized)</li>
      <li>Health insurance covering the full duration of study</li>
      <li>Valid passport (minimum 6 months beyond intended stay)</li>
    </ul>

    <h3>Post-Study Work Rights</h3>
    <p>Many countries offer post-study work permits allowing graduates to gain local work experience, which can be a pathway to longer-term residence. Check the specific post-study visa availability for {to_name} to plan your career pathway in advance.</p>'''

    elif purpose == 'immigration':
        return f'''    <h3>Main Immigration Pathway: {main_visa}</h3>
    <p>{special} Expected processing timeline: <strong>{processing}</strong>.</p>

    <h3>Eligibility Criteria</h3>
    <ul>
      <li>Typically requires prior legal residence or work experience in {to_name}</li>
      <li>Language proficiency in the official language(s)</li>
      <li>Financial stability (income, savings, or employment proof)</li>
      <li>Clean criminal record and health standards</li>
      <li>Integration requirements (civics test, language test) in some countries</li>
    </ul>

    <h3>Long-Term Pathways for {from_name} Nationals</h3>
    <p>For {from_name} passport holders, {to_name} offers {"relatively straightforward" if diff == "easy" else "achievable but competitive" if diff == "moderate" else "challenging but not impossible"} immigration options. Building strong local ties — employment history, community involvement, and language skills — significantly increases success rates and may accelerate processing timelines.</p>'''

    else:  # travel
        main_visa_str = d.get('mainVisa', 'varies')
        weekly = d.get('weeklyLiving', 0)
        flight = d.get('flightMinUSD', 0)
        return f'''    <h3>Entry Requirement: {main_visa_str}</h3>
    <p>{special}</p>

    <h3>Practical Travel Information</h3>
    <ul>
      <li><strong>Weekly living costs:</strong> approximately ${weekly:,} USD (budget traveler)</li>
      <li><strong>Cheapest direct flights:</strong> from ${flight:,} USD one-way (varies by season)</li>
      <li><strong>Best booking time:</strong> 6–8 weeks in advance for best fares</li>
      <li><strong>Currency:</strong> check current exchange rates before departure</li>
      <li><strong>Health insurance:</strong> recommended even when not required</li>
    </ul>

    <h3>Travel Tips for {from_name} Visitors</h3>
    <p>{to_name} {"warmly welcomes" if diff == "easy" else "is accessible to"} travelers from {from_name}. {"The straightforward entry process means you can focus on planning your itinerary." if diff == "easy" else "Ensure your travel documents are in order well in advance." if diff == "moderate" else "Allow extra lead time for visa applications and ensure all documents are complete."}</p>'''


def build_faq(from_name, to_name, to_c):
    return f'''[{{"@type":"Question","name":"Is {to_name} a good destination for {from_name} nationals in 2026?","acceptedAnswer":{{"@type":"Answer","text":"{to_name} is a notable destination for {from_name} nationals. Whether for work, study, or travel, {to_name} offers multiple pathways — each with different requirements and processing timelines. This guide covers all four routes in detail."}}}},{{"@type":"Question","name":"What visa do {from_name} nationals need to travel to {to_name}?","acceptedAnswer":{{"@type":"Answer","text":"{from_name} passport holders should check the specific entry requirements for {to_name}. The travel section of this guide covers the current visa requirements, fees, and processing times."}}}},{{"@type":"Question","name":"How long does it take to get a work visa for {to_name} from {from_name}?","acceptedAnswer":{{"@type":"Answer","text":"Work visa processing times for {to_name} vary by category. The work section of this guide outlines the main visa types and their current processing timelines for {from_name} applicants."}}}},{{"@type":"Question","name":"What is the easiest immigration pathway from {from_name} to {to_name}?","acceptedAnswer":{{"@type":"Answer","text":"The easiest pathway depends on your profile. The immigration section of this guide compares all available pathways for {from_name} nationals including eligibility, costs, and timelines."}}}}]'''


def build_article(from_c, to_c):
    fi = FROM_INFO[from_c]
    ti = TO_INFO[to_c]
    from_name = fi['name']
    to_name = ti['name']
    from_flag = fi['flag']
    to_flag = ti['flag']
    from_i18n = fi['i18n_key']
    slug = f'{from_c}-to-{to_c}-2026'
    url = f'https://leavethiscountry.cloud/articles/{slug}.html'

    title = f'{from_name} to {to_name}: Work, Study, Immigration &amp; Travel Guide 2026'
    title_plain = title.replace('&amp;', '&')
    desc = f'Complete 2026 guide for {from_name} nationals moving to {to_name} — work visas, study options, immigration pathways, and travel requirements.'

    faq_entities = build_faq(from_name, to_name, to_c)
    article_ld = (
        f'{{"@context":"https://schema.org","@type":"Article","headline":"{title_plain}",'
        f'"description":"Complete guide for {from_name} nationals moving to {to_name} in 2026.",'
        f'"url":"{url}","datePublished":"2026-01-15","dateModified":"2026-06-15",'
        f'"publisher":{{"@type":"Organization","name":"LeaveThisCountry","url":"https://leavethiscountry.cloud"}},'
        f'"breadcrumb":{{"@type":"BreadcrumbList","itemListElement":['
        f'{{"@type":"ListItem","position":1,"name":"Home","item":"https://leavethiscountry.cloud/"}},'
        f'{{"@type":"ListItem","position":2,"name":"{from_name} to {to_name} 2026","item":"{url}"}}'
        f']}}}}'
    )
    faq_ld = f'{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{faq_entities}]}}'

    # Build purpose sections
    sections = ''
    for purpose in ['work', 'study', 'immigration', 'travel']:
        if to_c in DATA.get(from_c, {}).get(purpose, {}):
            sections += '\n' + section_html(from_c, to_c, purpose)

    # Official sources
    sources = OFFICIAL_SOURCES.get(to_c, [])
    source_links = '\n    '.join(f'<a href="{url}" target="_blank" rel="noopener">{label}</a>' for label, url in sources)

    # Related articles
    rel = related_links(from_c, to_c)

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{url}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="Complete 2026 guide for {from_name} nationals: work visas, study, immigration, and travel to {to_name}.">
  <meta property="og:url" content="{url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="LeaveThisCountry">
  <meta property="og:image" content="https://leavethiscountry.cloud/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">{article_ld}</script>
  <script type="application/ld+json">{faq_ld}</script>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../css/style.css">
  <style>
    body {{ overflow: auto; }}
    .art-wrap {{ max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; }}
    .art-nav {{ display: flex; align-items: center; gap: 16px; margin-bottom: 40px; }}
    .art-nav a {{ color: var(--accent); text-decoration: none; font-size: 14px; }}
    .art-logo {{ font-size: 18px; font-weight: 700; color: var(--text); text-decoration: none; }}
    .art-logo span {{ color: var(--accent); }}
    .breadcrumb {{ font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }}
    .breadcrumb a {{ color: var(--accent); text-decoration: none; }}
    h1 {{ font-size: 28px; font-weight: 700; line-height: 1.3; margin-bottom: 12px; }}
    .meta {{ font-size: 13px; color: var(--text-muted); margin-bottom: 24px; }}
    .purpose-nav {{ display: flex; gap: 8px; margin: 0 0 40px; flex-wrap: wrap; }}
    .purpose-tab {{ padding: 8px 20px; border-radius: 20px; text-decoration: none; font-size: 14px; font-weight: 600; background: #111a2a; color: #94a3b8; border: 1px solid #1e2d3a; transition: background 0.2s, color 0.2s, border-color 0.2s; }}
    .purpose-tab.active {{ background: var(--accent); color: #fff; border-color: var(--accent); }}
    section[id] {{ scroll-margin-top: 80px; border-top: 1px solid #1e2d3a; padding-top: 32px; margin-top: 48px; }}
    .summary-box {{ background: #111a2a; border: 1px solid #1e2d3a; border-radius: 12px; padding: 24px; margin: 24px 0 32px; }}
    .summary-box h3 {{ font-size: 12px; font-weight: 600; margin-bottom: 16px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }}
    .summary-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }}
    .summary-item .label {{ font-size: 12px; color: var(--text-muted); margin-bottom: 4px; }}
    .summary-item .value {{ font-size: 15px; font-weight: 600; color: var(--text); }}
    .diff-chip {{ display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }}
    .diff-chip.easy {{ background: #d1fae5; color: #065f46; }}
    .diff-chip.moderate {{ background: #fef3c7; color: #92400e; }}
    .diff-chip.hard {{ background: #fee2e2; color: #991b1b; }}
    h2 {{ font-size: 22px; font-weight: 600; margin: 0 0 12px; }}
    h3 {{ font-size: 17px; font-weight: 600; margin: 24px 0 8px; }}
    p, li {{ color: #94a3b8; line-height: 1.75; margin-bottom: 12px; }}
    ul, ol {{ padding-left: 24px; }}
    strong {{ color: var(--text); }}
    .source-list {{ background: #0d1521; border-radius: 8px; padding: 16px 20px; margin-top: 48px; }}
    .source-list h3 {{ font-size: 14px; margin-bottom: 8px; color: var(--text); }}
    .source-list a {{ color: var(--accent); font-size: 13px; display: block; margin-bottom: 4px; }}
    .author-box {{ border-top: 1px solid #1e2d3a; padding-top: 24px; margin-top: 48px; }}
    .author-box p {{ font-size: 13px; }}
    table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
    th {{ background: #111a2a; color: var(--text); font-size: 13px; padding: 10px 14px; text-align: left; border-bottom: 1px solid #1e2d3a; }}
    td {{ color: #94a3b8; font-size: 13px; padding: 10px 14px; border-bottom: 1px solid #0f1e2e; }}
    .related-box {{ border-top: 1px solid #1e2d3a; padding-top: 24px; margin-top: 48px; }}
    .related-box h3 {{ font-size: 15px; font-weight: 600; margin-bottom: 16px; color: var(--text); }}
    .rel-links {{ display: flex; flex-wrap: wrap; gap: 10px; }}
    .rel-link {{ display: inline-block; padding: 8px 16px; background: #111a2a; border: 1px solid #1e2d3a; border-radius: 20px; color: var(--accent); text-decoration: none; font-size: 13px; font-weight: 500; transition: border-color 0.2s, background 0.2s; }}
    .rel-link:hover {{ background: #162033; border-color: var(--accent); }}
  </style>
</head>
<body>
<div class="art-wrap">
  <nav class="art-nav">
    <a href="../index.html" class="art-logo">Leave<span>This</span>Country</a>
    <a href="../index.html" data-i18n="back_to_map">← Back to map</a>
    <div class="lang-sw art-lang-sw">
      <button class="lang-trigger">&#127760; <span class="lang-current">EN</span></button>
      <div class="lang-menu">
        <button class="lang-opt" data-lang="en">English</button>
        <button class="lang-opt" data-lang="ko">한국어</button>
        <button class="lang-opt" data-lang="zh">繁中</button>
        <button class="lang-opt" data-lang="hi">हिंदी</button>
        <button class="lang-opt" data-lang="ja">日本語</button>
      </div>
    </div>
  </nav>
  <div class="breadcrumb"><a href="../index.html" data-i18n="home">Home</a> › {from_name} › {to_name}</div>
  <h1>{from_flag} {from_name} → {to_flag} {to_name}: Complete 2026 Guide</h1>
  <div class="meta">From: {from_name} &nbsp;·&nbsp; To: {to_name} &nbsp;·&nbsp; Updated: June 2026</div>

  <div class="purpose-nav">
    <a href="#work" class="purpose-tab" data-i18n="art_work">Work</a>
    <a href="#study" class="purpose-tab" data-i18n="art_study">Study</a>
    <a href="#immigration" class="purpose-tab" data-i18n="art_immigration">Immigration</a>
    <a href="#travel" class="purpose-tab" data-i18n="art_travel">Travel</a>
  </div>
{sections}

  <div class="source-list">
    <h3 data-i18n="official_sources">Official Sources</h3>
    {source_links}
  </div>
  <div class="author-box">
    <p><strong style="color:var(--text)" data-i18n="about_guide">About this guide</strong> — Data researched against official government sources. Last reviewed June 2026. LeaveThisCountry provides general information only — not legal or immigration advice. See our <a href="../disclaimer.html" style="color:var(--accent)">disclaimer</a>.</p>
  </div>
  <div class="related-box">
    <h3><span data-i18n="more_guides_from">More guides from</span> <span data-i18n="{from_i18n}">{from_name}</span></h3>
    <div class="rel-links">
      {rel}
    </div>
  </div>
</div>
<script>
(function(){{
  function setActive(){{
    var h=window.location.hash||'#work';
    document.querySelectorAll('.purpose-tab').forEach(function(a){{
      a.classList.toggle('active',a.getAttribute('href')===h);
    }});
  }}
  setActive();
  window.addEventListener('hashchange',setActive);
}})();
</script>
<script src="../js/i18n.js"></script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-GVMRVPYCRG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-GVMRVPYCRG');
</script>
</body>
</html>'''


def main():
    generated = 0
    skipped = 0
    for from_c in FROM_INFO:
        for to_c in TO_INFO:
            if to_c == from_c:
                continue  # skip self
            fn = f'{from_c}-to-{to_c}-2026.html'
            path = os.path.join(ARTICLES_DIR, fn)
            if os.path.exists(path):
                skipped += 1
                continue
            html = build_article(from_c, to_c)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(html)
            generated += 1
            print(f'OK {fn}')
    print(f'\nDone. Generated: {generated}, Skipped (already exist): {skipped}')


if __name__ == '__main__':
    main()
