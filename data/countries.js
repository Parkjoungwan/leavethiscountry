const FROM_COUNTRIES = {
  india:    { name: "India",     flag: "🇮🇳", code: "IN", passportRank: 84 },
  korea:    { name: "South Korea", flag: "🇰🇷", code: "KR", passportRank: 2 },
  japan:    { name: "Japan",     flag: "🇯🇵", code: "JP", passportRank: 2 },
  hongkong: { name: "Hong Kong", flag: "🇭🇰", code: "HK", passportRank: 13 },
  usa:      { name: "USA",       flag: "🇺🇸", code: "US", passportRank: 10 },
  france:   { name: "France",    flag: "🇫🇷", code: "FR", passportRank: 4  },
  tunisia:  { name: "Tunisia",   flag: "🇹🇳", code: "TN", passportRank: 76 }
};

// Exchange rates vs USD — update quarterly
// Last updated: October 2026
const FROM_CURRENCY = {
  india: {
    code: "INR", symbol: "₹", rateFromUSD: 95,
    format(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      // e.g. 2,490,000 → ₹24.9L  or  83,500 → ₹83.5K
      if (v >= 1000000) return `₹${(v / 100000).toFixed(1)}L`;
      if (v >= 1000)    return `₹${Math.round(v / 1000)}K`;
      return `₹${v}`;
    },
    formatFull(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      return `₹${v.toLocaleString("en-IN")}`;
    }
  },
  korea: {
    code: "KRW", symbol: "₩", rateFromUSD: 1335,
    format(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      if (v >= 100000000) return `₩${(v / 100000000).toFixed(1)}억`;
      if (v >= 10000)     return `₩${Math.round(v / 10000)}만`;
      return `₩${v.toLocaleString("ko-KR")}`;
    },
    formatFull(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      return `₩${v.toLocaleString("ko-KR")}`;
    }
  },
  japan: {
    code: "JPY", symbol: "¥", rateFromUSD: 158,
    format(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      if (v >= 100000000) return `¥${(v / 100000000).toFixed(1)}億`;
      if (v >= 100000)    return `¥${Math.round(v / 10000)}万`;
      if (v >= 10000)     return `¥${(v / 10000).toFixed(1)}万`;
      return `¥${v.toLocaleString("ja-JP")}`;
    },
    formatFull(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      return `¥${v.toLocaleString("ja-JP")}`;
    }
  },
  hongkong: {
    code: "HKD", symbol: "HK$", rateFromUSD: 7.85,
    format(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      if (v >= 100000000) return `HK$${(v / 100000000).toFixed(1)}億`;
      if (v >= 100000)    return `HK$${Math.round(v / 10000)}萬`;
      if (v >= 10000)     return `HK$${(v / 10000).toFixed(1)}萬`;
      if (v >= 1000)      return `HK$${(v / 1000).toFixed(1)}K`;
      return `HK$${v}`;
    },
    formatFull(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      return `HK$${v.toLocaleString("zh-HK")}`;
    }
  },
  usa: {
    code: "USD", symbol: "$", rateFromUSD: 1,
    format(usd) {
      if (usd === 0) return "Free";
      if (usd >= 1000000) return `$${(usd / 1000000).toFixed(1)}M`;
      if (usd >= 1000)    return `$${Math.round(usd / 1000)}K`;
      return `$${usd}`;
    },
    formatFull(usd) {
      if (usd === 0) return "Free";
      return `$${usd.toLocaleString("en-US")}`;
    }
  },
  france: {
    code: "EUR", symbol: "€", rateFromUSD: 0.89,
    format(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      if (v >= 1000000) return `€${(v / 1000000).toFixed(1)}M`;
      if (v >= 1000)    return `€${Math.round(v / 1000)}K`;
      return `€${v}`;
    },
    formatFull(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      return `€${v.toLocaleString("fr-FR")}`;
    }
  },
  tunisia: {
    code: "TND", symbol: "DT", rateFromUSD: 3.0,
    format(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      if (v >= 1000000) return `DT${(v / 1000000).toFixed(1)}M`;
      if (v >= 1000)    return `DT${Math.round(v / 1000)}K`;
      return `DT${v}`;
    },
    formatFull(usd) {
      if (usd === 0) return "Free";
      const v = Math.round(usd * this.rateFromUSD);
      return `DT${v.toLocaleString("ar-TN")}`;
    }
  }
};

const PURPOSES = {
  study:       { label: "Study",       icon: "🎓" },
  work:        { label: "Work",        icon: "💼" },
  immigration: { label: "Immigration", icon: "🏠" },
  travel:      { label: "Travel",      icon: "✈️" }
};

const TO_COUNTRIES = {
  canada:      { name: "Canada",      flag: "🇨🇦", code: "CA", iso3: "CAN" },
  germany:     { name: "Germany",     flag: "🇩🇪", code: "DE", iso3: "DEU" },
  australia:   { name: "Australia",   flag: "🇦🇺", code: "AU", iso3: "AUS" },
  singapore:   { name: "Singapore",   flag: "🇸🇬", code: "SG", iso3: "SGP" },
  uae:         { name: "UAE",         flag: "🇦🇪", code: "AE", iso3: "ARE" },
  uk:          { name: "UK",          flag: "🇬🇧", code: "GB", iso3: "GBR" },
  japan:       { name: "Japan",       flag: "🇯🇵", code: "JP", iso3: "JPN" },
  portugal:    { name: "Portugal",    flag: "🇵🇹", code: "PT", iso3: "PRT" },
  usa:         { name: "USA",         flag: "🇺🇸", code: "US", iso3: "USA" },
  thailand:    { name: "Thailand",    flag: "🇹🇭", code: "TH", iso3: "THA" },
  newzealand:  { name: "New Zealand", flag: "🇳🇿", code: "NZ", iso3: "NZL" },
  france:      { name: "France",      flag: "🇫🇷", code: "FR", iso3: "FRA" },
  netherlands: { name: "Netherlands", flag: "🇳🇱", code: "NL", iso3: "NLD" },
  italy:       { name: "Italy",       flag: "🇮🇹", code: "IT", iso3: "ITA" },
  spain:       { name: "Spain",       flag: "🇪🇸", code: "ES", iso3: "ESP" },
  malaysia:    { name: "Malaysia",    flag: "🇲🇾", code: "MY", iso3: "MYS" }
};

const DIFFICULTY_CONFIG = {
  easy:     { label: "Easy",     fill: "#22d3a0", stroke: "#34efa8", score: 1 },
  moderate: { label: "Moderate", fill: "#f59e0b", stroke: "#fbbf24", score: 2 },
  hard:     { label: "Hard",     fill: "#f43f5e", stroke: "#fb6480", score: 3 },
  none:     { label: "No data",  fill: "#1e2d3a", stroke: "#263548", score: 0 }
};

// ISO numeric codes for D3 topojson country matching
const ISO_NUMERIC = {
  CAN: "124", DEU: "276", AUS: "036", SGP: "702",
  ARE: "784", GBR: "826", JPN: "392", PRT: "620",
  USA: "840", THA: "764", NZL: "554", FRA: "250",
  NLD: "528", ITA: "380", ESP: "724", MYS: "458"
};

const DATA = {
  india: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr + CAD 150 permit" },
        difficulty: "moderate",
        processingDays: "56~112 days",
        special: "Provincial attestation letter (PAL/TAL) needed under the 2026 study permit cap. Proof of funds CAD 23,448 + first-year tuition (from 1 Sep 2026). PGWP up to 3 years, but college programs must be in an eligible field and CLB 5/7 language results are required.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "120~180 days (appointment bottleneck)",
        special: "Public universities FREE. Blocked account €11,904/yr (€992/month) required. Book embassy appointment immediately after admission.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr + AUD 2,500 visa" },
        difficulty: "moderate",
        processingDays: "29~42 days",
        special: "Visa fee AUD 2,500 (from 1 Jul 2026). Work limited to 48 hours per fortnight during term. Genuine Student (GS) requirement replaced the GTE statement; proof of about AUD 29,710/yr living costs plus tuition.",
        visaFee: 1738,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "moderate",
        processingDays: "14~28 days",
        special: "Strong job placement in APAC. Student Pass required via ICA.",
        visaFee: 70,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "No income tax. MBZUAI and Khalifa Univ offer scholarships. Visa linked to university enrollment.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-studying-in-the-uae"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "moderate",
        processingDays: "3 weeks",
        special: "IHS fee £776/yr mandatory. Graduate visa 2yr if applying by 31 Dec 2026, 18 months from 1 Jan 2027. B2 English usually required for degree-level study.",
        visaFee: 742,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "hard",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "Certificate of Eligibility (CoE) issued via school takes ~3 months (CoE itself free). Visa fee ¥15,000 single-entry from Jul 2026. JLPT N4+ or IELTS 5.5 required.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "D4 Student Visa (€110 national visa fee). Part-time work allowed alongside studies (notify AIMA). EU access after legal residency. Low cost of living.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 50000, currency: "USD", label: "$40K~60K/yr" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "F-1 visa ($185 + $350 SEVIS fee). In-person interview and public social-media review required. OPT 1yr + STEM OPT 2yr after graduation. Largest Indian student diaspora destination.",
        visaFee: 535,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
      },
      thailand: {
        cost: { annual: 5000, currency: "USD", label: "฿120K~200K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "ED (Education) visa. Many English-taught programs. Low cost of living. Thai universities partnered with global institutions.",
        visaFee: 40,
        officialUrl: "https://www.immigration.go.th"
      },
      newzealand: {
        cost: { annual: 25000, currency: "USD", label: "NZD 25K~40K/yr" },
        difficulty: "moderate",
        processingDays: "Up to 7 weeks (80%)",
        special: "Post-study work visa up to 3 years (depends on qualification level). Part-time work up to 25 hrs/wk during study (raised from 20 in Nov 2025). Proof of NZD 20,000/yr living costs plus tuition.",
        visaFee: 495,
        officialUrl: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/"
      },
      france: {
        cost: { annual: 12000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "VLS-TS student visa via Campus France (Études en France); visa fee €50. Non-EU tuition at public universities €2,902 (licence) / €3,950 (master) per year unless the university grants an exemption. Grandes Écoles set their own fees.",
        visaFee: 56,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 18000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "MVV + residence permit via university (IND fee €254). Proof of funds ~€1,131/month (2026). Orientation year after graduation. English-taught programs at Delft/Leiden/Amsterdam.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Public universities €900~4,000/yr. Type D national visa required. Bologna and Milan Polytechnic top ranked.",
        visaFee: 57,
        officialUrl: "https://www.universitaly.it/"
      },
      spain: {
        cost: { annual: 10000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Public universities from €800/yr. National D student visa; students may work up to 30 hr/week under the 2025 immigration regulation. NIE/TIE on arrival. 12-month post-study job-search permit.",
        visaFee: 80,
        officialUrl: "https://www.studyinspain.info"
      },
      malaysia: {
        cost: { annual: 8000, currency: "USD", label: "MYR 25K~45K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Student Pass via EMGS. Low cost vs. Western universities. UTM and UM ranked top in Southeast Asia. English medium instruction.",
        visaFee: 110,
        officialUrl: "https://educationmalaysia.gov.my"
      }
    },
    work: {
      canada: {
        cost: { annual: 200, currency: "USD", label: "CAD 155 permit + CAD 85 biometrics" },
        difficulty: "moderate",
        processingDays: "2~6 months (work permit)",
        special: "Employer-specific work permit usually needs an LMIA. Express Entry no longer gives CRS points for job offers (since 25 Mar 2025); category draws (healthcare, trades, French, etc.) and CEC dominate, with CEC cut-offs around 515–525 in 2026.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€75 visa + residence permit fee" },
        difficulty: "easy",
        processingDays: "14~21 days (after appointment)",
        special: "Opportunity Card (Chancenkarte) allows up to 1 year of job-seeking without an offer. EU Blue Card for salary €50,700+ (€45,934 for shortage occupations/new graduates, 2026). Fastest for skilled workers.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 4640, currency: "USD", label: "AUD 4,015 visa fee" },
        difficulty: "moderate",
        processingDays: "56~112 days",
        special: "Skills in Demand (482) visa (replaced TSS in Dec 2024) needs an employer sponsor; salary must meet the Core Skills Income Threshold. Points-tested PR via 189/190. Indian graduates can also try the MATES scheme or 462 Work and Holiday ballot (age 18–30).",
        visaFee: 2791,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skills-in-demand-visa-subclass-482"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 + 225 issuance" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Employment Pass:  SGD 5,600+/month (6,200 in finance), higher with age, rising to 6,000/6,600 from Jan 2027, plus 40 COMPASS points. Employer applies via myMOM Portal.",
        visaFee: 80,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 3K~5K employer covers" },
        difficulty: "easy",
        processingDays: "5~10 days",
        special: "No income tax. Employer-sponsored. Golden Visa for salary AED 30K+/month. Fastest processing globally.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-working-in-the-uae"
      },
      uk: {
        cost: { annual: 2000, currency: "USD", label: "£819~1,618 visa fee" },
        difficulty: "hard",
        processingDays: "3 weeks (standard), 1 day (priority)",
        special: "Skilled Worker Visa: degree-level (RQF 6) job, salary £41,700+/yr or going rate. Sponsor licence required from employer. English B2 required since Jan 2026. India Young Professionals Scheme (ballot, 18–30) is an alternative.",
        visaFee: 1089,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 1000, currency: "USD", label: "¥15,000 visa fee" },
        difficulty: "hard",
        processingDays: "5~10 days",
        special: "Engineer/Specialist in Humanities/Intl. Services or HSP (Highly Skilled) visa. Japanese N2+ strongly preferred. CoE from employer; visa ¥15,000 (from Jul 2026), renewals ¥10,000–75,000 from Oct 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
      },
      portugal: {
        cost: { annual: 1200, currency: "USD", label: "€110 D3 visa fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "D3 Highly Qualified visa or EU Blue Card. Tech sector growing fast. NHR closed to new applicants in 2024 — successor IFICI (20% flat rate) only for qualifying roles.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "H-1B employer fees ~$2,200~3,600" },
        difficulty: "hard",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B annual cap lottery (65,000 + 20,000 US master's), wage-weighted selection since FY2027 favours higher salary levels. Employer sponsorship mandatory. A $100K fee for new petitions from abroad is contested in court.",
        visaFee: 2225,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "฿5K~15K work permit fee" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "Non-B visa + work permit required. 4:1 Thai-to-foreign employee ratio rule. Many jobs restricted to Thai nationals.",
        visaFee: 40,
        officialUrl: "https://www.doe.go.th"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 1,540 AEWV fee" },
        difficulty: "moderate",
        processingDays: "Up to 5 weeks (80%)",
        special: "Accredited Employer Work Visa (AEWV). Employer must be accredited and pay at least the market rate (median-wage rule dropped in Mar 2025). Need 2+ years' relevant experience or a Level 4+ qualification.",
        visaFee: 895,
        officialUrl: "https://www.immigration.govt.nz/visas/accredited-employer-work-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 long-stay visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Talent card (ex-Passeport Talent, renamed by Law 2024-42): 'talent – salarié qualifié' needs a Master's-level degree and salary ≥ €39,582/yr; EU Blue Card ('talent – carte bleue européenne') from €59,373/yr. Up to 4-year multi-year card. No French requirement for the visa itself.",
        visaFee: 111,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€423 HSM permit" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "Highly Skilled Migrant (HSM) permit. Fast-tracked IND processing for recognised sponsors. 2026 salary threshold €5,942/month (30+), €4,357 (under 30). 30% tax ruling (27% from 2027 for post-2024 arrivals).",
        visaFee: 475,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi 2026–2028 sets 497,550 work entries over three years (~165K/yr) via online click days; employer must obtain nulla osta first. EU Blue Card is outside quotas (salary must meet collective-agreement pay). Quotas heavily oversubscribed.",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professional permit or EU Blue Card via a Spanish employer. Digital Nomad Visa (since 2023) needs ≈€2,849/month remote income in 2026. Beckham law 24% flat tax for 6 years.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Employment Pass via ESD portal. EP salary floors from Jun 2026: RM5,000 (Cat III), RM10,000 (Cat II), RM20,000 (Cat I). Malaysia Digital (formerly MSC) status companies hire internationally.",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,590 PR fees (incl. RPRF)" },
        difficulty: "moderate",
        processingDays: "180 days (Express Entry PR)",
        special: "Express Entry CRS points system — job-offer points removed since Mar 2025, so category-based draws (healthcare, trades, French, STEM) and PNPs matter most. Citizenship possible after 3 years of physical presence as PR.",
        visaFee: 1145,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 residence permit" },
        difficulty: "moderate",
        processingDays: "21~36 months (settlement permit)",
        special: "Settlement permit (Niederlassungserlaubnis) after 3 years as a skilled worker. EU Blue Card: 27 months, or 21 months with B1 German. Citizenship after 5 years (3-year fast track abolished 2025); dual citizenship allowed by Germany but India does not permit it (OCI instead).",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently-in-germany"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 6,135~6,140 visa fee" },
        difficulty: "hard",
        processingDays: "12~36 months",
        special: "Points-based 189/190/491 visas. Skills assessment mandatory. Age limit 45. 2026-27 program stays at 185,000 places, with onshore applicants prioritised.",
        visaFee: 4265,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR application" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "PR highly competitive. No points system — discretionary assessment. EP holders with 2+ years in SG have best chances.",
        visaFee: 78,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K~7K Golden Visa" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa for investors, specialists, graduates. No local sponsor required. No income tax ever.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/golden-visa"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£3,226 ILR fee" },
        difficulty: "hard",
        processingDays: "6 months",
        special: "ILR after 5yr on Skilled Worker (proposed 'earned settlement' reform would raise the standard to 10yr — not yet in force). Life in UK test required. English mandatory.",
        visaFee: 4290,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥200,000 PR fee (from Oct 2026)" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "PR normally after 10 years' residence; HSP holders can apply after 3 yrs (70 pts) or 1 yr (80 pts). PR fee ¥200,000 from Oct 2026; stricter tax/social-insurance checks. Dual citizenship not recognized.",
        visaFee: 1263,
        officialUrl: "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 residence permit" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5 years (A2 Portuguese). Citizenship after 10 years (2026 nationality law). D7 Passive Income Visa (€920/month in 2026). Golden Visa via €500K funds or €250K cultural donation — no real estate.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "$1,440 Green Card fee" },
        difficulty: "hard",
        processingDays: "20+ years (EB-3 India backlog)",
        special: "EB-2/EB-3 Green Card has decades-long backlog for Indian nationals. EB-1A (extraordinary ability) has no backlog. Citizenship after 5yr.",
        visaFee: 1440,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "THB 50K LTR fee" },
        difficulty: "hard",
        processingDays: "30 days",
        special: "LTR visa (10 yr, THB 50,000 fee) for wealthy pensioners and remote professionals with US$80K+ income. Thailand Privilege (ex-Elite) 5~20yr from THB 650K–900K. PR possible but quota-limited.",
        visaFee: 1540,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 6,450 SMC fee" },
        difficulty: "hard",
        processingDays: "12~18 months",
        special: "Skilled Migrant Category uses a 6-point system (qualifications, registration or income, plus NZ skilled work). From 24 Aug 2026, new Skilled Work Experience and Trades & Technician pathways open for people with longer NZ work history.",
        visaFee: 3740,
        officialUrl: "https://www.immigration.govt.nz/visas/skilled-migrant-category-resident-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€350 residence-permit tax" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Carte de Résident (10yr) after 5yr legal stay; since Jan 2026 first applications need French B1 plus a civic exam. Naturalisation after 5yr (2yr after 2 years of French higher education) requires B2. France allows dual nationality, but India does not.",
        visaFee: 393,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€254 PR permit" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permanent residence after 5yr. Civic integration exam required (Dutch language). Naturalisation possible after 5yr residence (10-year proposal not yet law). Strong expat infrastructure.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "~€146 permit fees" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE (long-term EU resident) after 5yr; Italian A2 test. Citizenship by naturalisation after 10yr (B1 Italian) — India does not allow dual citizenship.",
        visaFee: 164,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residence after 5yr (no language test). Nationality after 10yr with DELE A2 + CCSE exams (2yr for Ibero-American nationals). Arraigo paths need 2yr presence since May 2025. Golden visa abolished April 2025.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "MM2H (revamped 2024): Silver US$150K deposit for a 5-yr pass, Gold US$500K (15-yr), Platinum US$1M (20-yr); age 25+, property purchase required. No direct PR path.",
        visaFee: 1100,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 100 visa + CAD 85 biometrics" },
        difficulty: "hard",
        processingDays: "Visa required: several weeks~months",
        special: "Visitor visa (TRV) required for Indian passport; not eligible for eTA, even with a US visa. Biometrics (CAD 85) required. Processing can take several weeks to months.",
        visaFee: 72,
        weeklyLiving: 420,
        flightMinUSD: 680,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa covers 29 European countries. 90 days in 180 days rule. Travel insurance €30K mandatory. Biometrics recorded in the EU Entry/Exit System (EES) at the border.",
        visaFee: 101,
        weeklyLiving: 350,
        flightMinUSD: 380,
        officialUrl: "https://www.schengenvisainfo.com/germany-visa/"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa AUD 250" },
        difficulty: "moderate",
        processingDays: "29 days",
        special: "eVisitor not available for Indians. Subclass 600 visitor visa required. Strong financial ties must be proven.",
        visaFee: 174,
        weeklyLiving: 400,
        flightMinUSD: 320,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa required (S$30)" },
        difficulty: "moderate",
        processingDays: "3~5 working days",
        special: "Indian passport holders need a Singapore visa, applied via an authorised visa agent or mission (S$30 + agent fee). 96-hour Visa-Free Transit Facility for eligible travellers. Submit the free SG Arrival Card within 3 days before arrival.",
        visaFee: 23,
        weeklyLiving: 280,
        flightMinUSD: 100,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "e-Visa or AED 100 VOA (if eligible)" },
        difficulty: "easy",
        processingDays: "e-Visa 2~4 days / VOA if eligible",
        special: "Most Indians need a pre-arranged e-visa. Visa on arrival only for holders of a valid US visa/green card or EU, UK, Canada, Australia, NZ, Japan, Korea or Singapore visa/residence: 14 days for AED 100 (extendable 14 days, AED 250) or 60 days for AED 250.",
        visaFee: 27,
        weeklyLiving: 280,
        flightMinUSD: 80,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/tourist-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "Visit visa £135" },
        difficulty: "hard",
        processingDays: "15 working days",
        special: "UK Standard Visitor Visa required. Strong rejection history. Proof of ties to home country essential. US/Schengen visa holders get streamlined process.",
        visaFee: 180,
        weeklyLiving: 420,
        flightMinUSD: 450,
        officialUrl: "https://www.gov.uk/standard-visitor-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa required ¥15,000" },
        difficulty: "moderate",
        processingDays: "5 business days",
        special: "Visa required for Indians (¥15,000 single-entry fee from Jul 2026). Tourist visa up to 90 days. Proof of hotel booking and sufficient funds required. Low rejection rate.",
        visaFee: 95,
        weeklyLiving: 250,
        flightMinUSD: 280,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa covers 29 countries. Apply via VFS Global Portugal centres in India; standard processing 15 days. EES biometric registration at the border since 2026.",
        visaFee: 101,
        weeklyLiving: 220,
        flightMinUSD: 380,
        officialUrl: "https://vistos.mne.gov.pt/en/short-stay-visas-schengen/general-information/visa-fees"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "B-2 tourist visa $185" },
        difficulty: "hard",
        processingDays: "3~5 days after interview (interview waits vary; often months)",
        special: "B-1/B-2 visa required with in-person interview. Interview waits at Indian consulates can run many months — check the State Dept wait-time tool and apply well ahead. Social-media identifiers must be disclosed.",
        visaFee: 185,
        weeklyLiving: 350,
        flightMinUSD: 600,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free (30 days, tourism only)",
        special: "30-day visa exemption (tourism only) under the rules in force since 15 Sep 2026, which replaced the 60-day scheme. Extendable once by up to 30 days at immigration. Submit the free Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 150,
        officialUrl: "https://www.thaievisa.go.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa NZD 441" },
        difficulty: "moderate",
        processingDays: "Up to 2 weeks (80%)",
        special: "Visitor visa required for Indians. Online application via Immigration NZ. Proof of funds (NZD 1,000/month) and onward ticket required. Up to 9 months' stay in 18 months.",
        visaFee: 255,
        weeklyLiving: 180,
        flightMinUSD: 580,
        officialUrl: "https://www.immigration.govt.nz/visas/visitor-visa/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa covers 29 European countries. France visa via VFS Global widely available in India. Biometrics registered in the EU Entry/Exit System (EES) at first entry.",
        visaFee: 101,
        weeklyLiving: 280,
        flightMinUSD: 420,
        officialUrl: "https://france-visas.gouv.fr"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa (€90). Apply at VFS Netherlands centres across India. Covers all 29 Schengen countries; EES biometric registration at first entry.",
        visaFee: 101,
        weeklyLiving: 320,
        flightMinUSD: 380,
        officialUrl: "https://www.netherlandsworldwide.nl/visa-the-netherlands/schengen-visa"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa. Italy popular for food/culture tourism. Apply via VFS Italy centers. Summer appointments fill fast — book 2 months ahead.",
        visaFee: 101,
        weeklyLiving: 230,
        flightMinUSD: 400,
        officialUrl: "https://vfsglobal.com/en/individuals/article/italy-visas"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa (€90) covers 29 countries. Apply via BLS International centres. EES biometric registration at first entry. Summer/Christmas appointments are scarce — apply early.",
        visaFee: 101,
        weeklyLiving: 220,
        flightMinUSD: 420,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free entry",
        special: "Indians get 30-day visa-free entry until 31 Dec 2026 (extension beyond then not yet announced). Tourism/social visits only — not for work. Complete the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 100,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/"
      }
    }
  },
  korea: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr" },
        difficulty: "easy",
        processingDays: "28~56 days",
        special: "PAL/TAL required for most undergraduate/college programs under the 2026 cap. Proof of funds CAD 23,448 + tuition. PGWP up to 3 years (language test + field-of-study rules for college programs).",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "Public universities FREE. Blocked account €11,904/yr (€992/month) required. Korea-Germany strong bilateral ties ease processing.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr + AUD 2,500 visa" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "Visa fee AUD 2,500. Genuine Student requirement applies. Work 48 hrs/fortnight in term. Working Holiday (417) now open to Koreans up to age 35. Post-study Graduate visa (485) 2~3 years.",
        visaFee: 1738,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Koreans enjoy strong reputation. NUS/NTU world top 20. Student Pass via ICA. Easy travel within ASEAN.",
        visaFee: 70,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Korean passport has strong standing. Tax-free living. Several Korean university branches in UAE.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-studying-in-the-uae"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Korean applicants have high UK visa approval rate. Graduate visa 2yr if applying by 31 Dec 2026, 18 months from 1 Jan 2027. IHS £776/yr.",
        visaFee: 742,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "easy",
        processingDays: "3~5 days (after CoE)",
        special: "Cultural and language affinity. Many Korean students in Japan. N2 Japanese preferred. CoE takes 1~3 months from school; visa fee ¥15,000 from Jul 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "EU access from Portugal. D4 Visa (€110 fee). Growing Korean expat community in Lisbon. Low cost vs. UK/Australia.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 45000, currency: "USD", label: "$35K~55K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "F-1 visa ($185 + $350 SEVIS fee). In-person interview and public social-media review required. OPT 1yr + STEM OPT 2yr after graduation. Strong Korean alumni networks at US universities. Top destination for Korean PhD students.",
        visaFee: 535,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
      },
      thailand: {
        cost: { annual: 5000, currency: "USD", label: "฿120K~200K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "ED visa. Affordable education. Thai universities partner with Korean institutions. Popular among Koreans for short-term language and culture programs.",
        visaFee: 40,
        officialUrl: "https://www.immigration.go.th"
      },
      newzealand: {
        cost: { annual: 20000, currency: "USD", label: "NZD 20K~35K/yr" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Working Holiday option for ages 18–30. Post-study work visa up to 3 years. Work up to 25 hrs/wk during study. Auckland/Wellington are top choices.",
        visaFee: 495,
        officialUrl: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/"
      },
      france: {
        cost: { annual: 10000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "Campus France (Études en France) procedure mandatory; VLS-TS visa fee €50. Non-EU public-university tuition €2,902 (licence) / €3,950 (master) per year unless exempted. Grandes Écoles popular with Korean students. French B2 required for French-taught programs.",
        visaFee: 56,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 16000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Residence permit via university (IND fee €254; Koreans need no MVV). Orientation year after graduation. Delft/TU/e strong in engineering. English-language programs widely available.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Public universities from €900/yr. National D visa required despite Schengen-free travel. Permesso di soggiorno required on arrival.",
        visaFee: 57,
        officialUrl: "https://www.universitaly.it/"
      },
      spain: {
        cost: { annual: 9000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "National D student visa required for stays over 90 days. Students may work up to 30 hr/week (2025 regulation). NIE/TIE required on arrival. Spanish language popular among Korean students.",
        visaFee: 80,
        officialUrl: "https://www.studyinspain.info"
      },
      malaysia: {
        cost: { annual: 7000, currency: "USD", label: "MYR 20K~40K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Student Pass via EMGS. English-medium instruction. Growing Korean expat community. Affordable living — cheapest English-taught degree in Asia.",
        visaFee: 110,
        officialUrl: "https://educationmalaysia.gov.my"
      }
    },
    work: {
      canada: {
        cost: { annual: 3500, currency: "USD", label: "CAD 285 IEC fees + CAD 85 biometrics" },
        difficulty: "easy",
        processingDays: "56~112 days",
        special: "IEC Working Holiday for Koreans aged 18–35: open work permit, no job offer needed (fee CAD 184.75 + CAD 100 open-permit fee). Express Entry also available.",
        visaFee: 205,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€75 visa + residence permit fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Working Holiday for Koreans aged 18–30. Opportunity Card available. EU Blue Card from €50,700 (2026). Strong demand for Korean engineers in auto/semiconductor sector.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 840 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (417) for Koreans aged 18–35 (raised from 30 on 1 Jul 2026). Second/third years need regional work and, under Sept 2026 plans, a ballot. Skills in Demand (482) employer-sponsored visa also available.",
        visaFee: 584,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 + 225 issuance" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Korean professionals highly sought in tech/finance. EP needs SGD 5,600+/month (6,200 in finance), higher with age, rising to 6,000/6,600 from Jan 2027, plus 40 COMPASS points. Employer applies.",
        visaFee: 80,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Employer covers cost" },
        difficulty: "easy",
        processingDays: "5~10 days",
        special: "Zero income tax. Korean companies (Samsung, LG, Hyundai) hiring locally. Golden Visa for high earners.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 2000, currency: "USD", label: "£819~1,618 Skilled Worker fee (YMS £340)" },
        difficulty: "moderate",
        processingDays: "3 weeks",
        special: "Youth Mobility Scheme (YMS) for Koreans aged 18–35: up to 2yr open work permit (£340 fee). Skilled Worker requires sponsor & £41,700+/yr salary.",
        visaFee: 1089,
        officialUrl: "https://www.gov.uk/youth-mobility"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥3,000 fee" },
        difficulty: "easy",
        processingDays: "5 days",
        special: "Working Holiday for Koreans (ages 18–25). Strong Korean demand in IT, gaming, K-content related industries. Japanese language a major plus. Visa fees rose to ¥15,000 from Jul 2026.",
        visaFee: 30,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€110 D3 fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "Digital Nomad Visa (D8) for remote workers earning €3,680+/month (2026). Tech startups hiring. Gateway to EU job market.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "H-1B employer fees ~$2,200~3,600" },
        difficulty: "moderate",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B same cap lottery, wage-weighted since FY2027. No E-3-style Korea quota. L-1 intracompany available for Samsung/LG/Hyundai employees. E-2 treaty investor visa available.",
        visaFee: 2225,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "Non-B + work permit" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Non-B visa + work permit. Korean companies (Samsung, Lotte, Hyundai) have Thai offices hiring Koreans. Teaching English also viable.",
        visaFee: 40,
        officialUrl: "https://www.doe.go.th"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 1,540 AEWV fee" },
        difficulty: "easy",
        processingDays: "Up to 5 weeks (AEWV)",
        special: "Working Holiday for Koreans aged 18–30 (NZD 770, 3,000 places/yr, 12 months): open work rights, no job needed. AEWV with an accredited employer for longer-term work.",
        visaFee: 895,
        officialUrl: "https://www.immigration.govt.nz/visas/accredited-employer-work-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 long-stay visa" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Talent card ('talent – salarié qualifié', ex-Passeport Talent) for qualified hires earning ≥ €39,582/yr. Working Holiday (PVT) for Koreans 18–30: open work rights, no job offer needed.",
        visaFee: 111,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€423 HSM permit" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "HSM permit with priority IND processing. 2026 salary threshold €5,942/month (30+), €4,357 (under 30). 30% tax ruling applies. Strong demand for Korean engineers at ASML/Philips/Shell.",
        visaFee: 475,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi 2026–2028 quotas apply to all non-EU nationals — Korean passport gives no quota advantage. Out-of-quota routes: EU Blue Card, intra-company transfer, or the digital nomad/remote worker visa (since April 2024).",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professionals permit. Digital Nomad Visa for remote workers earning ≈€2,849+/month (2026). Beckham law tax regime available. Tech sector growing in Barcelona and Madrid.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Korean companies (Samsung, Lotte) operate in Malaysia. EP salary floors from Jun 2026: RM5,000 (Cat III), RM10,000 (Cat II), RM20,000 (Cat I). DE Rantau nomad pass for remote workers.",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,590 PR fees (incl. RPRF)" },
        difficulty: "easy",
        processingDays: "180 days",
        special: "Koreans with degrees and strong English often do well in CRS, but job-offer points no longer count. Canadian work experience (CEC) is the strongest route. 3-year citizenship path after PR.",
        visaFee: 1145,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 permit fee" },
        difficulty: "moderate",
        processingDays: "21~36 months",
        special: "EU Blue Card after job offer €50,700+ (2026). Settlement permit after 27 months on Blue Card (21 with B1) or 3 years as skilled worker. Germany allows dual citizenship since 2024, but Korea generally does not for voluntary naturalisation abroad.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 6,135~6,140 visa fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "Points test 189/190/491. Koreans score well on age/education. State nomination (190) adds 5 points.",
        visaFee: 4265,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR fee" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "Discretionary, no clear points system. Koreans with EP 2yr+ and family ties have better chances. Very competitive.",
        visaFee: 78,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K Golden Visa fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa. No income tax. Large Korean expat community. Salary AED 30K+/month qualifies.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/golden-visa"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£3,226 ILR fee" },
        difficulty: "moderate",
        processingDays: "6 months",
        special: "ILR after 5yr on Skilled Worker (proposed 'earned settlement' reform would raise the standard to 10yr — not yet in force). Life in UK test. English required. Koreans have good track record.",
        visaFee: 4290,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥200,000 PR fee (from Oct 2026)" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "PR after 10yr (1–3yr with HSP 80/70 points). PR fee ¥200,000 from Oct 2026. Largest Korean diaspora in Japan ~440K. Dual citizenship not allowed.",
        visaFee: 1263,
        officialUrl: "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 permit fee" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5yr. Citizenship after 10yr (2026 nationality law). D7 Passive Income Visa (€920/month in 2026) easy entry point. Growing Korean expat scene in Lisbon.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "$1,440 Green Card fee" },
        difficulty: "moderate",
        processingDays: "3~5 years (EB-3 Korea)",
        special: "EB-2/EB-3 Green Card. Korea wait time much shorter than India (~3-5yr vs. decades). EB-1A for extraordinary ability has no backlog. Citizenship after 5yr.",
        visaFee: 1440,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "THB 50K LTR fee" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "LTR visa (10 yr, THB 50,000 fee) for wealthy pensioners and remote professionals with US$80K+ income. Thailand Privilege (ex-Elite) 5~20yr from THB 650K–900K. PR possible but quota-limited. Growing Korean expat community in Chiang Mai and Phuket.",
        visaFee: 1540,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 6,450 SMC fee" },
        difficulty: "moderate",
        processingDays: "12 months",
        special: "Skilled Migrant Category. Points-based. Koreans score well on age and qualifications. Job offer adds significant points. Clear path to NZ citizenship.",
        visaFee: 3740,
        officialUrl: "https://www.immigration.govt.nz/visas/skilled-migrant-category-resident-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€350 residence-permit tax" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Carte de Résident (10yr) after 5yr legal stay; since Jan 2026 first applications need French B1 plus a civic exam. Naturalisation after 5yr (2yr after 2 years of French higher education) requires B2. France allows dual nationality, but Korea generally does not for adults who naturalise abroad.",
        visaFee: 393,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€254 PR permit" },
        difficulty: "hard",
        processingDays: "6 months",
        special: "PR after 5yr. Dutch civic integration exam (Dutch language) required. Naturalisation generally requires renouncing Korean nationality. Integration courses/exams can cost €1,000–3,000.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "~€146 permit fees" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE after 5yr. Italian A2 required. Korean passport holders must apply for national work visa first — no shortcut via Schengen.",
        visaFee: 164,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residency after 5yr (no language test). Nationality after 10yr with DELE A2 + CCSE. Arraigo paths after 2yr presence (2025 regulation). Digital Nomad Visa is the main entry option.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MM2H (revamped 2024): Silver US$150K deposit for a 5-yr pass, Gold US$500K (15-yr), Platinum US$1M (20-yr); age 25+, property purchase required. No path to PR. Korean community strong in KL.",
        visaFee: 1100,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "eTA CAD 7" },
        difficulty: "easy",
        processingDays: "Minutes (eTA)",
        special: "Korean passport → eTA only (not full visa). Entry up to 6 months. One of easiest entries for Koreans globally.",
        visaFee: 5,
        weeklyLiving: 420,
        flightMinUSD: 720,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → visa-free Schengen access. 90 days in 180 days across 29 Schengen countries. Entry/Exit System (EES) biometric registration at the border; ETIAS not yet required.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 480,
        officialUrl: "https://www.schengenvisainfo.com"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "ETA AUD 20" },
        difficulty: "easy",
        processingDays: "Instant (ETA)",
        special: "Korean passport → ETA (Electronic Travel Authority). Instant approval online. Up to 3 months per visit, 12 months total.",
        visaFee: 14,
        weeklyLiving: 400,
        flightMinUSD: 380,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → up to 90 days visa-free (stay granted at entry). Zero hassle. Submit the free SG Arrival Card within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 130,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → free visa on arrival, up to 90 days within 180 days. No application required.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 350,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "ETA £20 required" },
        difficulty: "easy",
        processingDays: "Usually within 3 working days (ETA)",
        special: "Korean passport → visa-free visits up to 6 months, but a UK ETA (£20, valid 2yr) has been required since 8 Jan 2025.",
        visaFee: 27,
        weeklyLiving: 420,
        flightMinUSD: 550,
        officialUrl: "https://www.gov.uk/check-uk-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 90-day visa-free entry. Closest major destination. Multiple entry allowed. No application today. JESTA online pre-travel authorisation planned by end of FY2028 — not yet required.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 60,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free. Portugal entry = access to 29 Schengen countries. 90/180 day rule. EES biometric registration at border since 2026; ETIAS not yet required.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 480,
        officialUrl: "https://vistos.mne.gov.pt/en/short-stay-visas-schengen/general-information/schengen-area"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "ESTA $40 (Visa Waiver)" },
        difficulty: "easy",
        processingDays: "Minutes (ESTA online)",
        special: "Korean passport → ESTA Visa Waiver Program. 90-day visa-free entry. Apply ESTA online at least 72hr before departure.",
        visaFee: 40,
        weeklyLiving: 350,
        flightMinUSD: 800,
        officialUrl: "https://esta.cbp.dhs.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 90-day visa-free under the bilateral agreement (unchanged by Sep 2026 reform). Thailand is a top destination for Koreans. Submit the free Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 150,
        officialUrl: "https://www.thaievisa.go.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 17~23 + IVL NZD 100" },
        difficulty: "easy",
        processingDays: "Up to 72 hours (NZeTA)",
        special: "Korean passport → NZeTA (app NZD 17 / web NZD 23), valid 2 years. Up to 90 days per visit. International Visitor Levy (IVL) NZD 100 also payable.",
        visaFee: 68,
        weeklyLiving: 180,
        flightMinUSD: 700,
        officialUrl: "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free, 90/180 days across 29 Schengen countries. EU Entry/Exit System (EES) records fingerprints and a photo at first entry since April 2026; ETIAS (expected €20) is not yet required.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 520,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free 90/180 days across 29 countries. EES biometric registration at first entry (since Apr 2026). ETIAS not yet required (expected 2027).",
        visaFee: 0,
        weeklyLiving: 320,
        flightMinUSD: 500,
        officialUrl: "https://www.schengenvisainfo.com/netherlands-visa/"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free 90/180 days. Rome, Florence, Venice all accessible. EES biometric registration at first entry; ETIAS not yet in operation.",
        visaFee: 0,
        weeklyLiving: 230,
        flightMinUSD: 540,
        officialUrl: "https://vistoperitalia.esteri.it/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free 90/180 days. EES fingerprints/photo taken at first entry; ETIAS not yet in operation. Barcelona and Madrid are top Korean tourist destinations.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 560,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 90-day visa-free entry. Strong Korean community in KL. Complete the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 180,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/"
      }
    }
  },
  japan: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr" },
        difficulty: "easy",
        processingDays: "28~56 days",
        special: "SDS ended in Nov 2024 — all applicants use the regular stream. PAL/TAL required for most programs; proof of funds CAD 23,448 + tuition. PGWP up to 3 years. IEC Working Holiday (age 18–30) is an alternative for short stays.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "Public universities FREE. Blocked account €11,904/yr (€992/month) required. Strong Japan-Germany academic exchange. German or English programs available.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr + AUD 2,500 visa" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "Visa fee AUD 2,500. Genuine Student requirement applies; very high approval rates. Working Holiday (417) for under-31s. Post-study Graduate visa (485) 2~3 years.",
        visaFee: 1738,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Japanese students highly regarded at NUS/NTU (world top 20). Student Pass via ICA. Gateway to ASEAN career opportunities.",
        visaFee: 70,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Tax-free living. Strong Japan-UAE bilateral ties. Japanese university exchange programs available. Fast visa processing.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-studying-in-the-uae"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Japanese applicants have excellent UK visa approval rate. Graduate visa 2yr if applying by 31 Dec 2026, 18 months from 1 Jan 2027. IHS £776/yr. Strong Russell Group presence.",
        visaFee: 742,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "EU access from Portugal. D4 Student Visa (€110 fee). Low cost vs. UK/Australia. Growing Japanese expat community in Lisbon.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 45000, currency: "USD", label: "$35K~55K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "F-1 visa ($185 + $350 SEVIS fee). In-person interview and public social-media review required. OPT 1yr + STEM OPT 2yr after graduation. Large Japanese student community in USA.",
        visaFee: 535,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
      },
      thailand: {
        cost: { annual: 5000, currency: "USD", label: "฿120K~200K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "ED visa. Affordable education. Japanese language schools popular. Thai-Japanese cultural exchange programs common.",
        visaFee: 40,
        officialUrl: "https://www.immigration.go.th"
      },
      newzealand: {
        cost: { annual: 20000, currency: "USD", label: "NZD 20K~35K/yr" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Working Holiday for ages 18–30. Post-study work visa up to 3 years. Work up to 25 hrs/wk during study. Auckland and Canterbury popular for Japanese students.",
        visaFee: 495,
        officialUrl: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/"
      },
      france: {
        cost: { annual: 10000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "Campus France (Études en France) procedure mandatory; VLS-TS visa fee €50. Non-EU public-university tuition €2,902 (licence) / €3,950 (master) per year unless exempted. Japan-France strong cultural ties. Many Japanese students in Paris art/fashion programs.",
        visaFee: 56,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 16000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Residence permit via university (IND fee €254; Japanese need no MVV). Orientation year after graduation. English-taught programs at Delft/Leiden/Amsterdam.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "National D visa required despite Schengen-free travel for Japanese. Public universities from €900/yr. Design and fashion programs world-renowned.",
        visaFee: 57,
        officialUrl: "https://www.universitaly.it/"
      },
      spain: {
        cost: { annual: 9000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "National D student visa required for long-term study. Students may work up to 30 hr/week (2025 regulation). NIE/TIE required on arrival. Spanish language and cultural programs popular with Japanese students.",
        visaFee: 80,
        officialUrl: "https://www.studyinspain.info"
      },
      malaysia: {
        cost: { annual: 7000, currency: "USD", label: "MYR 20K~40K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Student Pass via EMGS. English-medium instruction. Growing Japanese expat community. Affordable: cheapest English-taught degree near Japan.",
        visaFee: 110,
        officialUrl: "https://educationmalaysia.gov.my"
      }
    },
    work: {
      canada: {
        cost: { annual: 3500, currency: "USD", label: "CAD 285 IEC fees + CAD 85 biometrics" },
        difficulty: "easy",
        processingDays: "56~112 days",
        special: "IEC Working Holiday for Japanese aged 18–30: open work permit, no job offer needed (fee CAD 184.75 + CAD 100). Express Entry also available.",
        visaFee: 205,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€75 visa + residence permit fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Working Holiday for Japanese aged 18–30. Opportunity Card available. EU Blue Card from €50,700 (2026). Strong demand for Japanese engineers in auto/manufacturing (VW, BMW, Siemens).",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 840 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (417) for Japanese aged 18–30. Second/third years need regional work; government plans to cap them by ballot. Skills in Demand (482) employer-sponsored visa also available.",
        visaFee: 584,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 + 225 issuance" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Japanese professionals highly sought in finance, tech, and manufacturing. EP needs SGD 5,600+/month (6,200 in finance), higher with age, rising to 6,000/6,600 from Jan 2027, plus 40 COMPASS points. Employer applies.",
        visaFee: 80,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Employer covers cost" },
        difficulty: "easy",
        processingDays: "5~10 days",
        special: "Zero income tax. Japanese firms (Toyota, Sony, Mitsubishi) hiring in Dubai. Golden Visa for high earners AED 30K+/month.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-working-in-the-uae"
      },
      uk: {
        cost: { annual: 2000, currency: "USD", label: "£819~1,618 Skilled Worker fee (YMS £340)" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Youth Mobility Scheme for Japanese aged 18–30: up to 2yr open work permit (£340). Skilled Worker visa requires sponsor + £41,700+/yr. Strong Japan-UK bilateral relationship.",
        visaFee: 1089,
        officialUrl: "https://www.gov.uk/youth-mobility"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€110 D3 fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "D3 Highly Qualified visa. Digital Nomad Visa (D8, €3,680+/month in 2026) popular for Japanese remote workers. EU gateway. Growing Japanese startup scene in Lisbon.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "H-1B employer fees ~$2,200~3,600" },
        difficulty: "hard",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B cap lottery, wage-weighted since FY2027. Japan has no bilateral E-3 equivalent. L-1 intracompany transfer available for Toyota/Sony/Honda employees. E-2 treaty investor visa available.",
        visaFee: 2225,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "Non-B + work permit" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Non-B visa + work permit. Japanese companies (Toyota, Honda, Nissan, Canon) are largest foreign employers in Thailand. Easy placement for Japanese speakers.",
        visaFee: 40,
        officialUrl: "https://www.doe.go.th"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 1,540 AEWV fee" },
        difficulty: "easy",
        processingDays: "Up to 5 weeks (AEWV)",
        special: "Working Holiday for Japanese aged 18–30 (NZD 770, 12 months): open work rights, no job offer needed. AEWV with an accredited employer for longer-term roles.",
        visaFee: 895,
        officialUrl: "https://www.immigration.govt.nz/visas/accredited-employer-work-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 long-stay visa" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Talent card ('talent – salarié qualifié', ex-Passeport Talent) for qualified hires earning ≥ €39,582/yr. Working Holiday (PVT) for Japanese 18–30: open work rights. Strong demand in luxury/fashion.",
        visaFee: 111,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€423 HSM permit" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "HSM permit with priority IND processing. 2026 salary threshold €5,942/month (30+), €4,357 (under 30). 30% tax ruling for expats. Strong demand for Japanese engineers at ASML/Philips.",
        visaFee: 475,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi 2026–2028 quotas are limited and oversubscribed. EU Blue Card (outside quotas; salary per collective agreement) or digital nomad visa (since April 2024) are alternatives. Niche demand in fashion/design/automotive.",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professionals permit. Digital Nomad Visa (since 2023) for remote workers earning ≈€2,849+/month (2026). Beckham law tax regime available. Barcelona tech scene growing.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Japanese firms (Toyota, Daikin, Panasonic) are major employers in Malaysia. EP salary floors from Jun 2026: RM5,000 (Cat III), RM10,000 (Cat II), RM20,000 (Cat I).",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,590 PR fees (incl. RPRF)" },
        difficulty: "easy",
        processingDays: "180 days",
        special: "Express Entry. Japanese score very well on CRS due to education/language. Clear 3-year citizenship path after PR. Dual citizenship allowed.",
        visaFee: 1145,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 permit fee" },
        difficulty: "moderate",
        processingDays: "21~36 months",
        special: "EU Blue Card after job offer €50,700+ (2026). Settlement permit after 27 months on Blue Card (21 with B1) or 3 years as skilled worker. Germany allows dual citizenship since 2024, but Japan does not — naturalising means losing Japanese nationality.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently-in-germany"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 6,135~6,140 visa fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "Points-based 189/190/491. Japanese score well on age and education. Working Holiday → skilled visa → PR pathway popular. State nomination (190) helps.",
        visaFee: 4265,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR fee" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "Discretionary PR. No points system. Japanese with EP 2yr+ and Singapore ties have better chances. Very competitive — acceptance rate under 50%.",
        visaFee: 78,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K Golden Visa fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa. No income tax. Salary AED 30K+/month qualifies. Japanese professionals in finance and engineering qualify easily.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/golden-visa"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£3,226 ILR fee" },
        difficulty: "easy",
        processingDays: "6 months",
        special: "ILR after 5yr on Skilled Worker (proposed 'earned settlement' reform would raise the standard to 10yr — not yet in force). Life in UK test. English required. Japanese applicants have high approval rate. Dual citizenship with Japan requires renouncing Japanese.",
        visaFee: 4290,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 permit fee" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5yr. Citizenship after 10yr (2026 nationality law). D7/D8 visa entry points popular with Japanese digital nomads. Growing Japanese expat community in Lisbon.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "$1,440 Green Card fee" },
        difficulty: "moderate",
        processingDays: "3~5 years (EB for Japan)",
        special: "EB-2/EB-3 Green Card. Japan wait time much shorter than India (~3-5yr). EB-1A (extraordinary ability) no backlog. E-2 treaty investor visa also available.",
        visaFee: 1440,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "THB 50K LTR fee" },
        difficulty: "hard",
        processingDays: "30 days",
        special: "LTR visa (10 yr, THB 50,000 fee) for wealthy pensioners and remote professionals with US$80K+ income. Thailand Privilege (ex-Elite) 5~20yr from THB 650K–900K. PR possible but quota-limited. Large Japanese retiree community in Chiang Mai.",
        visaFee: 1540,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 6,450 SMC fee" },
        difficulty: "moderate",
        processingDays: "12 months",
        special: "Skilled Migrant Category. Points-based. Japanese score well on age and qualifications. Job offer adds significant points. Clear path to NZ citizenship.",
        visaFee: 3740,
        officialUrl: "https://www.immigration.govt.nz/visas/skilled-migrant-category-resident-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€350 residence-permit tax" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Carte de Résident (10yr) after 5yr legal stay; since Jan 2026 first applications need French B1 plus a civic exam. Naturalisation after 5yr (2yr after 2 years of French higher education) requires B2. France allows dual nationality, but Japan does not — naturalising means losing Japanese nationality.",
        visaFee: 393,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€254 PR permit" },
        difficulty: "easy",
        processingDays: "6 months",
        special: "PR after 5yr. Dutch civic integration exam required. 30% tax ruling for first 5yr. Strong expat infrastructure. Naturalisation generally requires renouncing Japanese nationality.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "~€146 permit fees" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE after 5yr. Italian A2 required. Citizenship after 10yr (B1 Italian), but Japan does not allow dual nationality. Japanese community in Milan and Rome.",
        visaFee: 164,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residency after 5yr (no language test). Nationality after 10yr with DELE A2 + CCSE. Digital Nomad Visa is an easy entry point for remote-working Japanese.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MM2H (revamped 2024): Silver US$150K deposit for a 5-yr pass, Gold US$500K (15-yr), Platinum US$1M (20-yr); age 25+, property purchase required. Popular with Japanese retirees. No path to PR.",
        visaFee: 1100,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "eTA CAD 7" },
        difficulty: "easy",
        processingDays: "Minutes (eTA)",
        special: "Japanese passport → eTA only. Entry up to 6 months. Visa Waiver Agreement between Japan and Canada. Most hassle-free entry globally.",
        visaFee: 5,
        weeklyLiving: 420,
        flightMinUSD: 800,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → visa-free Schengen. 90 days in 180 days across 29 Schengen countries. EES biometric registration at the border; ETIAS not yet required. Japan top Schengen tourism source.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/germany-visa/"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "ETA AUD 20" },
        difficulty: "easy",
        processingDays: "Instant (ETA)",
        special: "Japanese passport → ETA (Electronic Travel Authority). Instant approval online. Up to 3 months per visit, 12 months total.",
        visaFee: 14,
        weeklyLiving: 400,
        flightMinUSD: 350,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 30-day visa-free Singapore. Popular stop for Japanese traveling to Southeast Asia. Submit the free SG Arrival Card within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 80,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → free multiple-entry visa on arrival valid 180 days, up to 90 days total stay (since Oct 2024). Dubai popular with Japanese tourists for luxury shopping and desert experiences.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 300,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "ETA £20 required" },
        difficulty: "easy",
        processingDays: "Usually within 3 working days (ETA)",
        special: "Japanese passport → visa-free UK visits up to 6 months. London is top European destination for Japanese tourists. UK ETA (£20) required since 8 Jan 2025.",
        visaFee: 27,
        weeklyLiving: 420,
        flightMinUSD: 700,
        officialUrl: "https://www.gov.uk/check-uk-visa"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free. Portugal entry = 29-country Schengen access. 90/180 day rule. EES biometric registration at border since 2026; ETIAS not yet required.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 700,
        officialUrl: "https://vistos.mne.gov.pt/en/short-stay-visas-schengen/general-information/schengen-area"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "ESTA $40 (Visa Waiver)" },
        difficulty: "easy",
        processingDays: "Minutes (ESTA online)",
        special: "Japanese passport → ESTA Visa Waiver. 90-day visa-free entry. USA is top long-haul destination for Japanese. Apply ESTA 72hr before departure.",
        visaFee: 40,
        weeklyLiving: 350,
        flightMinUSD: 700,
        officialUrl: "https://esta.cbp.dhs.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 30-day visa-free (tourism only) since 15 Sep 2026, when the 60-day scheme ended. Extendable once by up to 30 days. Submit the free Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 80,
        officialUrl: "https://www.thaievisa.go.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 17~23 + IVL NZD 100" },
        difficulty: "easy",
        processingDays: "Up to 72 hours (NZeTA)",
        special: "Japanese passport → NZeTA (app NZD 17 / web NZD 23). Up to 90 days per visit. IVL tourism levy NZD 100 also required. New Zealand very popular with Japanese travelers.",
        visaFee: 68,
        weeklyLiving: 180,
        flightMinUSD: 650,
        officialUrl: "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free, 90/180 days across 29 Schengen countries. Paris is the #1 European destination for Japanese tourists. EU Entry/Exit System (EES) records fingerprints and a photo at first entry since April 2026; ETIAS (expected €20) is not yet required.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free 90/180 days. EES biometric registration at first entry; ETIAS not yet required (expected 2027). Van Gogh, Vermeer — strong Netherlands-Japan art history connection.",
        visaFee: 0,
        weeklyLiving: 320,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/netherlands-visa/"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free 90/180 days. Italy is a top European destination for Japanese tourists. EES biometric registration at first entry; ETIAS not yet in operation.",
        visaFee: 0,
        weeklyLiving: 230,
        flightMinUSD: 700,
        officialUrl: "https://vistoperitalia.esteri.it/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free 90/180 days. EES biometric registration at first entry; ETIAS not yet in operation. Barcelona and Madrid popular; Gaudí and tapas culture appeal strongly to Japanese travelers.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 90-day visa-free Malaysia. Japanese community in KL growing fast. Complete the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 80,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/"
      }
    }
  },
  hongkong: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr" },
        difficulty: "easy",
        processingDays: "28~56 days",
        special: "SDS ended Nov 2024; regular stream with PAL/TAL for most programs. Proof of funds CAD 23,448 + tuition. PGWP up to 3 years. The HK Pathway PR streams closed to new applications on 31 Aug 2026.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "Public universities FREE. Blocked account €11,904/yr (€992/month) required. Strong HK-Germany academic ties. English-medium programs widely available.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr + AUD 2,500 visa" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "Visa fee AUD 2,500. Genuine Student requirement applies. Post-study Graduate visa (485) 2~3 years, with dedicated Hong Kong streams of the 189/191 PR visas for eligible graduates.",
        visaFee: 1738,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Many HK students choose Singapore as alternative financial hub base. NUS/NTU world top 20. Cantonese spoken in some communities. Strong APAC career launch.",
        visaFee: 70,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Tax-free living. Fast visa processing. International universities in UAE. HK finance professionals use UAE as stepping stone.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-studying-in-the-uae"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "UK is top HK emigration destination. BN(O) holders get streamlined entry. Graduate visa 2yr if applying by 31 Dec 2026, 18 months from 1 Jan 2027. IHS £776/yr. Strong HK-UK historical ties.",
        visaFee: 742,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "easy",
        processingDays: "3~5 days (after CoE)",
        special: "CoE issued by school takes 1~3 months. Many HK students choose Japan for anime/culture. N2 Japanese preferred at top schools. Visa fee ¥15,000 single-entry from Jul 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "EU access from Portugal. D4 visa (€110 fee). Growing HK expat community in Lisbon. Low cost vs. UK. Strong internet for online work.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 45000, currency: "USD", label: "$35K~55K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "F-1 visa ($185 + $350 SEVIS fee). In-person interview and public social-media review required. OPT 1yr + STEM OPT 2yr after graduation. Large HK student community in USA (Harvard, MIT, Caltech).",
        visaFee: 535,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
      },
      thailand: {
        cost: { annual: 5000, currency: "USD", label: "฿120K~200K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "ED visa. Affordable education. Thailand popular with HK residents for lifestyle. English-medium programs available in Bangkok.",
        visaFee: 40,
        officialUrl: "https://www.immigration.go.th"
      },
      newzealand: {
        cost: { annual: 20000, currency: "USD", label: "NZD 20K~35K/yr" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Post-study work visa up to 3 years. Working Holiday for ages 18–30 (400 places/yr). Work up to 25 hrs/wk during study. Auckland popular with HK families emigrating.",
        visaFee: 495,
        officialUrl: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/"
      },
      france: {
        cost: { annual: 10000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "Campus France (Études en France) procedure mandatory; VLS-TS visa fee €50. Non-EU public-university tuition €2,902 (licence) / €3,950 (master) per year unless exempted. English-taught master's widely available. Fashion/art programs popular.",
        visaFee: 56,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 16000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MVV + residence permit (IND fee €254). Orientation year post-graduation. English-taught programs at Delft/Rotterdam/Amsterdam. Growing HK expat base in Amsterdam.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "National D visa required despite Schengen-free travel. Public universities from €900/yr. Architecture and design programs world-class.",
        visaFee: 57,
        officialUrl: "https://www.universitaly.it/"
      },
      spain: {
        cost: { annual: 9000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "National D student visa for long-term study. Students may work up to 30 hr/week (2025 regulation). NIE/TIE required on arrival. Barcelona popular lifestyle destination for HK students seeking EU base.",
        visaFee: 80,
        officialUrl: "https://www.studyinspain.info"
      },
      malaysia: {
        cost: { annual: 7000, currency: "USD", label: "MYR 20K~40K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Student Pass via EMGS. English-medium. Cantonese widely spoken in KL (Petaling Street). Familiar food and culture. Cheapest option near HK.",
        visaFee: 110,
        officialUrl: "https://educationmalaysia.gov.my"
      }
    },
    work: {
      canada: {
        cost: { annual: 3500, currency: "USD", label: "CAD 285 IEC fees + CAD 85 biometrics" },
        difficulty: "easy",
        processingDays: "56~112 days",
        special: "IEC Working Holiday (age 18–30). The HK Pathway PR streams closed to new applicants on 31 Aug 2026; the special open work permit now mainly serves people with pending HK-pathway PR files. Express Entry for PR.",
        visaFee: 205,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€75 visa + residence permit fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Opportunity Card and EU Blue Card (€50,700+, 2026) available. Working Holiday for HK residents aged 18–30. Strong financial and engineering demand. Fintech sector growing.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 840 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (417) for HK passport holders aged 18–30. Skills in Demand (482) employer-sponsored visa. HK finance professionals sought in Sydney.",
        visaFee: 584,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 + 225 issuance" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "HK finance professionals highly sought in Singapore. EP needs SGD 5,600+/month (6,200 in finance), higher with age, rising to 6,000/6,600 from Jan 2027, plus 40 COMPASS points. ONE Pass for top earners (S$30K+/month).",
        visaFee: 80,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Employer covers cost" },
        difficulty: "easy",
        processingDays: "5~10 days",
        special: "Zero income tax. HK finance and real estate professionals in demand in Dubai. Golden Visa for high earners. Large HK expat community in Dubai.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-working-in-the-uae"
      },
      uk: {
        cost: { annual: 2000, currency: "USD", label: "BN(O) visa £206~285 + IHS £1,035/yr" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "BN(O) holders: 5yr UK residency pathway → ILR → citizenship (visa £206/2.5yr or £285/5yr + IHS). HKSAR passport holders can enter the Youth Mobility ballot. Skilled Worker visa available (£41,700+ salary).",
        visaFee: 379,
        officialUrl: "https://www.gov.uk/british-national-overseas-bno-visa"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥15,000 visa fee" },
        difficulty: "moderate",
        processingDays: "5~10 days",
        special: "Engineer/Specialist or HSP (Highly Skilled Professional) visa. Japanese N2+ preferred. Finance sector in Tokyo welcomes HK talent. Visa ¥15,000 from Jul 2026; renewals ¥10,000–75,000 from Oct 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€110 D3 fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "D3 Highly Qualified visa. Digital Nomad Visa (D8, €3,680+/month in 2026) for remote workers. EU gateway. Growing HK expat community in Lisbon.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "H-1B employer fees ~$2,200~3,600" },
        difficulty: "hard",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B cap lottery, wage-weighted since FY2027. L-1 intracompany transfer available for HK-based multinational employees. Finance sector has OPT→H-1B pipeline.",
        visaFee: 2225,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "Non-B + work permit" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Non-B visa + work permit. HK companies operate regional offices in Bangkok. Finance and hospitality sectors welcome HK professionals. Cantonese widely understood.",
        visaFee: 40,
        officialUrl: "https://www.doe.go.th"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 1,540 AEWV fee" },
        difficulty: "easy",
        processingDays: "Up to 5 weeks (AEWV)",
        special: "AEWV with an accredited employer. Working Holiday for HK residents aged 18–30 (400 places/yr). Finance and tech sectors growing in Auckland.",
        visaFee: 895,
        officialUrl: "https://www.immigration.govt.nz/visas/accredited-employer-work-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 long-stay visa" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Talent card ('talent – salarié qualifié', ex-Passeport Talent) for qualified hires earning ≥ €39,582/yr; EU Blue Card from €59,373. PVT working holiday for HK residents 18–30. Finance and luxury sectors in Paris.",
        visaFee: 111,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€423 HSM permit" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "HSM permit with priority IND processing. 2026 salary threshold €5,942/month (30+), €4,357 (under 30). 30% tax ruling. Strong financial sector in Amsterdam.",
        visaFee: 475,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi 2026–2028 quota system; EU Blue Card and digital nomad visa (since April 2024) sit outside quotas. Luxury goods and fashion industry has niche demand for HK professionals with China market expertise.",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professionals permit. Digital Nomad Visa for remote workers earning ≈€2,849+/month (2026). Barcelona tech and hospitality sectors welcome HK talent.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "HK companies have KL offices; Cantonese widely spoken. EP salary floors from Jun 2026: RM5,000 (Cat III), RM10,000 (Cat II), RM20,000 (Cat I). DE Rantau nomad pass for remote workers.",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,590 PR fees (incl. RPRF)" },
        difficulty: "easy",
        processingDays: "180 days",
        special: "The HK Pathway PR streams (A and B) closed to new applications on 31 Aug 2026; pending files are still processed. New applicants now use Express Entry or PNPs. Large HK communities in Vancouver and Toronto.",
        visaFee: 1145,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/hong-kong-residents-permanent-residence.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 permit fee" },
        difficulty: "moderate",
        processingDays: "21~36 months",
        special: "EU Blue Card after job offer €50,700+ (2026). Settlement permit after 27 months on Blue Card (21 with B1) or 3 years as skilled worker. Germany allows dual citizenship since 2024; citizenship after 5 years. Strong HK-Germany financial ties.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently-in-germany"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 6,135~6,140 visa fee" },
        difficulty: "easy",
        processingDays: "12~24 months",
        special: "Dedicated Hong Kong streams of the 189 and 191 visas for eligible HK passport holders already in Australia. Otherwise points-based 189/190/491. Strong HK community in Sydney and Melbourne.",
        visaFee: 4265,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR fee" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "PR highly competitive despite HK influx post-2020. Discretionary assessment. EP 2yr+ with strong SG economic ties increases chances. Very competitive — under 50% acceptance.",
        visaFee: 78,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K Golden Visa fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa. No income tax. Salary AED 30K+/month qualifies. UAE popular with HK real estate investors and finance professionals fleeing taxation concerns.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/golden-visa"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£3,226 ILR fee" },
        difficulty: "easy",
        processingDays: "5 years (BN(O) pathway)",
        special: "BN(O) Pathway: 5yr residency → ILR → British citizenship. UK has accepted over 200,000 HK residents since 2021. Easiest formal emigration route globally for HK residents.",
        visaFee: 4290,
        officialUrl: "https://www.gov.uk/british-national-overseas-bno-visa"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥200,000 PR fee (from Oct 2026)" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "PR after 10yr (1–3yr with HSP 80/70 points). PR fee ¥200,000 from Oct 2026; strict tax/insurance compliance checks. Naturalization requires giving up other nationality. Small but growing HK community in Tokyo.",
        visaFee: 1263,
        officialUrl: "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 permit fee" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5yr. Citizenship after 10yr (2026 nationality law). D7 Passive Income / D8 Digital Nomad visas are entry points popular with HK professionals. Growing HK expat community in Lisbon and Porto.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "$1,440 Green Card fee" },
        difficulty: "moderate",
        processingDays: "3~5 years (EB for HK)",
        special: "EB-2/EB-3 Green Card. Hong Kong is charged separately from mainland China, so waits are far shorter than India/China. EB-1A for extraordinary ability. Citizenship after 5yr.",
        visaFee: 1440,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "THB 50K LTR fee" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "LTR visa (10 yr, THB 50,000 fee) for wealthy pensioners and remote professionals with US$80K+ income. Thailand Privilege (ex-Elite) 5~20yr from THB 650K–900K. PR possible but quota-limited. Privilege visa popular with HK retirees.",
        visaFee: 1540,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 6,450 SMC fee" },
        difficulty: "moderate",
        processingDays: "12 months",
        special: "Skilled Migrant Category. HK professionals score well on qualifications. Auckland has large Cantonese-speaking community. NZ popular family emigration destination from HK.",
        visaFee: 3740,
        officialUrl: "https://www.immigration.govt.nz/visas/skilled-migrant-category-resident-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€350 residence-permit tax" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Carte de Résident (10yr) after 5yr legal stay; since Jan 2026 first applications need French B1 plus a civic exam. Naturalisation after 5yr (2yr after 2 years of French higher education) requires B2. France allows dual nationality, but Chinese nationality law (applied in HK) does not recognise it.",
        visaFee: 393,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€254 PR permit" },
        difficulty: "easy",
        processingDays: "6 months",
        special: "PR after 5yr. Dutch civic integration exam. 30% tax ruling first 5yr. Amsterdam financial sector actively recruits HK finance professionals.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "~€146 permit fees" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE after 5yr. Italian A2 required. Less common HK destination but EU citizenship path is the main draw.",
        visaFee: 164,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residency after 5yr (no language test). Nationality after 10yr with DELE A2 + CCSE; prior nationality must be renounced. Digital Nomad Visa popular entry point for HK remote professionals.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MM2H (revamped 2024): Silver US$150K deposit for a 5-yr pass, Gold US$500K (15-yr), Platinum US$1M (20-yr); age 25+, property purchase required. Cantonese widely spoken in KL, 3hr flight from HK.",
        visaFee: 1100,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "eTA CAD 7" },
        difficulty: "easy",
        processingDays: "Minutes (eTA)",
        special: "HKSAR passport → eTA. Entry up to 6 months. Canada has large HK diaspora — many HK travelers have family/friends in Vancouver and Toronto.",
        visaFee: 5,
        weeklyLiving: 420,
        flightMinUSD: 820,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. 90 days in 180 days across 29 Schengen countries. EES biometric registration at the border; ETIAS not yet required. Germany popular with HK tourists for engineering culture and Christmas markets.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 680,
        officialUrl: "https://www.schengenvisainfo.com/germany-visa/"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "ETA AUD 20" },
        difficulty: "easy",
        processingDays: "Instant (ETA)",
        special: "HKSAR passport → ETA instant approval. Australia is top long-haul destination for HK residents. Large HK diaspora in Sydney and Melbourne makes it feel like home.",
        visaFee: 14,
        weeklyLiving: 400,
        flightMinUSD: 280,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 30-day visa-free Singapore. #1 short-haul destination from HK. 3.5hr direct flight. Submit the free SG Arrival Card within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 40,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 30-day visa-free UAE. Dubai popular with HK tourists for luxury shopping, gold souk, and desert experiences. Strong airline connections via Cathay Pacific.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 580,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "ETA £20 required (HKSAR)" },
        difficulty: "easy",
        processingDays: "Usually within 3 working days (ETA)",
        special: "HKSAR passport → visa-free UK visits up to 6 months with a UK ETA (£20, required since 8 Jan 2025). BN(O) passport holders are British nationals and need no ETA; BN(O) visa allows 5yr stay. London is top city for HK travelers.",
        visaFee: 27,
        weeklyLiving: 420,
        flightMinUSD: 700,
        officialUrl: "https://www.gov.uk/check-uk-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 90-day visa-free Japan. Japan is consistently #1 overseas destination for HK residents. 3.5hr direct flight. JESTA online pre-travel authorisation planned by end of FY2028 — not yet required.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 50,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. Portugal entry = 29-country Schengen access. EES biometric registration at border since 2026; ETIAS not yet required. Lisbon popular with HK digital nomads and retirees.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 680,
        officialUrl: "https://vistos.mne.gov.pt/en/short-stay-visas-schengen/general-information/schengen-area"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "B-2 tourist visa $185" },
        difficulty: "moderate",
        processingDays: "Interview wait varies; issuance a few days after interview",
        special: "HKSAR (and BN(O)) passports are NOT in the Visa Waiver Program — a B-1/B-2 visa with in-person interview is required. USA popular with HK travelers for family visits (large HK diaspora in San Francisco, New York).",
        visaFee: 185,
        weeklyLiving: 350,
        flightMinUSD: 700,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 30-day visa-free under bilateral arrangement. 2.5hr direct flight. Cantonese widely understood in tourist areas. Submit the free Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 60,
        officialUrl: "https://www.thaievisa.go.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 17~23 + IVL NZD 100" },
        difficulty: "easy",
        processingDays: "Up to 72 hours (NZeTA)",
        special: "HKSAR passport → NZeTA (app NZD 17 / web NZD 23) plus NZD 100 IVL. Up to 90 days per visit. Auckland and Queenstown popular with HK travelers.",
        visaFee: 68,
        weeklyLiving: 180,
        flightMinUSD: 700,
        officialUrl: "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free, 90/180 days across 29 Schengen countries. Paris beloved by HK tourists. Direct Cathay Pacific flights. EU Entry/Exit System (EES) records fingerprints and a photo at first entry since April 2026; ETIAS (expected €20) is not yet required.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 680,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free 90/180 days. EES biometric registration at first entry; ETIAS not yet required (expected 2027). Direct Cathay Pacific service available.",
        visaFee: 0,
        weeklyLiving: 320,
        flightMinUSD: 680,
        officialUrl: "https://www.schengenvisainfo.com/netherlands-visa/"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. Italy is top European cultural destination for HK tourists. Rome, Amalfi Coast, Venice, and Milan all popular stops.",
        visaFee: 0,
        weeklyLiving: 230,
        flightMinUSD: 680,
        officialUrl: "https://vistoperitalia.esteri.it/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free 90/180 days. EES biometric registration at first entry; ETIAS not yet in operation. Gaudí architecture and tapas culture resonate with HK food-centric travelers.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 680,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 30-day visa-free Malaysia. Cantonese widely spoken in KL. 3hr direct flight. Complete the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 35,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/"
      }
    }
  },
  usa: {
    study: {
      canada: {
        cost: { annual: 30000, currency: "USD", label: "CAD 30K~45K/yr" },
        difficulty: "easy",
        processingDays: "8~12 weeks",
        special: "Americans can apply at a port of entry. Proof of funds (CAD 23,448 + tuition) applies to all applicants; PAL/TAL needed for most undergrad/college programs (master's/PhD at public schools exempt from 2026). PGWP up to 3 years.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "German student visa required (US citizens may also apply for the residence permit after arrival). Public universities nearly free (€170-350/semester). Blocked account €11,904/yr. DAAD scholarships available for Americans.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr + AUD 2,500 visa" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Student visa 500 (AUD 2,500). Genuine Student requirement replaced GTE. 48 hrs/fortnight work during term. Post-study Graduate visa (485) 2~3 years.",
        visaFee: 1738,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Student Pass via ICA. NUS and NTU attract many American students. Strong English instruction. Excellent APAC job placement for graduates.",
        visaFee: 70,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "MBZUAI and Khalifa University attract international students. Visa linked to enrollment. Strong scholarships. Tax-free living.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-studying-in-the-uae"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Student visa for Americans same as other nationalities. IHS fee £776/yr. Graduate visa 2yr if applying by 31 Dec 2026, 18 months from 1 Jan 2027. Oxford, LSE, Imperial popular choices.",
        visaFee: 742,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "moderate",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "CoE from school takes ~3 months. English-taught programs expanding at Waseda, Keio. Visa fee ¥15,000 single-entry from Jul 2026. JET Programme also available after graduation.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "D4 Student Visa (€110 fee). Public universities €700-1,500/yr. Student residence counts toward PR. Popular with American students for affordability and lifestyle.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      thailand: {
        cost: { annual: 5000, currency: "USD", label: "฿120K~200K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "ED (Education) visa. Many English-taught programs at MUIC and Mahidol International. Low cost of living. Popular with American students.",
        visaFee: 40,
        officialUrl: "https://www.immigration.go.th"
      },
      newzealand: {
        cost: { annual: 25000, currency: "USD", label: "NZD 25K~40K/yr" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Post-study work visa up to 3 years. Part-time work up to 25 hrs/wk during study. Auckland and Otago University popular with American students.",
        visaFee: 495,
        officialUrl: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/"
      },
      france: {
        cost: { annual: 12000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Campus France (Études en France) procedure mandatory; VLS-TS visa fee €50. Non-EU public-university tuition €2,902 (licence) / €3,950 (master) per year unless exempted. Paris and Lyon top choices. French language helpful.",
        visaFee: 56,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 18000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Residence permit via university (IND fee €254; Americans need no MVV). Orientation year after graduation. TU Delft, Leiden, UvA popular with Americans. English-taught programs widely available.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "easy",
        processingDays: "15~30 days",
        special: "Type D national visa. Public universities €900~4,000/yr. Politecnico di Milano top ranked. Many Americans study art and design in Florence.",
        visaFee: 57,
        officialUrl: "https://www.universitaly.it/"
      },
      spain: {
        cost: { annual: 10000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15~30 days",
        special: "National D student visa. Public universities from €800/yr. Students may work up to 30 hr/week (2025 regulation). NIE/TIE required. Barcelona and Madrid top choices for American students abroad.",
        visaFee: 80,
        officialUrl: "https://www.studyinspain.info"
      },
      malaysia: {
        cost: { annual: 8000, currency: "USD", label: "MYR 25K~45K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Student Pass via EMGS. Low cost vs. Western universities. UTM and UM ranked top in Southeast Asia. English-medium instruction.",
        visaFee: 110,
        officialUrl: "https://educationmalaysia.gov.my"
      }
    },
    work: {
      canada: {
        cost: { annual: 3000, currency: "USD", label: "CAD 155 work permit" },
        difficulty: "easy",
        processingDays: "3~7 days (CUSMA)",
        special: "CUSMA (USMCA) covers 60+ professions — no LMIA needed. Present qualifications at port of entry. 1-year permit, renewable. Express Entry also available.",
        visaFee: 112,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/cusma.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€75 visa + residence permit fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "EU Blue Card for salary €50,700+ (€45,934 for shortage occupations, 2026). Opportunity Card for job seekers. US citizens can enter visa-free and apply for the work permit in Germany.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 4640, currency: "USD", label: "AUD 4,015 visa fee" },
        difficulty: "moderate",
        processingDays: "60~90 days",
        special: "Skills in Demand (482) visa needs an employer sponsor. Americans aged 18–30 can use the Work and Holiday visa (462). Points-tested skilled migration via 189/190.",
        visaFee: 2791,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skills-in-demand-visa-subclass-482"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 + 225 issuance" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "American professionals competitive in finance, tech, consulting. EP needs SGD 5,600+/month (6,200 in finance), higher with age, rising to 6,000/6,600 from Jan 2027, plus 40 COMPASS points. Employer applies via myMOM.",
        visaFee: 80,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 500~2,000 fees" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "Employer-sponsored work visa easy for Americans. Golden Visa (10yr) for salary AED 30K+/month. Tax-free income. Dubai and Abu Dhabi welcome US professionals.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-working-in-the-uae"
      },
      uk: {
        cost: { annual: 1500, currency: "USD", label: "£819~1,618 visa fee" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Skilled Worker visa. Certificate of Sponsorship from UK employer required. Degree-level job, salary threshold £41,700+ (or going rate), English B2. Americans competitive in finance, law, and tech sectors.",
        visaFee: 1089,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 2000, currency: "USD", label: "¥15,000 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Engineer/Specialist in Humanities visa. JET Programme entry available. HSP fast-track for highly skilled. Digital nomad stay (6 months, ¥10M+ income) open to Americans. Visa ¥15,000 from Jul 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
      },
      portugal: {
        cost: { annual: 2000, currency: "USD", label: "€110 visa + AIMA permit fee" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "D3 Highly Qualified or D8 Digital Nomad Visa (income €3,680+/month in 2026). Popular destination for American remote workers. Lisbon startup scene growing rapidly.",
        visaFee: 124,
        officialUrl: "https://aima.gov.pt/en"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "฿2,000 Non-B + permit" },
        difficulty: "moderate",
        processingDays: "3~4 weeks",
        special: "Non-Immigrant B visa + Work Permit required. BOI company sponsorship helps. LTR (Long-Term Resident) Visa for high-income remote workers.",
        visaFee: 80,
        officialUrl: "https://www.doe.go.th"
      },
      newzealand: {
        cost: { annual: 700, currency: "USD", label: "NZD 1,540 AEWV fee" },
        difficulty: "easy",
        processingDays: "Up to 5 weeks (80%)",
        special: "Accredited Employer Work Visa (AEWV). Americans in demand for tech and finance. Skilled Migrant PR pathway available. English-speaking environment.",
        visaFee: 895,
        officialUrl: "https://www.immigration.govt.nz/visas/accredited-employer-work-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 long-stay visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Talent card ('talent – salarié qualifié', ex-Passeport Talent) for Master's-level hires earning ≥ €39,582/yr, or EU Blue Card from €59,373. Otherwise an employer-sponsored 'salarié' permit. Many tech roles English-only.",
        visaFee: 111,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/F16922"
      },
      netherlands: {
        cost: { annual: 1500, currency: "USD", label: "€423 HSM permit" },
        difficulty: "easy",
        processingDays: "30~45 days",
        special: "Highly Skilled Migrant permit: €5,942+/month (30+) in 2026. DAFT treaty lets Americans self-employ with €4,500 capital. ASML, Booking.com, Philips hire Americans. 30% tax ruling (27% from 2027 for newer arrivals).",
        visaFee: 475,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 1500, currency: "USD", label: "€116 visa fee" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Most Americans use out-of-quota routes: EU Blue Card, intra-company transfer, or the digital nomad/remote worker visa (since April 2024; income roughly €25,000–28,000+/yr). Decreto Flussi 2026–2028 quotas otherwise apply. Permesso di soggiorno required.",
        visaFee: 116,
        officialUrl: "https://www.lavoro.gov.it/en"
      },
      spain: {
        cost: { annual: 1500, currency: "USD", label: "€80~200 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Digital Nomad Visa for remote workers (income ≈€2,849+/month in 2026). Highly Qualified Professionals visa. Beckham law 24% flat tax. Growing US expat scene in Barcelona and Madrid.",
        visaFee: 80,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/nómadas-digitales"
      },
      malaysia: {
        cost: { annual: 1000, currency: "USD", label: "MYR 1,500 EP fee" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "Many MNCs hire Americans for KL offices. EP salary floors from Jun 2026: RM5,000 (Cat III), RM10,000 (Cat II), RM20,000 (Cat I). DE Rantau nomad pass (US$24K+ income) for remote workers.",
        visaFee: 330,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 1,590 PR fees (+ CAD 270/child)" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Express Entry: native English helps CRS; job-offer points removed since Mar 2025, so Canadian experience (CEC, e.g. after CUSMA work) is the strongest route. CEC cut-offs ran ~515–525 in 2026.",
        visaFee: 1145,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "€120~500 permit fees" },
        difficulty: "easy",
        processingDays: "3~6 months",
        special: "Niederlassungserlaubnis after 3 years as a skilled worker (5 years general rule). EU Blue Card holders eligible after 27 months (21 with B1 German). Citizenship after 5 years with dual citizenship allowed since 2024.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/settlement-permit"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "AUD 6,135~6,140 visa fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "Points-based 189/190 Skilled Migration. Americans score high: English, education. State nomination (190) adds 5 points. Strong US-Australia bilateral ties.",
        visaFee: 4265,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Varies" },
        difficulty: "hard",
        processingDays: "2~5 years",
        special: "PR application highly discretionary. Americans have good standing but must demonstrate strong economic ties, long-term employment, and community integration.",
        visaFee: 78,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "AED 2,800~10,000" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Golden Visa (10yr): salary AED 30K+/month, $545K property investment, or exceptional talent. No citizenship path but secure long-term residence.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/golden-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "£3,226 ILR fee" },
        difficulty: "moderate",
        processingDays: "5 years",
        special: "ILR after 5yr on Skilled Worker (proposed 'earned settlement' reform would raise the standard to 10yr — not yet in force). English and Life in UK test required.",
        visaFee: 4290,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "¥200,000 application fee (from Oct 2026)" },
        difficulty: "hard",
        processingDays: "10 years (or 1~3 via HSP)",
        special: "Standard PR requires 10yr continuous residence. HSP fast-track: PR after 3yr with 70+ points or 1yr with 80+. PR fee ¥200,000 from Oct 2026. Americans score well on HSP language points.",
        visaFee: 1263,
        officialUrl: "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "€320+ residence fee" },
        difficulty: "easy",
        processingDays: "5 years → PR",
        special: "D7/D8/D3 visa → 5yr residency → Permanent Residence (A2 Portuguese). Citizenship now 10 years (since May 2026). Golden Visa via €500K funds — no real estate. Americans increasingly choosing Lisbon and Porto.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "THB 900K Privilege / 50K LTR" },
        difficulty: "hard",
        processingDays: "No standard PR",
        special: "No easy PR (quota-limited, after 3+ yrs on work visa). Thailand Privilege (ex-Elite) 5~20yr from THB 650K–900K. LTR (10 yr) for US$80K+ income earners.",
        visaFee: 1540,
        officialUrl: "https://www.thailandprivilege.co.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZD 6,450 SMC fee" },
        difficulty: "moderate",
        processingDays: "12~18 months",
        special: "Skilled Migrant Category (6-point system). Americans typically strong candidates. New Skilled Work Experience and Trades pathways since Aug 2026. Citizenship after 5 years' residence.",
        visaFee: 3740,
        officialUrl: "https://www.immigration.govt.nz/visas/skilled-migrant-category-resident-visa/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "€350+ residence-permit tax" },
        difficulty: "moderate",
        processingDays: "5 years → Carte de Résident",
        special: "Carte de Résident after 5yr legal residency; since Jan 2026 first applications need French B1 plus a civic exam. Talent card holders build residence quickly. Citizenship possible after 5yr with B2 French.",
        visaFee: 393,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/F11429"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "€254 IND fee" },
        difficulty: "moderate",
        processingDays: "5 years → PR",
        special: "Permanent Residence after 5yr legal residency. Civic integration exam incl. Dutch A2. Naturalisation possible after 5yr residence (10-year proposal not yet law).",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "~€146 permit fees" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "EU Long-term Residence Permit after 5yr. Italian A2 language test. Income requirement. Citizenship by descent restricted since March 2025 (Law 74/2025): generally needs an Italian-born parent or grandparent.",
        visaFee: 164,
        officialUrl: "https://www.interno.gov.it/it/temi/immigrazione-e-asilo/permesso-di-soggiorno"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "€20+ residence card" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "Long-term EU Residency after 5yr (no language test). Nationality after 10yr requires DELE A2 + CCSE and a declaration renouncing prior nationality. Golden visa abolished April 2025. Barcelona and Málaga have growing American expat communities.",
        visaFee: 20,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "US$150K+ MM2H deposit" },
        difficulty: "hard",
        processingDays: "10+ years",
        special: "PR is discretionary and extremely rare. MM2H (revamped 2024): Silver US$150K deposit for a 5-yr pass, Gold US$500K (15-yr), Platinum US$1M (20-yr); age 25+, property purchase required.",
        visaFee: 5000,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "Free (no eTA needed)" },
        difficulty: "easy",
        processingDays: "None (visa-free)",
        special: "No visa and no eTA needed for US citizens (passport or other WHTI document at the border). Up to 6 months per stay. NEXUS speeds border crossings.",
        visaFee: 0,
        weeklyLiving: 420,
        flightMinUSD: 250,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → Schengen visa-free 90/180 days across 29 Schengen countries. EES biometric registration at the border; ETIAS (expected 2027) not yet required. Berlin, Munich, Frankfurt, Rhine Valley all accessible.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 500,
        officialUrl: "https://www.schengenvisainfo.com"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "ETA AUD 20" },
        difficulty: "easy",
        processingDays: "Minutes~1 day (ETA)",
        special: "US passport → ETA (subclass 601) via the AustralianETA app (AUD 20 service fee). Usually approved quickly; 12-month validity, up to 3 months per stay. (eVisitor is only for EU/European passports.)",
        visaFee: 14,
        weeklyLiving: 400,
        flightMinUSD: 1200,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → up to 90 days visa-free (stay granted at entry). Changi Airport is world-class transit hub. Submit the free SG Arrival Card within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 900,
        officialUrl: "https://www.ica.gov.sg"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "90-day visa on arrival" },
        difficulty: "easy",
        processingDays: "On arrival",
        special: "Americans get a free multiple-entry visa on arrival valid 180 days, allowing up to 90 days total stay (since Oct 2024). Dubai and Abu Dhabi popular with American tourists.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 800,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "ETA £20 required" },
        difficulty: "easy",
        processingDays: "Usually within 3 working days (ETA)",
        special: "UK ETA required for Americans since 8 Jan 2025. £20, valid 2yr (or until passport expires). Up to 6 months per visit. London is the #1 destination for US travelers to Europe.",
        visaFee: 27,
        weeklyLiving: 500,
        flightMinUSD: 450,
        officialUrl: "https://www.gov.uk/eta"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → 90-day visa-free entry. Japan is a top destination for American tourists. Tokyo, Kyoto, Osaka easy to navigate in English. JESTA online pre-travel authorisation planned by end of FY2028 — not yet required.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 800,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → Schengen visa-free 90/180 days. EES biometric registration at border since 2026; ETIAS not yet required. Lisbon and Porto among fastest-growing American expat destinations.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 500,
        officialUrl: "https://vistos.mne.gov.pt/en/short-stay-visas-schengen/general-information/schengen-area"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Americans get 30-day visa-free entry (tourism only) since 15 Sep 2026; the 60-day scheme was repealed. Extendable once by up to 30 days at local immigration. Submit the free Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 150,
        flightMinUSD: 900,
        officialUrl: "https://www.thaievisa.go.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 17~23 + IVL NZD 100" },
        difficulty: "easy",
        processingDays: "Up to 72 hours (NZeTA)",
        special: "NZeTA via app (NZD 17) or web (NZD 23), valid 2 years. 90-day entry per visit. IVL tourism levy NZD 100. New Zealand is a top adventure travel destination for Americans.",
        visaFee: 68,
        weeklyLiving: 300,
        flightMinUSD: 1200,
        officialUrl: "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → Schengen visa-free 90/180 days across 29 Schengen countries. Paris, Riviera, Loire Valley, Bordeaux. EU Entry/Exit System (EES) records fingerprints and a photo at first entry since April 2026; ETIAS (expected €20) is not yet required.",
        visaFee: 0,
        weeklyLiving: 300,
        flightMinUSD: 450,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Schengen visa-free 90/180 days. EES biometric registration at first entry (since Apr 2026); ETIAS not yet required (expected 2027). Amsterdam, The Hague, Rotterdam, Maastricht popular with Americans.",
        visaFee: 0,
        weeklyLiving: 320,
        flightMinUSD: 450,
        officialUrl: "https://www.schengenvisainfo.com/netherlands-visa/"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Schengen visa-free. Italy among top 5 destinations for American tourists. Rome, Venice, Amalfi, Tuscany. Direct flights from major US cities.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 450,
        officialUrl: "https://vistoperitalia.esteri.it/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Schengen visa-free 90/180 days. EES biometric registration at first entry; ETIAS not yet in operation. Barcelona, Madrid, Seville, Ibiza all accessible.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 450,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Americans get 90-day visa-free entry to Malaysia. One of Asia's most accessible and affordable destinations. Complete the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 100,
        flightMinUSD: 900,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/"
      }
    }
  },
  france: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 28K~40K/yr" },
        difficulty: "easy",
        processingDays: "8~12 weeks",
        special: "PAL/TAL needed for most programs (master's/PhD at public schools exempt from 2026). Quebec programs need a CAQ. PGWP up to 3 years. IEC Working Holiday (18–35) is an alternative.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 5000, currency: "USD", label: "€500~1,200/yr (EU rate)" },
        difficulty: "easy",
        processingDays: "No visa — EU freedom of movement",
        special: "EU citizen — no visa needed in Germany. Study immediately under EU Freedom of Movement. Register at Einwohnermeldeamt within 2 weeks. Public universities free or near-free for EU citizens.",
        visaFee: 0,
        officialUrl: "https://www.daad.de/en/study-and-research-in-germany/"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr + AUD 2,500 visa" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Student visa 500 (AUD 2,500). Working Holiday (417, ages 18–35) allows up to 4 months of study. Post-study Graduate visa (485) 2~3 years.",
        visaFee: 1738,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Student Pass via ICA. NUS and NTU well-known in France. INSEAD Singapore campus popular for MBA candidates. Strong English instruction.",
        visaFee: 70,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Student visa via university enrollment. MBZUAI has French research partnerships. No income tax. Popular destination for French engineering graduates.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-studying-in-the-uae"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "moderate",
        processingDays: "3 weeks",
        special: "Post-Brexit: French nationals now need UK Student visa same as non-EU. IHS fee £776/yr. Graduate visa 2yr if applying by 31 Dec 2026, 18 months from 1 Jan 2027. Oxford, Imperial, LSE popular with French students.",
        visaFee: 742,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "moderate",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "CoE from school takes ~3 months. French-Japanese cultural ties strong. Working Holiday also available. Visa fee ¥15,000 single-entry from Jul 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 5000, currency: "USD", label: "€500~1,200/yr (EU rate)" },
        difficulty: "easy",
        processingDays: "No visa — EU freedom of movement",
        special: "EU citizen — no visa needed. Full tuition EU rates at Portuguese public universities. Lisbon and Porto very popular with French expats. Language closely related.",
        visaFee: 0,
        officialUrl: "https://www.dges.gov.pt/en"
      },
      usa: {
        cost: { annual: 50000, currency: "USD", label: "$40K~60K/yr" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "F-1 visa ($185 + $350 SEVIS fee). In-person interview and public social-media review required. OPT 1yr + STEM OPT 2yr after graduation. Interview at US Embassy Paris. French students well-represented at MIT, Columbia, and NYU.",
        visaFee: 535,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
      },
      thailand: {
        cost: { annual: 5000, currency: "USD", label: "฿120K~200K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "ED visa. Many French schools partner with Thai institutions. Low cost of living. French expat community in Bangkok and Chiang Mai helps with integration.",
        visaFee: 40,
        officialUrl: "https://www.immigration.go.th"
      },
      newzealand: {
        cost: { annual: 25000, currency: "USD", label: "NZD 25K~40K/yr" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Student visa straightforward for French nationals. Working Holiday (ages 18–30, 12 months) also available. Post-study work visa up to 3 years.",
        visaFee: 495,
        officialUrl: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/"
      },
      netherlands: {
        cost: { annual: 5000, currency: "USD", label: "€2K~4K/yr (EU rate)" },
        difficulty: "easy",
        processingDays: "No visa — EU freedom of movement",
        special: "EU citizen — no visa needed. Public university EU rates. Orientation year after graduation. TU Delft and Leiden popular. English widely spoken.",
        visaFee: 0,
        officialUrl: "https://www.nuffic.nl/en"
      },
      italy: {
        cost: { annual: 5000, currency: "USD", label: "€900~3K/yr (EU rate)" },
        difficulty: "easy",
        processingDays: "No visa — EU freedom of movement",
        special: "EU citizen — no visa needed. Milan Polytechnic, Bologna, Sapienza popular for French Erasmus and long-term students. EU tuition rates apply.",
        visaFee: 0,
        officialUrl: "https://www.universitaly.it/"
      },
      spain: {
        cost: { annual: 5000, currency: "USD", label: "€800~2K/yr (EU rate)" },
        difficulty: "easy",
        processingDays: "No visa — EU freedom of movement",
        special: "EU citizen — no visa needed. Spanish public universities charge EU rates. Barcelona and Madrid popular. Erasmus Programme widely used by French students.",
        visaFee: 0,
        officialUrl: "https://www.educacion.gob.es/en"
      },
      malaysia: {
        cost: { annual: 8000, currency: "USD", label: "MYR 25K~45K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Student Pass via EMGS. Some French schools operate campuses in KL. English-medium instruction. Affordable vs. Western options. French expat community present.",
        visaFee: 110,
        officialUrl: "https://educationmalaysia.gov.my"
      }
    },
    work: {
      canada: {
        cost: { annual: 3500, currency: "USD", label: "CAD 285 IEC fees + CAD 85 biometrics" },
        difficulty: "easy",
        processingDays: "2 weeks (IEC) / 6~12 months (Express Entry)",
        special: "IEC Working Holiday for French aged 18–35 (up to 24 months): open work permit, no job offer needed. Francophone Mobility lets employers hire French speakers outside Quebec without an LMIA. Extra CRS points and French-language category draws in Express Entry.",
        visaFee: 205,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work anywhere in Germany immediately. Just register your address (Anmeldung) within 2 weeks; no work permit or EU residence certificate needed. Strong demand for French speakers.",
        visaFee: 0,
        officialUrl: "https://www.make-it-in-germany.com/en/living-in-germany/moving-to-germany/eu-eea-nationals"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 840 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (417) for French aged 18–35. Second/third years need regional work and are to be capped by ballot. Skills in Demand (482) for employer-sponsored longer term.",
        visaFee: 584,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 + 225 issuance" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "French MNCs (TotalEnergies, AXA, L'Oréal) sponsor employees. EP needs SGD 5,600+/month (6,200 in finance), higher with age, rising to 6,000/6,600 from Jan 2027, plus 40 COMPASS points. Employer applies via myMOM.",
        visaFee: 80,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 500~2,000 fees" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "French professionals recruited in engineering, finance, luxury, and education sectors. French community ~60,000 in UAE. Golden Visa for high earners.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-working-in-the-uae"
      },
      uk: {
        cost: { annual: 1500, currency: "USD", label: "£819~1,618 visa fee" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Post-Brexit: French nationals need Skilled Worker visa for UK work (sponsor, £41,700+ salary, B2 English). France is not part of the UK Youth Mobility Scheme.",
        visaFee: 1089,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 2000, currency: "USD", label: "¥15,000 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Engineer/Specialist or Cultural Activities visa. Working Holiday for French aged 18–30. HSP route for high skilled; digital nomad stay (6 months, ¥10M+ income) also available. Visa ¥15,000 from Jul 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work anywhere in Portugal immediately. Register with the local Câmara Municipal (CRUE) if staying over 3 months. Large and growing French expat community in Lisbon and Algarve.",
        visaFee: 0,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "H-1B employer fees ~$2,200~3,600" },
        difficulty: "hard",
        processingDays: "6~9 months",
        special: "H-1B cap lottery (85,000 spots, wage-weighted since FY2027). Employer must sponsor. L-1 intracompany transfer or E-2 treaty investor visa often easier. E-3 visa not available for French.",
        visaFee: 2225,
        officialUrl: "https://www.dol.gov/agencies/eta/foreign-labor/programs/h-1b"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "฿2,000 Non-B + permit" },
        difficulty: "moderate",
        processingDays: "3~4 weeks",
        special: "Non-B + work permit required. French companies (Michelin, Airbus Thailand) sponsor employees. LTR Visa for high-income professionals. Active French community in Bangkok.",
        visaFee: 80,
        officialUrl: "https://www.doe.go.th"
      },
      newzealand: {
        cost: { annual: 700, currency: "USD", label: "NZD 1,540 AEWV fee" },
        difficulty: "easy",
        processingDays: "Up to 5 weeks (AEWV)",
        special: "Working Holiday (ages 18–30) allows up to 12 months of work and travel. AEWV for accredited employer roles. French professionals in demand in tech, agriculture, and hospitality.",
        visaFee: 895,
        officialUrl: "https://www.immigration.govt.nz/visas/accredited-employer-work-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work in Netherlands immediately. Register with municipality. ASML, Booking, Shell hire many French speakers. 30% tax ruling available for qualifying roles.",
        visaFee: 0,
        officialUrl: "https://ind.nl/en/residence-permits/eu-eea-or-swiss-citizens/staying-in-the-netherlands-as-an-eu-eea-or-swiss-citizen"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work in Italy immediately. Register as EU citizen within 3 months. Milan luxury fashion and design sector hires many French professionals.",
        visaFee: 0,
        officialUrl: "https://www.lavoro.gov.it/en"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work in Spain immediately. NIE number required for tax/admin. Barcelona tech sector and Madrid finance draw many French workers.",
        visaFee: 0,
        officialUrl: "https://www.sepe.es/HomeSepe/en"
      },
      malaysia: {
        cost: { annual: 1000, currency: "USD", label: "MYR 1,500 EP fee" },
        difficulty: "moderate",
        processingDays: "2~4 weeks",
        special: "French companies (Airbus, Schneider) recruit locally. EP salary floors from Jun 2026: RM5,000 (Cat III), RM10,000 (Cat II), RM20,000 (Cat I). English working environment in MNCs.",
        visaFee: 330,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 1,590 PR fees (+ CAD 270/child)" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Express Entry: up to 50 extra CRS points for strong French, and French-language category draws have had cut-offs below 400 in 2026. Quebec selects through its own PSTQ (Arrima) program.",
        visaFee: 1145,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "EU right — no fees" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — permanent right of residence after 5yr. No formal PR application needed — just register. Fastest PR path for French nationals in Europe.",
        visaFee: 0,
        officialUrl: "https://www.make-it-in-germany.com/en/living-in-germany/moving-to-germany/eu-eea-nationals"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "AUD 6,135~6,140 visa fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "189/190 skilled migration points-based. French nationals score well: English, education, experience. Australia highly desirable for French emigrants.",
        visaFee: 4265,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Varies" },
        difficulty: "hard",
        processingDays: "2~5 years",
        special: "PR highly discretionary. French nationals with strong employment history and community ties have reasonable chances. Must demonstrate long-term commitment to Singapore.",
        visaFee: 78,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "AED 2,800~10,000" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Golden Visa (10yr) for salary AED 30K+/month or investment. France is among top source countries for UAE Golden Visa holders. Popular among French executives.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/golden-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "£3,226 ILR fee" },
        difficulty: "moderate",
        processingDays: "5 years",
        special: "ILR after 5yr on Skilled Worker (proposed 'earned settlement' reform would raise the standard to 10yr — not yet in force). English, Life in UK test. French community ~150,000 in London area. Post-Brexit increased admin for French nationals.",
        visaFee: 4290,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "¥200,000 application fee (from Oct 2026)" },
        difficulty: "hard",
        processingDays: "10 years (or 1~3 via HSP)",
        special: "Standard PR 10yr. HSP fast-track: 3yr with 70+ points, 1yr with 80+. PR fee ¥200,000 from Oct 2026. French-Japanese cultural ties help with integration.",
        visaFee: 1263,
        officialUrl: "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "EU right — minimal fees" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — permanent residence right after 5yr; no formal PR needed. Register with the local Câmara Municipal (CRUE) if staying over 3 months. Portugal is a popular EU destination for French emigrants.",
        visaFee: 0,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "DV Lottery or EB petition" },
        difficulty: "hard",
        processingDays: "3~10+ years",
        special: "Green Card via employer EB-1/EB-2/EB-3 or Diversity Visa Lottery (French eligible; DV-2027 registration was paused and only court-ordered to reopen in Nov 2026). EB-5 investment ($800K TEA / $1.05M) is an alternative.",
        visaFee: 325,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "THB 900K Privilege / 50K LTR" },
        difficulty: "hard",
        processingDays: "No standard PR",
        special: "No easy PR (quota-limited, after 3+ yrs on work visa). Thailand Privilege (ex-Elite) 5~20yr from THB 650K–900K. LTR (10 yr) for US$80K+ income earners. Large French retiree community.",
        visaFee: 1540,
        officialUrl: "https://www.thailandprivilege.co.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZD 6,450 SMC fee" },
        difficulty: "moderate",
        processingDays: "12~18 months",
        special: "Skilled Migrant Category (6-point system). French professionals strong candidates. New Skilled Work Experience and Trades pathways since Aug 2026. Citizenship after 5 years' residence.",
        visaFee: 3740,
        officialUrl: "https://www.immigration.govt.nz/visas/skilled-migrant-category-resident-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "EU right — minimal fees" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — automatic permanent right after 5yr. Amsterdam and Rotterdam attract French professionals, especially in tech, finance, and logistics.",
        visaFee: 0,
        officialUrl: "https://ind.nl/en/residence-permits/eu-eea-or-swiss-citizens/permanent-residency-for-union-citizens-and-their-family"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "EU right — minimal fees" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — automatic permanent right after 5yr. Milan, Turin, and Rome all have French communities. French-Italian cultural affinity eases integration.",
        visaFee: 0,
        officialUrl: "https://www.interno.gov.it/en"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "EU right — minimal fees" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — automatic permanent right after 5yr. Barcelona and Madrid have the largest French communities in Spain. Lifestyle and climate are major draws.",
        visaFee: 0,
        officialUrl: "https://www.interior.gob.es/en"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "US$150K+ MM2H deposit" },
        difficulty: "hard",
        processingDays: "10+ years",
        special: "PR is discretionary and rare. MM2H (revamped 2024): Silver US$150K deposit for a 5-yr pass, Gold US$500K (15-yr), Platinum US$1M (20-yr); age 25+, property purchase required.",
        visaFee: 5000,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "eTA CAD 7" },
        difficulty: "easy",
        processingDays: "Minutes (eTA)",
        special: "French passport → eTA only. Up to 6 months per stay. Quebec very popular with French tourists for cultural and linguistic connection. 8hr flight from Paris.",
        visaFee: 5,
        weeklyLiving: 420,
        flightMinUSD: 650,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "EU — no restrictions" },
        difficulty: "easy",
        processingDays: "No visa — EU FoM",
        special: "EU citizen — no restrictions on travel. Drive, take train (TGV), or fly. Berlin, Munich, Hamburg, Rhine Valley all accessible without any limit.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 50,
        officialUrl: "https://www.einreisebestimmungen.de/en"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "eVisitor — Free" },
        difficulty: "easy",
        processingDays: "1~3 days (eVisitor)",
        special: "French passport → eVisitor (subclass 651), free online. 12-month multiple entry, up to 3 months per stay. Great Barrier Reef and Melbourne popular with French tourists.",
        visaFee: 0,
        weeklyLiving: 400,
        flightMinUSD: 900,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "French passport → up to 90 days visa-free (stay granted at entry). Key transit hub for Southeast Asia and Oceania. Submit the free SG Arrival Card within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 700,
        officialUrl: "https://www.ica.gov.sg"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "90-day visa on arrival" },
        difficulty: "easy",
        processingDays: "On arrival",
        special: "French passport → free visa on arrival, up to 90 days within any 180-day period. Dubai is a popular luxury destination for French tourists. Direct Air France flights daily from Paris.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 250,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "ETA £20 required" },
        difficulty: "easy",
        processingDays: "Usually within 3 working days (ETA)",
        special: "UK ETA required for French nationals since 2 Apr 2025. £20, valid 2yr. Up to 6 months per visit. London top destination for French tourists. Eurostar 2hr 15min Paris-London.",
        visaFee: 27,
        weeklyLiving: 500,
        flightMinUSD: 50,
        officialUrl: "https://www.gov.uk/eta"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "French passport → 90-day visa-free. Japan very popular with French tourists. Direct Air France Paris-Tokyo. JESTA online pre-travel authorisation planned by end of FY2028 — not yet required.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 600,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "EU — no restrictions" },
        difficulty: "easy",
        processingDays: "No visa — EU FoM",
        special: "EU citizen — drive or fly, no limit. Lisbon 2hr from Paris by plane. Porto, Algarve, Madeira. Portugal top destination for French tourists and emigrants.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 80,
        officialUrl: "https://www.visitportugal.com"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "ESTA $40" },
        difficulty: "easy",
        processingDays: "Minutes (ESTA)",
        special: "ESTA Visa Waiver: 90-day visa-free entry. New York, Los Angeles, Miami, Chicago. Direct Air France and Delta flights. France sends ~2M tourists/year to USA.",
        visaFee: 40,
        weeklyLiving: 350,
        flightMinUSD: 350,
        officialUrl: "https://esta.cbp.dhs.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "French passport holders get 30-day visa-free entry (tourism only) since 15 Sep 2026; the 60-day scheme was repealed. Extendable once by up to 30 days at local immigration. Submit the free Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 150,
        flightMinUSD: 600,
        officialUrl: "https://www.thaievisa.go.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 17~23 + IVL NZD 100" },
        difficulty: "easy",
        processingDays: "Up to 72 hours (NZeTA)",
        special: "French passport → NZeTA (app NZD 17 / web NZD 23) plus NZD 100 IVL. 90-day entry. Working Holiday (18–30) also popular with French travelers.",
        visaFee: 68,
        weeklyLiving: 300,
        flightMinUSD: 1200,
        officialUrl: "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "EU — no restrictions" },
        difficulty: "easy",
        processingDays: "No visa — EU FoM",
        special: "EU citizen — 1hr flight or 3hr train from Paris. Amsterdam, Rotterdam, The Hague. No 90-day limit for EU citizens. Key EU neighbor for French travelers.",
        visaFee: 0,
        weeklyLiving: 320,
        flightMinUSD: 50,
        officialUrl: "https://www.netherlands-tourism.com"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "EU — no restrictions" },
        difficulty: "easy",
        processingDays: "No visa — EU FoM",
        special: "EU citizen — drive through Alps or fly. Rome 2hr from Paris by plane. No restrictions. Italy is the #1 EU destination for French tourists by volume.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 80,
        officialUrl: "https://www.italia.it/en"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "EU — no restrictions" },
        difficulty: "easy",
        processingDays: "No visa — EU FoM",
        special: "EU citizen — drive through Pyrenees or fly. Barcelona 6hr train from Paris. No restrictions. Spain is the largest foreign destination for French tourists by numbers.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 80,
        officialUrl: "https://www.spain.info/en"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "French passport → 90-day visa-free. KL, Penang, Langkawi, Borneo. Complete the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 100,
        flightMinUSD: 650,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/"
      }
    }
  },
  tunisia: {
    study: {
      canada: {
        cost: { annual: 25000, currency: "USD", label: "CAD 28K~40K/yr" },
        difficulty: "moderate",
        processingDays: "8~16 weeks",
        special: "Proof of funds CAD 23,448 + first-year tuition (from 1 Sep 2026), PAL/TAL (or Quebec CAQ), IELTS/TEF and acceptance letter. Strong financial documentation essential; refusal rates for African applicants are high.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "moderate",
        processingDays: "120~180 days",
        special: "Studienkolleg preparatory course may be required. DAAD scholarships available. Blocked account €11,904/yr (€992/month) required. Appointment bottleneck at German consulate Tunis — apply early.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr + AUD 2,500 visa" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "Genuine Student (GS) requirement replaced GTE — study plans and ties to Tunisia scrutinised. Visa fee AUD 2,500. Refusal rates higher for Tunisian applicants; strong financial evidence (about AUD 29,710/yr living costs + tuition) essential.",
        visaFee: 1738,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "hard",
        processingDays: "14~28 days",
        special: "Student Pass via ICA. Tunisian applicants face close scrutiny. Strong financial evidence, parental support documentation, and clear academic track required.",
        visaFee: 70,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "UAE has large Tunisian community. MBZUAI and AUS welcome North African students. Student visa via enrollment. Arabic language shared advantage.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-studying-in-the-uae"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "hard",
        processingDays: "3~8 weeks",
        special: "UK Student visa. Higher refusal rates for some North African passports. Strong bank statements (3-6 months), IELTS 5.5+, accommodation proof, and non-immigrant intent required.",
        visaFee: 742,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "hard",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "Rare pathway for Tunisian students. CoE from school takes ~3 months. JLPT N4+ or English proficiency required. Visa fee ¥15,000 single-entry from Jul 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "D4 student visa (€110 fee). Proof of means benchmarked to Portugal's minimum wage (€920/month in 2026). Public universities affordable.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 50000, currency: "USD", label: "$40K~60K/yr" },
        difficulty: "hard",
        processingDays: "2~6 months",
        special: "F-1 visa ($185 + $350 SEVIS fee). In-person interview and public social-media review required. OPT 1yr + STEM OPT 2yr after graduation. Interview at US Embassy Tunis; must prove non-immigrant intent strongly. TOEFL/IELTS and full financial proof required.",
        visaFee: 535,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
      },
      thailand: {
        cost: { annual: 5000, currency: "USD", label: "฿120K~200K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Thai ED visa relatively easy for Tunisians. Low scrutiny. Low cost of living. English-taught programs at MUIC and Mahidol International.",
        visaFee: 40,
        officialUrl: "https://www.immigration.go.th"
      },
      newzealand: {
        cost: { annual: 25000, currency: "USD", label: "NZD 25K~40K/yr" },
        difficulty: "moderate",
        processingDays: "20~35 days",
        special: "Student visa possible for Tunisians. Proof of NZD 20,000/yr living costs plus tuition and IELTS required. Clear academic purpose and return ties strengthen the application.",
        visaFee: 495,
        officialUrl: "https://www.immigration.govt.nz/visas/fee-paying-student-visa/"
      },
      france: {
        cost: { annual: 12000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Very large Tunisian student community in France. Campus France (Études en France) procedure mandatory; visa fee €50. Non-EU tuition €2,902 (licence) / €3,950 (master) per year unless exempted. French proficiency a major advantage.",
        visaFee: 56,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 18000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "MVV + residence permit via university (IND fee €254). Full financial evidence (~€1,131/month in 2026) mandatory. Must apply from Tunisia. University acceptance letter and insurance required.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Strong historical Tunisian community in Italy (Sicily, Turin). Italian consulate in Tunis familiar with North African applicants. Public universities affordable. Permesso di soggiorno required on arrival.",
        visaFee: 57,
        officialUrl: "https://www.universitaly.it/"
      },
      spain: {
        cost: { annual: 10000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "National D student visa via Spanish consulate in Tunis. Students may work up to 30 hr/week (2025 regulation). Public universities from €800/yr. Growing Tunisian community in Valencia and Madrid.",
        visaFee: 80,
        officialUrl: "https://www.studyinspain.info"
      },
      malaysia: {
        cost: { annual: 8000, currency: "USD", label: "MYR 25K~45K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "EMGS system. Tunisian students welcomed as OIC member. Low cost. English-medium instruction at private universities. Halal environment familiar.",
        visaFee: 110,
        officialUrl: "https://educationmalaysia.gov.my"
      }
    },
    work: {
      canada: {
        cost: { annual: 3500, currency: "USD", label: "CAD 155 permit + CAD 85 biometrics" },
        difficulty: "hard",
        processingDays: "2~6 months",
        special: "LMIA-backed work permit usually required. Francophone Mobility (no LMIA) for French-speaking hires outside Quebec. Express Entry French-language draws have had cut-offs below 400 in 2026; English or French test required.",
        visaFee: 110,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€75 visa + residence permit fee" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Germany-Tunisia skilled-migration cooperation facilitates recruitment. Chancenkarte (Opportunity Card) allows job-seeking. EU Blue Card needs €50,700+ salary (€45,934 shortage occupations, 2026). German language B1+ helpful.",
        visaFee: 84,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 4640, currency: "USD", label: "AUD 4,015 visa fee" },
        difficulty: "hard",
        processingDays: "2~4 months",
        special: "Skills in Demand (482) employer sponsor required (replaced TSS Dec 2024). Skills assessment and English test (typically IELTS 5.0–6.0+) required. Tunisian credentials may need formal assessment.",
        visaFee: 2791,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skills-in-demand-visa-subclass-482"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 + 225 issuance" },
        difficulty: "hard",
        processingDays: "3~8 weeks",
        special: "Competitive for Tunisians — STEM and finance professionals with top qualifications succeed. EP needs SGD 5,600+/month (6,200 in finance), higher with age, rising to 6,000/6,600 from Jan 2027, plus 40 COMPASS points. Employer applies via myMOM.",
        visaFee: 80,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 500~2,000 fees" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "UAE has large Tunisian expatriate workforce. Employer-sponsored visa. Dubai and Abu Dhabi popular for Tunisian engineers, healthcare workers, and educators. Tax-free income major draw.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/residence-visa-for-working-in-the-uae"
      },
      uk: {
        cost: { annual: 1500, currency: "USD", label: "£819~1,618 Skilled Worker fee" },
        difficulty: "hard",
        processingDays: "3~8 weeks",
        special: "Skilled Worker visa needs UK licensed sponsor + CoS + B2 English. Salary threshold £41,700+ (or going rate). Immigration background check thorough for Tunisian applicants.",
        visaFee: 1089,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 2000, currency: "USD", label: "¥15,000 visa fee" },
        difficulty: "hard",
        processingDays: "1~3 months",
        special: "Very rare pathway for Tunisian workers. Engineer/Specialist visa requires university degree in relevant field. Japanese or English business level needed. Visa ¥15,000 from Jul 2026; renewals ¥10,000–75,000 from Oct 2026.",
        visaFee: 95,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
      },
      portugal: {
        cost: { annual: 2000, currency: "USD", label: "€110 visa + AIMA permit fee" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "D3 Highly Qualified, EU Blue Card or D8 Digital Nomad. Standard work visas need a Portuguese job offer; Job Seeker Visa limited to skilled profiles since Oct 2025 (Law 61/2025). Francophone advantage. Lisbon growing tech hub.",
        visaFee: 124,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "H-1B employer fees ~$2,200~3,600" },
        difficulty: "hard",
        processingDays: "6~9 months",
        special: "H-1B annual cap lottery (85,000 spots, wage-weighted since FY2027). Employer must sponsor and file petition. L-1 intracompany transfer possible for MNC employees. A $100K fee for new petitions from abroad is contested in court.",
        visaFee: 2225,
        officialUrl: "https://www.dol.gov/agencies/eta/foreign-labor/programs/h-1b"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "฿2,000 Non-B + permit" },
        difficulty: "moderate",
        processingDays: "3~4 weeks",
        special: "Non-Immigrant B visa + Work Permit. BOI-registered companies help with sponsorship. LTR Visa for qualifying professionals. OIC member countries have informal goodwill.",
        visaFee: 80,
        officialUrl: "https://www.doe.go.th"
      },
      newzealand: {
        cost: { annual: 700, currency: "USD", label: "NZD 1,540 AEWV fee" },
        difficulty: "hard",
        processingDays: "4~8 weeks",
        special: "AEWV requires an accredited employer and 2+ years' relevant experience or a Level 4+ qualification. Health and character checks apply. English evidence may be required for lower-skilled roles.",
        visaFee: 895,
        officialUrl: "https://www.immigration.govt.nz/visas/accredited-employer-work-visa/"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 visa + €300 VLS-TS validation" },
        difficulty: "easy",
        processingDays: "1~3 months",
        special: "France-Tunisia bilateral labor agreement (one of oldest in Europe). Tech, healthcare, construction sectors actively recruit Tunisians. French language advantage. Largest Tunisian diaspora in Europe.",
        visaFee: 111,
        officialUrl: "https://www.immigration.interieur.gouv.fr/En"
      },
      netherlands: {
        cost: { annual: 1500, currency: "USD", label: "€423 HSM permit" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "Highly Skilled Migrant threshold €5,942+/month (30+) or €4,357 (under 30) in 2026. IND-recognised sponsor required. Achievable for qualified engineers, IT, and data science professionals.",
        visaFee: 475,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 1500, currency: "USD", label: "€116 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Tunisia is among countries with reserved Decreto Flussi quotas. The 2026–2028 decree allows 497,550 entries over three years (seasonal and non-seasonal); employer must obtain nulla osta first. Sicily and northern Italy have strong Tunisian communities.",
        visaFee: 116,
        officialUrl: "https://www.lavoro.gov.it/en"
      },
      spain: {
        cost: { annual: 1500, currency: "USD", label: "€80~200 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Employer-sponsored work permits and seasonal hiring routes. Digital Nomad Visa for remote income ≈€2,849+/month (2026). Growing Tunisian community in Valencia.",
        visaFee: 80,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones"
      },
      malaysia: {
        cost: { annual: 1000, currency: "USD", label: "MYR 1,500 EP fee" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "Employment Pass feasible for Tunisian STEM professionals. EP salary floors from Jun 2026: RM5,000 (Cat III), RM10,000 (Cat II), RM20,000 (Cat I). Halal environment familiar.",
        visaFee: 330,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 1,590 PR fees (+ CAD 270/child)" },
        difficulty: "moderate",
        processingDays: "6~18 months",
        special: "Express Entry: strong French earns up to 50 extra CRS points and French-language draws have had cut-offs below 400 in 2026. Quebec uses its own PSTQ program. English IELTS/CELPIP or French TEF/TCF required.",
        visaFee: 1145,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "€120~500 permit fees" },
        difficulty: "moderate",
        processingDays: "3~5 years",
        special: "Niederlassungserlaubnis after 3 years as skilled worker (27/21 months on EU Blue Card). Germany-Tunisia migration cooperation helps. B1 German typically required. Citizenship after 5 years (fast track abolished 2025).",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/settlement-permit"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "AUD 6,135~6,140 visa fee" },
        difficulty: "hard",
        processingDays: "2~4 years",
        special: "Skills assessment mandatory. IELTS 7.0+ strongly advised. Points test competitive. Credential recognition from Tunisian institutions may require additional steps.",
        visaFee: 4265,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Varies" },
        difficulty: "hard",
        processingDays: "3~6 years",
        special: "PR highly selective and discretionary. No points system. Extended work history and community integration key. Very rare for Tunisian nationals to obtain Singapore PR.",
        visaFee: 78,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "AED 2,800~10,000" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Golden Visa (10yr) for professionals earning AED 30K+/month, investors, or exceptional talent. Large Tunisian diaspora facilitates. Popular route for established Tunisian professionals in UAE.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/golden-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "£3,226 ILR fee" },
        difficulty: "hard",
        processingDays: "5+ years",
        special: "ILR after 5yr continuous legal stay on Skilled Worker (proposed 'earned settlement' would raise this to 10yr — not yet in force). English, Life in UK test, criminal record check. Consistent employment record critical.",
        visaFee: 4290,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "¥200,000 application fee (from Oct 2026)" },
        difficulty: "hard",
        processingDays: "10 years (or 1~3 via HSP)",
        special: "Standard PR requires 10yr continuous residence. HSP fast-track: 3yr with 70+ points (1yr with 80+). PR fee ¥200,000 from Oct 2026. Very rare for Tunisian nationals.",
        visaFee: 1263,
        officialUrl: "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "€320+ residence fee" },
        difficulty: "moderate",
        processingDays: "5 years → PR",
        special: "D3/D7/D8 visa → 5yr legal residency → Permanent Residence. Portuguese A2 required. Citizenship after 10 years (2026 law). Portugal increasingly popular with Tunisian professionals as an EU gateway.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "DV Lottery or EB petition" },
        difficulty: "hard",
        processingDays: "3~15+ years",
        special: "Diversity Visa Lottery: Tunisia eligible, but DV-2027 registration was paused (court-ordered to reopen by Nov 2026). Tunisia was on the Jan 2026 immigrant-visa pause list (vacated by a federal court Aug 2026). EB Green Card via employer sponsorship.",
        visaFee: 325,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "THB 900K Privilege / 50K LTR" },
        difficulty: "hard",
        processingDays: "No standard PR",
        special: "No easy PR (quota-limited, after 3+ yrs on work visa). Thailand Privilege (ex-Elite) 5~20yr from THB 650K–900K. LTR (10 yr) for US$80K+ income earners. Challenging for most Tunisian applicants.",
        visaFee: 1540,
        officialUrl: "https://www.thailandprivilege.co.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZD 6,450 SMC fee" },
        difficulty: "moderate",
        processingDays: "18~36 months",
        special: "Skilled Migrant Category (6-point system). Overseas qualifications need an International Qualification Assessment unless exempt. English test required. Citizenship after 5 years' residence.",
        visaFee: 3740,
        officialUrl: "https://www.immigration.govt.nz/visas/skilled-migrant-category-resident-visa/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "€350+ residence-permit tax" },
        difficulty: "easy",
        processingDays: "3~5 years → Carte de Résident",
        special: "Franco-Tunisian agreement (1988) is one of the most advantageous in Europe: 10-year Carte de Résident possible after 3yr legal residence. Largest Tunisian diaspora is in France (~640,000). French B1 and a civic exam now required (since Jan 2026); naturalisation requires B2.",
        visaFee: 393,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/F11429"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "€254 IND fee" },
        difficulty: "hard",
        processingDays: "5 years → PR",
        special: "5yr continuous legal stay → PR. Civic integration exam incl. Dutch A2 required. Difficult process for non-EU applicants.",
        visaFee: 285,
        officialUrl: "https://ind.nl/en/residence-permits/long-term-eu-residency/apply-for-a-residence-permit-for-long-term-eu-residents"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "~€146 permit fees" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "EU Long-term Residence after 5yr. Italian A2 language. Largest Tunisian community in EU outside France (Sicily, Turin, Milan). Italy-Tunisia bilateral agreement facilitates path.",
        visaFee: 164,
        officialUrl: "https://www.interno.gov.it"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "€20+ residence card" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "Long-term EU Residency after 5yr (no language test). Arraigo social/sociolaboral/familiar paths after 2yr presence (2025 regulation). Nationality after 10yr with DELE A2 + CCSE.",
        visaFee: 20,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "US$150K+ MM2H deposit" },
        difficulty: "hard",
        processingDays: "10+ years",
        special: "PR highly discretionary and very difficult. MM2H (revamped 2024): Silver US$150K deposit for a 5-yr pass, Gold US$500K (15-yr), Platinum US$1M (20-yr); age 25+, property purchase required.",
        visaFee: 5000,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 100 visa + CAD 85 biometrics" },
        difficulty: "hard",
        processingDays: "2~8 weeks",
        special: "Tunisian passport requires Temporary Resident Visa. Apply online or via VAC in Tunis. Financial proof, accommodation, and ties to Tunisia required. Advance planning essential.",
        visaFee: 72,
        weeklyLiving: 420,
        flightMinUSD: 900,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa required at German consulate in Tunis (€90). Appointment wait 2-4 weeks. Financial proof, accommodation, travel insurance, and itinerary required. 90/180 day max.",
        visaFee: 101,
        weeklyLiving: 350,
        flightMinUSD: 200,
        officialUrl: "https://tunesien.diplo.de/tn-ar/service/-/1418918"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa AUD 250" },
        difficulty: "hard",
        processingDays: "2~4 weeks",
        special: "Australian visitor visa required for Tunisians. Apply online with financial evidence and ties to Tunisia. ETA not available for Tunisian passport.",
        visaFee: 174,
        weeklyLiving: 400,
        flightMinUSD: 1100,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa required (S$30)" },
        difficulty: "hard",
        processingDays: "5~10 days",
        special: "Visa required for Tunisian passport holders. Apply via Singapore mission or authorised agent (S$30 fee). Financial evidence required. 96-hour Visa-Free Transit Facility for eligible travellers. Submit the free SG Arrival Card within 3 days before arrival.",
        visaFee: 23,
        weeklyLiving: 280,
        flightMinUSD: 600,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visit visa before travel (approx. AED 350~400)" },
        difficulty: "easy",
        processingDays: "2~5 working days",
        special: "Tunisians are not eligible for visa on arrival: a visit visa (30 or 60 days) must be issued before travel via an airline (Emirates/flydubai), hotel, tour operator, UAE-resident sponsor or ICP/GDRFA portals.",
        visaFee: 100,
        weeklyLiving: 350,
        flightMinUSD: 300,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/tourist-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "Standard Visitor Visa £135" },
        difficulty: "hard",
        processingDays: "3~6 weeks",
        special: "UK Visitor visa required. Financial evidence, accommodation, return ticket, employment proof. Apply minimum 3-4 weeks before travel.",
        visaFee: 180,
        weeklyLiving: 500,
        flightMinUSD: 300,
        officialUrl: "https://www.gov.uk/standard-visitor-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Tourist visa required (¥15,000)" },
        difficulty: "hard",
        processingDays: "3~5 days",
        special: "Japanese tourist visa required for Tunisian passport. Apply at Japanese Embassy Tunis. Fee ¥15,000 single-entry from Jul 2026. Financial evidence, itinerary, accommodation proof.",
        visaFee: 95,
        weeklyLiving: 250,
        flightMinUSD: 800,
        officialUrl: "https://www.tn.emb-japan.go.jp"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa required (€90). Apply at the consulate of your main destination — Portuguese Embassy in Tunis if Portugal is the main stay. 90/180 day rule. EES biometric registration at the border.",
        visaFee: 101,
        weeklyLiving: 220,
        flightMinUSD: 200,
        officialUrl: "https://vistos.mne.gov.pt/en/short-stay-visas-schengen/general-information/visa-fees"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "B-2 Tourist Visa required" },
        difficulty: "hard",
        processingDays: "2~6 months",
        special: "B-2 visitor visa requires US Embassy interview in Tunis. Since 2 Apr 2026 Tunisians may be required to post a $5,000–15,000 visa bond (refundable on compliance). ESTA not available. Apply 6 months ahead.",
        visaFee: 185,
        weeklyLiving: 350,
        flightMinUSD: 800,
        officialUrl: "https://tn.usembassy.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Tourist visa required" },
        difficulty: "moderate",
        processingDays: "Visa required (apply in advance)",
        special: "Tunisian passport is not on Thailand's visa-exemption lists — apply for a tourist visa (Thai e-Visa / Thai embassy in Rabat) before travel. Financial proof and itinerary required. Submit the free Thailand Digital Arrival Card (TDAC) within 3 days before arrival.",
        visaFee: 30,
        weeklyLiving: 150,
        flightMinUSD: 500,
        officialUrl: "https://www.thaievisa.go.th"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa NZD 441" },
        difficulty: "hard",
        processingDays: "Up to 2 weeks (80%)",
        special: "NZeTA not available for Tunisian passport. Standard visitor visa required. Financial evidence and ties to Tunisia needed. Apply via Immigration New Zealand online.",
        visaFee: 255,
        weeklyLiving: 300,
        flightMinUSD: 1200,
        officialUrl: "https://www.immigration.govt.nz/visas/visitor-visa/"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Schengen visa via French consulate in Tunis — one of world's busiest; very large volume causes delays at peak. Fee €90. Biometrics registered in the EU Entry/Exit System (EES) at the border.",
        visaFee: 101,
        weeklyLiving: 300,
        flightMinUSD: 150,
        officialUrl: "https://fr.ambafrance.org/-Tunisie-"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required (€90)" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa (€90) required. Can apply at Dutch, French, or German consulate in Tunis. Financial proof, hotel bookings, and travel insurance required.",
        visaFee: 101,
        weeklyLiving: 320,
        flightMinUSD: 200,
        officialUrl: "https://www.netherlandsworldwide.nl/visa-the-netherlands/schengen-visa"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €90" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa (€90) via Italian consulate in Tunis. Italy-Tunisia proximity (shortest Mediterranean crossing). Historical large Tunisian community in Italy facilitates consulate familiarity.",
        visaFee: 101,
        weeklyLiving: 250,
        flightMinUSD: 100,
        officialUrl: "https://vistoperitalia.esteri.it/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa (€90) via Spanish consulate in Tunis. Covers 29 Schengen countries. EES biometric registration at first entry. 90/180 day rule.",
        visaFee: 101,
        weeklyLiving: 220,
        flightMinUSD: 150,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Tunisian passport → 30-day visa-free entry to Malaysia. KL popular for Tunisian travelers. Halal food widely available. Complete the Malaysia Digital Arrival Card (MDAC) within 3 days before arrival.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 500,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-requirement-by-country/"
      }
    }
  }
};
