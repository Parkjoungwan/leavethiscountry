const FROM_COUNTRIES = {
  india:    { name: "India",     flag: "🇮🇳", code: "IN", passportRank: 80 },
  korea:    { name: "South Korea", flag: "🇰🇷", code: "KR", passportRank: 2 },
  japan:    { name: "Japan",     flag: "🇯🇵", code: "JP", passportRank: 1 },
  hongkong: { name: "Hong Kong", flag: "🇭🇰", code: "HK", passportRank: 19 },
  usa:      { name: "USA",       flag: "🇺🇸", code: "US", passportRank: 8  },
  france:   { name: "France",    flag: "🇫🇷", code: "FR", passportRank: 4  },
  tunisia:  { name: "Tunisia",   flag: "🇹🇳", code: "TN", passportRank: 82 }
};

// Exchange rates vs USD — update quarterly
// Last updated: June 2026
const FROM_CURRENCY = {
  india: {
    code: "INR", symbol: "₹", rateFromUSD: 83.5,
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
    code: "KRW", symbol: "₩", rateFromUSD: 1350,
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
    code: "JPY", symbol: "¥", rateFromUSD: 150,
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
    code: "HKD", symbol: "HK$", rateFromUSD: 7.8,
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
    code: "EUR", symbol: "€", rateFromUSD: 0.92,
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
    code: "TND", symbol: "DT", rateFromUSD: 3.1,
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
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr" },
        difficulty: "moderate",
        processingDays: "56~112 days",
        special: "Post-study 3-year PGWP work permit. GIC deposit CAD 20,635 required.",
        visaFee: 150,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "120~180 days (appointment bottleneck)",
        special: "Public universities FREE. Blocked account €11,904 required. Book embassy appointment immediately after admission.",
        visaFee: 75,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr" },
        difficulty: "moderate",
        processingDays: "29~42 days",
        special: "48 hours/week work allowed during study. GTE (Genuine Temporary Entrant) statement required.",
        visaFee: 710,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "moderate",
        processingDays: "14~28 days",
        special: "Strong job placement in APAC. Student Pass required via ICA.",
        visaFee: 30,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "No income tax. MBZUAI and Khalifa Univ offer scholarships. Visa linked to university enrollment.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/student-visa"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "moderate",
        processingDays: "15 working days",
        special: "IHS fee £776/yr mandatory. Graduate Visa allows 2yr post-study stay. B1 English required.",
        visaFee: 490,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "hard",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "Certificate of Eligibility (CoE) issued by school takes 3 months. JLPT N4+ or IELTS 5.5 required.",
        visaFee: 30,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "EU access after legal residency. Low cost of living. D4 Student Visa. Part-time work 20hr/wk allowed.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=28"
      },
      usa: {
        cost: { annual: 50000, currency: "USD", label: "$40K~60K/yr" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "F-1 visa. OPT 1yr + STEM OPT 2yr = 3yr work authorization after graduation. Largest Indian student diaspora destination.",
        visaFee: 510,
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
        processingDays: "20~28 days",
        special: "Post-study work visa 3yr. Part-time work 20hr/wk during study. Strong engineering and tech programs at Auckland/Canterbury.",
        visaFee: 330,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fee-paying-student-visa"
      },
      france: {
        cost: { annual: 12000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Public universities €170~380/yr. VLS-TS student visa via Campus France. Grandes Écoles require campus France procedure.",
        visaFee: 99,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 18000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "MVV + residence permit via university. Orientation year after graduation. English-taught programs at Delft/Leiden/Amsterdam.",
        visaFee: 207,
        officialUrl: "https://www.nuffic.nl/en/subjects/studying-in-the-netherlands"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Public universities €900~4,000/yr. Type D national visa required. Bologna and Milan Polytechnic top ranked.",
        visaFee: 116,
        officialUrl: "https://www.studiare-in-italia.it/studentistranieri/index_en.html"
      },
      spain: {
        cost: { annual: 10000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Public universities from €800/yr. National D student visa. NIE number required on arrival. Barcelona and Madrid are top hubs.",
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
        cost: { annual: 3500, currency: "USD", label: "CAD 1,500 upfront" },
        difficulty: "moderate",
        processingDays: "56~180 days (Express Entry)",
        special: "Points-based Express Entry system. CRS score 491+ typically needed. LMIA or LMIA-exempt job offer strongly advised.",
        visaFee: 1050,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€120~450 visa fee" },
        difficulty: "easy",
        processingDays: "14~21 days (after appointment)",
        special: "Opportunity Card (Chancenkarte) allows job-seeking without offer. EU Blue Card for salary €45K+. Fastest for skilled workers.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 4640, currency: "USD", label: "AUD 4,640 visa fee" },
        difficulty: "moderate",
        processingDays: "56~112 days",
        special: "TSS (482) visa needs employer sponsor. Points-tested PR via 189/190. Skills assessment by relevant body required.",
        visaFee: 3115,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/working-in-australia"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 EP fee" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Employment Pass requires salary SGD 5,000+/month. Employer applies on your behalf via MyMOM Portal.",
        visaFee: 105,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 3K~5K employer covers" },
        difficulty: "easy",
        processingDays: "5~10 days",
        special: "No income tax. Employer-sponsored. Golden Visa for salary AED 30K+/month. Fastest processing globally.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/residence-visa/employment-visa"
      },
      uk: {
        cost: { annual: 2000, currency: "USD", label: "£719~1,423 visa fee" },
        difficulty: "hard",
        processingDays: "3 weeks (standard), 1 day (priority)",
        special: "Skilled Worker Visa. Salary threshold £38,700+/yr. Sponsor licence required from employer. English B1 mandatory.",
        visaFee: 719,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 1000, currency: "USD", label: "¥3,000~6,000 fee" },
        difficulty: "hard",
        processingDays: "5~10 days",
        special: "Work visa types: Engineer/Specialist, HSP (Highly Skilled). Japanese N2+ strongly preferred. CoE needed from employer.",
        visaFee: 30,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/engineer.html"
      },
      portugal: {
        cost: { annual: 1200, currency: "USD", label: "€90 D3 visa fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "D3 Highly Qualified visa. EU Blue Card available. Tech sector growing fast. NHR tax regime beneficial.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=27"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "$1,710 H-1B fee" },
        difficulty: "hard",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B visa subject to annual lottery (~20% selection rate). Cap at 65,000 (85K with Master's cap). Employer sponsorship mandatory.",
        visaFee: 1710,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "฿5K~15K work permit fee" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "Non-B visa + work permit required. 4:1 Thai-to-foreign employee ratio rule. Many jobs restricted to Thai nationals.",
        visaFee: 40,
        officialUrl: "https://www.dol.go.th/workpermit/Pages/home.aspx"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 750 AEWV fee" },
        difficulty: "moderate",
        processingDays: "35~70 days",
        special: "Accredited Employer Work Visa (AEWV). Employer must be accredited. Median wage NZD 29.66/hr threshold. Skills shortage list helps.",
        visaFee: 750,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/accredited-employer-work-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 Talent Passport" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Talent Passport for skilled workers. EU Blue Card for salary €53K+. Employer files ICT request via OFII. French B1 not mandatory.",
        visaFee: 99,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€207 HSM permit" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "Highly Skilled Migrant (HSM) visa. Fast-tracked IND processing. Salary threshold €5,331/month (2024). 30% tax ruling for expats.",
        visaFee: 207,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi quota system. Limited annual work permits via lottery. EU Blue Card for salary €29K+. Quota fills within hours of opening.",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professionals permit (Ley de Startups). EU Blue Card available. Digital Nomad Visa launched 2023 for remote workers.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Employment Pass via ESD portal. Salary MYR 5,000+/month required. Malaysia Digital (formerly MSC) status companies hire internationally.",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,365 PR fee" },
        difficulty: "moderate",
        processingDays: "180 days (Express Entry PR)",
        special: "Express Entry CRS points system. Provincial Nominee Programs (PNPs) offer alternative pathways. Clear path to citizenship in 3 years.",
        visaFee: 1365,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 residence permit" },
        difficulty: "moderate",
        processingDays: "21~33 months (settlement permit)",
        special: "PR (Niederlassungserlaubnis) after 4 years employment. EU Blue Card reduces to 21 months with B1 German. Path to citizenship.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently-in-germany"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 4,640~8,085 PR fee" },
        difficulty: "hard",
        processingDays: "12~36 months",
        special: "Points-based 189/190/491 visas. Skills assessment mandatory. Age limit 45. State nomination improves chances.",
        visaFee: 4640,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR application" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "PR highly competitive. No points system — discretionary assessment. EP holders with 2+ years in SG have best chances.",
        visaFee: 100,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K~7K Golden Visa" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa for investors, specialists, graduates. No local sponsor required. No income tax ever.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/long-term-residence-visas"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£2,885 ILR fee" },
        difficulty: "hard",
        processingDays: "6 months",
        special: "Indefinite Leave to Remain after 5 years on Skilled Worker visa. Life in UK test required. English mandatory.",
        visaFee: 2885,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥8,000 PR fee" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Permanent residence after 10 years (5 years for HSP). Assimilation requirement strict. Dual citizenship not recognized.",
        visaFee: 55,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/eijusha.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 residence permit" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5 years. EU citizenship path. D7 Passive Income Visa popular for remote workers. Golden Visa from €250K.",
        visaFee: 320,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=21"
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
        cost: { annual: 2000, currency: "USD", label: "$10K+ LTR visa" },
        difficulty: "hard",
        processingDays: "30 days",
        special: "LTR (Long-Term Resident) visa for remote workers $80K+ income. Thailand Elite visa 5~20yr. No path to permanent residency for most.",
        visaFee: 10000,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 3,170 SMC fee" },
        difficulty: "hard",
        processingDays: "12~18 months",
        special: "Skilled Migrant Category. Points-based (age, job offer, work experience, qualification). Invitations issued based on EOI pool. 160 points needed.",
        visaFee: 3170,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-category-resident-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€225 residency fee" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Carte de Résident (10yr) after 5yr legal stay. French B2 required. Naturalization after 5yr (3yr if French university). Strict integration requirements.",
        visaFee: 225,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€167 PR permit" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permanent residence after 5yr. Civic Integration exam required (Dutch language). Dutch citizenship after 5yr PR. Strong expat infrastructure.",
        visaFee: 167,
        officialUrl: "https://ind.nl/en/residence-permits/permanent-residence"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€200 long-stay permit" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE (long-term EU resident) after 5yr. Italian language A2 required. Path to EU citizenship opens after naturalization.",
        visaFee: 200,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residence after 5yr. Spanish A2 language required. Nationality after 10yr (2yr for Iberoamerican countries). Arraigo social path also available.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Malaysia My Second Home (MM2H) 10-year renewable visa. Fixed deposit MYR 500,000 required (revised 2024). No direct PR path — renewable only.",
        visaFee: 1100,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "eTA CAD 7 required" },
        difficulty: "hard",
        processingDays: "Visa required: 2~4 weeks",
        special: "Visa required for Indian passport. eTA not available. Embassy interview may be required. US visa holders may qualify for eTA.",
        visaFee: 100,
        weeklyLiving: 420,
        flightMinUSD: 680,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €80" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa covers 26 EU countries. 90 days in 180 days rule. Travel insurance €30K mandatory.",
        visaFee: 80,
        weeklyLiving: 350,
        flightMinUSD: 380,
        officialUrl: "https://www.schengenvisainfo.com/germany-visa/"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa AUD 190" },
        difficulty: "moderate",
        processingDays: "29 days",
        special: "eVisitor not available for Indians. Subclass 600 visitor visa required. Strong financial ties must be proven.",
        visaFee: 190,
        weeklyLiving: 400,
        flightMinUSD: 320,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free entry",
        special: "Indians get 30-day visa-free entry to Singapore. No application needed. Most accessible high-income destination for Indians.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 100,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visa on arrival free" },
        difficulty: "easy",
        processingDays: "On arrival (14 days)",
        special: "Indians get free 14-day visa on arrival at UAE airports. Extendable to 30 days. No pre-application needed.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 80,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/tourist-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "Visit visa £115" },
        difficulty: "hard",
        processingDays: "15 working days",
        special: "UK Standard Visitor Visa required. Strong rejection history. Proof of ties to home country essential. US/Schengen visa holders get streamlined process.",
        visaFee: 115,
        weeklyLiving: 420,
        flightMinUSD: 450,
        officialUrl: "https://www.gov.uk/standard-visitor-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa required ¥3,000" },
        difficulty: "moderate",
        processingDays: "5 business days",
        special: "Visa required for Indians. Tourist visa up to 90 days. Proof of hotel booking and sufficient funds required. Low rejection rate.",
        visaFee: 25,
        weeklyLiving: 250,
        flightMinUSD: 280,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €80" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa covers 26 countries. Portugal visa centers widely available in India. High approval rate among Schengen countries.",
        visaFee: 80,
        weeklyLiving: 220,
        flightMinUSD: 380,
        officialUrl: "https://vistos.mne.gov.pt/en/national-visas/how-to-apply"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "B-2 tourist visa $185" },
        difficulty: "hard",
        processingDays: "3~5 days (after interview wait: 400~700 days)",
        special: "B-1/B-2 visa required. Interview wait time in India is 400~700 days at major consulates. Apply 1.5yr in advance. Rejection rate ~25%.",
        visaFee: 185,
        weeklyLiving: 350,
        flightMinUSD: 600,
        officialUrl: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free (since Nov 2023)",
        special: "India-Thailand visa-free since November 2023. 30-day free entry. Most popular budget destination from India. Bali-like vibes at half the cost.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 150,
        officialUrl: "https://www.thaiembassy.com/thailand/thailand-visa-exemption.php"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa NZD 211" },
        difficulty: "moderate",
        processingDays: "15~20 days",
        special: "Visitor visa required for Indians. Online application via Immigration NZ. Proof of funds and return ticket required. 9-month validity.",
        visaFee: 211,
        weeklyLiving: 180,
        flightMinUSD: 580,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/visitor-visa"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €80" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa covers 26 EU countries. France visa via VFS Global widely available in India. Paris is top Indian tourist destination in Europe.",
        visaFee: 80,
        weeklyLiving: 280,
        flightMinUSD: 420,
        officialUrl: "https://france-visas.gouv.fr"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €80" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa. Apply at VFS Netherlands centers across India. Amsterdam entry = 26-country Schengen access. Rejection rate lower than France/UK.",
        visaFee: 80,
        weeklyLiving: 320,
        flightMinUSD: 380,
        officialUrl: "https://www.netherlandsworldwide.nl/countries/india/visas-and-travel/tourist-visa-netherlands"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €80" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa. Italy popular for food/culture tourism. Apply via VFS Italy centers. Summer appointments fill fast — book 2 months ahead.",
        visaFee: 80,
        weeklyLiving: 230,
        flightMinUSD: 400,
        officialUrl: "https://vfsglobal.com/en/individuals/article/italy-visas"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa €80" },
        difficulty: "moderate",
        processingDays: "15 days",
        special: "Schengen visa. Spain visa via VFS Global centers. Barcelona and Madrid entry points. Summer/Christmas appointments are scarce — apply early.",
        visaFee: 80,
        weeklyLiving: 220,
        flightMinUSD: 420,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free entry",
        special: "Indians get 30-day visa-free entry to Malaysia. Popular for budget travel: Kuala Lumpur, Penang, Langkawi. Cheapest flight from most Indian cities.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 100,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-exemption.html"
      }
    }
  },
  korea: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr" },
        difficulty: "easy",
        processingDays: "28~56 days",
        special: "Korean passport holders get faster processing. Post-study PGWP 3 years. GIC deposit required.",
        visaFee: 150,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "Public universities FREE. Blocked account €11,904 required. Korea-Germany strong bilateral ties ease processing.",
        visaFee: 75,
        officialUrl: "https://www.make-it-in-germany.com"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "Korean applicants have high approval rate. Working Holiday option available for under 30. Post-study 2~4yr visa.",
        visaFee: 710,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Koreans enjoy strong reputation. NUS/NTU world top 20. Student Pass via ICA. Easy travel within ASEAN.",
        visaFee: 30,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Korean passport has strong standing. Tax-free living. Several Korean university branches in UAE.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/student-visa"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "15 working days",
        special: "Korean applicants have high UK visa approval rate. Graduate Visa 2yr post-study. IHS £776/yr.",
        visaFee: 490,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "easy",
        processingDays: "3~5 days (after CoE)",
        special: "Cultural and language affinity. Many Korean students in Japan. N2 Japanese preferred. CoE takes 1~3 months from school.",
        visaFee: 30,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "EU access from Portugal. D4 Visa. Growing Korean expat community in Lisbon. Low cost vs. UK/Australia.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt"
      },
      usa: {
        cost: { annual: 45000, currency: "USD", label: "$35K~55K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "F-1 visa. Strong Korean alumni networks at US universities. OPT 1yr + STEM OPT 2yr work authorization. Top destination for Korean PhD students.",
        visaFee: 510,
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
        special: "Fast-tracked for Korean nationals. Working Holiday option for under 30. Post-study 3yr visa. Auckland/Wellington are top choices.",
        visaFee: 330,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fee-paying-student-visa"
      },
      france: {
        cost: { annual: 10000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "Campus France procedure mandatory. VLS-TS student visa. Grandes Écoles popular with Korean students. French language B2 required for some programs.",
        visaFee: 99,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 16000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MVV + residence permit. Orientation year after graduation. Delft/TU/e strong in engineering. English-language programs widely available.",
        visaFee: 207,
        officialUrl: "https://www.nuffic.nl/en/subjects/studying-in-the-netherlands"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Public universities from €900/yr. National D visa required despite Schengen-free travel. Permesso di soggiorno required on arrival.",
        visaFee: 116,
        officialUrl: "https://www.studiare-in-italia.it/studentistranieri/index_en.html"
      },
      spain: {
        cost: { annual: 9000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "National D student visa required despite Schengen-free entry for short stays. NIE required on arrival. Spanish language popular among Korean students.",
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
        cost: { annual: 3500, currency: "USD", label: "CAD 1,050 work permit" },
        difficulty: "easy",
        processingDays: "56~112 days",
        special: "IEC Working Holiday for Koreans under 35: open work permit, no job offer needed. Express Entry also available.",
        visaFee: 1050,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€120~450 visa fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Working Holiday for Koreans under 30. Opportunity Card available. Strong demand for Korean engineers in auto/semiconductor sector.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 635 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (462) for Koreans under 35. Can extend to 3 years. TSS employer-sponsored visa also available.",
        visaFee: 635,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 EP fee" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Korean professionals highly sought in tech/finance. EP salary minimum SGD 5,000. Employer applies. Fastest in APAC.",
        visaFee: 105,
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
        cost: { annual: 2000, currency: "USD", label: "£719~1,423 visa fee" },
        difficulty: "moderate",
        processingDays: "3 weeks",
        special: "Youth Mobility Scheme (YMS) for Koreans under 30: open work permit. Skilled Worker requires sponsor & £38,700/yr salary.",
        visaFee: 719,
        officialUrl: "https://www.gov.uk/youth-mobility"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥3,000 fee" },
        difficulty: "easy",
        processingDays: "5 days",
        special: "Working Holiday for Koreans. Strong Korean demand in IT, gaming, K-content related industries. Japanese language a major plus.",
        visaFee: 30,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€90 D3 fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "Digital Nomad Visa (D8) popular for remote workers. Tech startups hiring. Gateway to EU job market.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "$1,710 H-1B fee" },
        difficulty: "moderate",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B same lottery as India (~20% rate). However E-3-like bilateral could improve in future. L-1 intracompany available for Samsung/LG/Hyundai employees.",
        visaFee: 1710,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "Non-B + work permit" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Non-B visa + work permit. Korean companies (Samsung, Lotte, Hyundai) have Thai offices hiring Koreans. Teaching English also viable.",
        visaFee: 40,
        officialUrl: "https://www.dol.go.th/workpermit/Pages/home.aspx"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 750 AEWV fee" },
        difficulty: "easy",
        processingDays: "21~35 days",
        special: "AEWV for Koreans with faster processing due to bilateral ties. Working Holiday for under 30: open work permit, no job needed.",
        visaFee: 750,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/accredited-employer-work-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 Talent Passport" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Talent Passport for qualified workers. Working Holiday (PVT) for Koreans under 30: open work permit, no job offer needed.",
        visaFee: 99,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€207 HSM permit" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "HSM visa with priority IND processing. 30% tax ruling applies. Strong demand for Korean engineers in ASML/Philips/Shell. Salary threshold €5,331/month.",
        visaFee: 207,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi quota system affects all non-EU citizens equally. Korean passport doesn't provide advantage over Indian passport for work immigration.",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professionals permit. Digital Nomad Visa 2023 for remote workers earning €2,160+/month. Tech sector growing in Barcelona and Madrid.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Employment Pass: salary MYR 5,000+/month. Korean companies (Samsung, Lotte, Korean Air) operate in Malaysia. Malaysia Digital status company benefits.",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,365 PR fee" },
        difficulty: "easy",
        processingDays: "180 days",
        special: "Koreans have high CRS scores due to education/language. Clear 3-year citizenship path after PR. Strong Korean diaspora.",
        visaFee: 1365,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 permit fee" },
        difficulty: "moderate",
        processingDays: "21~33 months",
        special: "EU Blue Card after job offer €45K+. Settlement permit after 4yr. Dual citizenship now allowed for Koreans since 2024.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 4,640 PR fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "Points test 189/190/491. Koreans score well on age/education. State nomination (190) adds 5 points.",
        visaFee: 4640,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR fee" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "Discretionary, no clear points system. Koreans with EP 2yr+ and family ties have better chances. Very competitive.",
        visaFee: 100,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K Golden Visa fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa. No income tax. Large Korean expat community. Salary AED 30K+/month qualifies.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/long-term-residence-visas"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£2,885 ILR fee" },
        difficulty: "moderate",
        processingDays: "6 months",
        special: "ILR after 5yr on Skilled Worker. Life in UK test. English required. Koreans have good track record.",
        visaFee: 2885,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥8,000 PR fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "PR after 10yr (5yr with HSP visa). Largest Korean diaspora in Japan ~440K. Dual citizenship not allowed.",
        visaFee: 55,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/eijusha.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 permit fee" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5yr. EU citizenship path. D7 Remote Worker Visa easy entry point. Growing Korean expat scene in Lisbon.",
        visaFee: 320,
        officialUrl: "https://www.sef.pt"
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
        cost: { annual: 2000, currency: "USD", label: "$10K+ LTR visa" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "LTR visa for remote workers $80K+ income. Thailand Elite visa. No formal PR path. Growing Korean expat community in Chiang Mai and Phuket.",
        visaFee: 10000,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 3,170 SMC fee" },
        difficulty: "moderate",
        processingDays: "12 months",
        special: "Skilled Migrant Category. Points-based. Koreans score well on age and qualifications. Job offer adds significant points. Clear path to NZ citizenship.",
        visaFee: 3170,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-category-resident-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€225 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Carte de Résident after 5yr legal stay. French B2 required. Dual citizenship allowed. Strong Korea-France cultural relations. PVT working holiday helps build residency.",
        visaFee: 225,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€167 PR permit" },
        difficulty: "hard",
        processingDays: "6 months",
        special: "PR after 5yr. Dutch civic integration exam (B1 spoken Dutch) required. No dual citizenship — must renounce Korean passport. Inburgeringsexamen fees €1,000–3,000.",
        visaFee: 167,
        officialUrl: "https://ind.nl/en/residence-permits/permanent-residence"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€200 long-stay permit" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE after 5yr. Italian A2 required. Korean passport holders must apply for national work visa first — no shortcut via Schengen.",
        visaFee: 200,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residency after 5yr. Spanish A2 required. Nationality after 10yr. Arraigo social work path possible after 3yr residence. Digital Nomad Visa 2023 entry option.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MM2H 10-year renewable visa. Fixed deposit MYR 500,000 required. No path to PR or citizenship but stable long-term residency. Korean community strong in KL.",
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
        visaFee: 7,
        weeklyLiving: 420,
        flightMinUSD: 720,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → visa-free Schengen access. 90 days in 180 days across 26 EU countries. No application needed.",
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
        visaFee: 20,
        weeklyLiving: 400,
        flightMinUSD: 380,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 30-day visa-free entry. Singapore ranks 1st globally on passport index. Zero hassle.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 130,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 30-day visa-free entry to UAE. Extendable. No application required.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 350,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 6 months" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 6-month visa-free entry to UK. No ETA required currently. One of best travel perks of Korean passport.",
        visaFee: 0,
        weeklyLiving: 420,
        flightMinUSD: 550,
        officialUrl: "https://www.gov.uk/check-uk-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 90-day visa-free entry. Closest major destination. Multiple entry allowed. No application.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 60,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free. Portugal entry = access to 26 Schengen countries. 90/180 day rule.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 480,
        officialUrl: "https://www.schengenvisainfo.com/portugal-visa/"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "ESTA $21 (Visa Waiver)" },
        difficulty: "easy",
        processingDays: "Minutes (ESTA online)",
        special: "Korean passport → ESTA Visa Waiver Program. 90-day visa-free entry. Apply ESTA online at least 72hr before departure.",
        visaFee: 21,
        weeklyLiving: 350,
        flightMinUSD: 800,
        officialUrl: "https://esta.cbp.dhs.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 30-day visa-free. Thailand most popular overseas destination for Koreans. Bangkok, Phuket, Chiang Mai all visa-free.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 150,
        officialUrl: "https://www.thaiembassy.com/thailand/thailand-visa-exemption.php"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 23" },
        difficulty: "easy",
        processingDays: "Minutes (NZeTA online)",
        special: "Korean passport → NZeTA (Electronic Travel Authority). Online in minutes. 90-day entry up to 6 months per year. IVL tourism levy $35 also required.",
        visaFee: 23,
        weeklyLiving: 180,
        flightMinUSD: 700,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free. France is #1 tourist destination in the world. 90/180 day rule across 26 Schengen countries.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 520,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free. Amsterdam entry = 26-country Schengen access. No application needed.",
        visaFee: 0,
        weeklyLiving: 320,
        flightMinUSD: 500,
        officialUrl: "https://www.schengenvisainfo.com/netherlands-visa/"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free. Rome, Florence, Venice all accessible. 90/180 day rule. Italy is 2nd most visited Schengen country by Koreans.",
        visaFee: 0,
        weeklyLiving: 230,
        flightMinUSD: 540,
        officialUrl: "https://www.schengenvisainfo.com/italy-visa/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → Schengen visa-free. Barcelona and Madrid are top Korean tourist destinations. 90/180 day rule applies.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 560,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Korean passport → 90-day visa-free entry. Malaysia is most accessible budget destination from Korea after Japan and Thailand. Strong Korean community in KL.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 180,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-exemption.html"
      }
    }
  },
  japan: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr" },
        difficulty: "easy",
        processingDays: "28~56 days",
        special: "SDS (Student Direct Stream) available for Japanese students. Post-study PGWP 3 years. GIC deposit required. Low rejection rate.",
        visaFee: 150,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "Public universities FREE. Blocked account €11,904 required. Strong Japan-Germany academic exchange. German or English programs available.",
        visaFee: 75,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "Japanese applicants have very high approval rate. Working Holiday option for under 30. Post-study 2~4yr visa available.",
        visaFee: 710,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Japanese students highly regarded at NUS/NTU (world top 20). Student Pass via ICA. Gateway to ASEAN career opportunities.",
        visaFee: 30,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Tax-free living. Strong Japan-UAE bilateral ties. Japanese university exchange programs available. Fast visa processing.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/student-visa"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "15 working days",
        special: "Japanese applicants have excellent UK visa approval rate. Graduate Visa 2yr post-study. IHS £776/yr. Strong Russell Group presence.",
        visaFee: 490,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "EU access from Portugal. D4 Student Visa. Low cost vs. UK/Australia. Growing Japanese expat community in Lisbon.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=28"
      },
      usa: {
        cost: { annual: 45000, currency: "USD", label: "$35K~55K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "F-1 visa. OPT 1yr + STEM OPT 2yr work authorization. Large Japanese student community in USA. Top destination for Japanese graduate students.",
        visaFee: 510,
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
        special: "Fast processing for Japanese nationals. Working Holiday for under 30. Post-study 3yr visa. Auckland and Canterbury popular for Japanese students.",
        visaFee: 330,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fee-paying-student-visa"
      },
      france: {
        cost: { annual: 10000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "Campus France procedure mandatory. VLS-TS student visa. Japan-France strong cultural ties. Many Japanese students in Paris art/fashion programs.",
        visaFee: 99,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 16000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MVV + residence permit via university. Orientation year after graduation. English-taught programs at Delft/Leiden/Amsterdam.",
        visaFee: 207,
        officialUrl: "https://www.nuffic.nl/en/subjects/studying-in-the-netherlands"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "National D visa required despite Schengen-free travel for Japanese. Public universities from €900/yr. Design and fashion programs world-renowned.",
        visaFee: 116,
        officialUrl: "https://www.studiare-in-italia.it/studentistranieri/index_en.html"
      },
      spain: {
        cost: { annual: 9000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "National D student visa required for long-term study. NIE required on arrival. Spanish language and cultural programs popular with Japanese students.",
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
        cost: { annual: 3500, currency: "USD", label: "CAD 1,050 work permit" },
        difficulty: "easy",
        processingDays: "56~112 days",
        special: "IEC Working Holiday for Japanese under 35: open work permit, no job offer needed. Express Entry also available. Strong bilateral Canada-Japan ties.",
        visaFee: 1050,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€120~450 visa fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Working Holiday for Japanese under 30. Opportunity Card available. Strong demand for Japanese engineers in auto/manufacturing (VW, BMW, Siemens).",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 635 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (462) for Japanese under 30. Can extend to 3 years with regional work. Skilled employer-sponsored TSS visa also available.",
        visaFee: 635,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 EP fee" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Japanese professionals highly sought in finance, tech, and manufacturing. EP salary min SGD 5,000. Employer applies. Fastest processing in APAC.",
        visaFee: 105,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Employer covers cost" },
        difficulty: "easy",
        processingDays: "5~10 days",
        special: "Zero income tax. Japanese firms (Toyota, Sony, Mitsubishi) hiring in Dubai. Golden Visa for high earners AED 30K+/month.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/residence-visa/employment-visa"
      },
      uk: {
        cost: { annual: 2000, currency: "USD", label: "£719 visa fee" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Youth Mobility Scheme for Japanese under 30: open work permit. Skilled Worker visa requires sponsor + £38,700/yr. Strong Japan-UK bilateral relationship.",
        visaFee: 719,
        officialUrl: "https://www.gov.uk/youth-mobility"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€90 D3 fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "D3 Highly Qualified visa. Digital Nomad Visa (D8) popular for Japanese remote workers. EU gateway. Growing Japanese startup scene in Lisbon.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=27"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "$1,710 H-1B fee" },
        difficulty: "hard",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B lottery ~20% rate. Japan has no bilateral E-3 equivalent. L-1 intracompany transfer available for Toyota/Sony/Honda employees. E-2 treaty investor visa available.",
        visaFee: 1710,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "Non-B + work permit" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Non-B visa + work permit. Japanese companies (Toyota, Honda, Nissan, Canon) are largest foreign employers in Thailand. Easy placement for Japanese speakers.",
        visaFee: 40,
        officialUrl: "https://www.dol.go.th/workpermit/Pages/home.aspx"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 750 AEWV fee" },
        difficulty: "easy",
        processingDays: "21~35 days",
        special: "AEWV with strong bilateral ties. Working Holiday for Japanese under 30: open work permit, no job offer needed. Agriculture and hospitality sectors welcome Japanese.",
        visaFee: 750,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/accredited-employer-work-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 Talent Passport" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Talent Passport for qualified workers. Working Holiday (PVT) for Japanese under 30: open work permit. Strong demand for Japanese professionals in luxury/fashion.",
        visaFee: 99,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€207 HSM permit" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "HSM visa with priority IND processing. 30% tax ruling for expats. Strong demand for Japanese engineers at ASML/Philips. Salary threshold €5,331/month.",
        visaFee: 207,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi quota system. Limited annual permits. EU Blue Card for salary €29K+. Niche demand for Japanese professionals in fashion/design/automotive.",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professionals permit. Digital Nomad Visa (Ley de Startups) for remote workers earning €2,160+/month. Barcelona tech scene growing.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "Employment Pass: MYR 5,000+/month. Japanese firms (Toyota, Daikin, Sharp, Panasonic) are major employers in Malaysia. Easy approval for Japanese nationals.",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,365 PR fee" },
        difficulty: "easy",
        processingDays: "180 days",
        special: "Express Entry. Japanese score very well on CRS due to education/language. Clear 3-year citizenship path after PR. Dual citizenship allowed.",
        visaFee: 1365,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 permit fee" },
        difficulty: "moderate",
        processingDays: "21~33 months",
        special: "EU Blue Card after job offer €45K+. Settlement permit after 4yr. Germany now allows dual citizenship since 2024. Strong Japan-Germany industrial ties.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently-in-germany"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 4,640 PR fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "Points-based 189/190/491. Japanese score well on age and education. Working Holiday → skilled visa → PR pathway popular. State nomination (190) helps.",
        visaFee: 4640,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR fee" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "Discretionary PR. No points system. Japanese with EP 2yr+ and Singapore ties have better chances. Very competitive — acceptance rate under 50%.",
        visaFee: 100,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K Golden Visa fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa. No income tax. Salary AED 30K+/month qualifies. Japanese professionals in finance and engineering qualify easily.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/long-term-residence-visas"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£2,885 ILR fee" },
        difficulty: "easy",
        processingDays: "6 months",
        special: "ILR after 5yr on Skilled Worker. Life in UK test. English required. Japanese applicants have high approval rate. Dual citizenship with Japan requires renouncing Japanese.",
        visaFee: 2885,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 permit fee" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5yr. EU citizenship path. D7/D8 visa entry points popular with Japanese digital nomads. Growing Japanese expat community in Lisbon.",
        visaFee: 320,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=21"
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
        cost: { annual: 2000, currency: "USD", label: "$10K+ LTR visa" },
        difficulty: "hard",
        processingDays: "30 days",
        special: "LTR visa for remote workers $80K+ income. Thailand Elite visa 5~20yr. No path to permanent residency. Large Japanese retiree community in Chiang Mai.",
        visaFee: 10000,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 3,170 SMC fee" },
        difficulty: "moderate",
        processingDays: "12 months",
        special: "Skilled Migrant Category. Points-based. Japanese score well on age and qualifications. Job offer adds significant points. Clear path to NZ citizenship.",
        visaFee: 3170,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-category-resident-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€225 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Carte de Résident after 5yr legal stay. French B2 required. Dual citizenship allowed. Strong France-Japan cultural ties. Japanese community in Paris large.",
        visaFee: 225,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€167 PR permit" },
        difficulty: "easy",
        processingDays: "6 months",
        special: "PR after 5yr. Dutch civic integration exam required. 30% tax ruling for first 5yr. Strong expat infrastructure. Dual citizenship with Japan requires renouncing Japanese.",
        visaFee: 167,
        officialUrl: "https://ind.nl/en/residence-permits/permanent-residence"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€200 long-stay permit" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE after 5yr. Italian A2 required. EU citizenship path after naturalization (10yr). Japanese community in Milan and Rome.",
        visaFee: 200,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residency after 5yr. Spanish A2 required. Nationality after 10yr. Digital Nomad Visa 2023 is easy entry point for remote-working Japanese.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MM2H 10-year renewable visa. Fixed deposit MYR 500,000 required. Popular with Japanese retirees. No path to PR but stable long-term residency. Japanese community strong in KL.",
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
        visaFee: 7,
        weeklyLiving: 420,
        flightMinUSD: 800,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → visa-free Schengen. 90 days in 180 days across 26 EU countries. No application needed. Japan top Schengen tourism source.",
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
        visaFee: 20,
        weeklyLiving: 400,
        flightMinUSD: 350,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 30-day visa-free Singapore. Popular stop for Japanese traveling to Southeast Asia. World-class food, clean city.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 80,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 30-day visa-free UAE. Dubai popular with Japanese tourists. Luxury shopping, desert experiences. Extendable on arrival.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 300,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 6 months" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 6-month visa-free UK. London is top European destination for Japanese tourists. No ETA required currently.",
        visaFee: 0,
        weeklyLiving: 420,
        flightMinUSD: 700,
        officialUrl: "https://www.gov.uk/check-uk-visa"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free. Portugal entry = 26-country Schengen access. 90/180 day rule. Growing popularity among Japanese travelers.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/portugal-visa/"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "ESTA $21 (Visa Waiver)" },
        difficulty: "easy",
        processingDays: "Minutes (ESTA online)",
        special: "Japanese passport → ESTA Visa Waiver. 90-day visa-free entry. USA is top long-haul destination for Japanese. Apply ESTA 72hr before departure.",
        visaFee: 21,
        weeklyLiving: 350,
        flightMinUSD: 700,
        officialUrl: "https://esta.cbp.dhs.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 30-day visa-free Thailand. Thailand is consistently #1 overseas destination for Japanese tourists. Bangkok, Phuket, Chiang Mai.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 80,
        officialUrl: "https://www.thaiembassy.com/thailand/thailand-visa-exemption.php"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 23" },
        difficulty: "easy",
        processingDays: "Minutes (NZeTA online)",
        special: "Japanese passport → NZeTA online in minutes. 90-day entry. IVL tourism levy NZD 35 also required. New Zealand very popular with Japanese travelers.",
        visaFee: 23,
        weeklyLiving: 180,
        flightMinUSD: 650,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free. Paris is the #1 European destination for Japanese tourists. Japan-France cultural exchange is exceptionally strong.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free. Amsterdam popular with Japanese tourists. Van Gogh, Vermeer — strong Netherlands-Japan art history connection.",
        visaFee: 0,
        weeklyLiving: 320,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/netherlands-visa/"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free. Italy is top European destination for Japanese tourists. Rome, Florence, Venice, Amalfi Coast iconic stops.",
        visaFee: 0,
        weeklyLiving: 230,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/italy-visa/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → Schengen visa-free. Barcelona and Madrid popular. Flamenco, Gaudi, and tapas culture appeals strongly to Japanese travelers.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 700,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Japanese passport → 90-day visa-free Malaysia. Cheapest destination from Japan (aside from Southeast Asia). Japanese community in KL growing fast.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 80,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-exemption.html"
      }
    }
  },
  hongkong: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 35K~45K/yr" },
        difficulty: "easy",
        processingDays: "28~56 days",
        special: "SDS stream available for HK students. PGWP 3yr post-study. GIC deposit required. Canada has dedicated HK Pathway PR stream.",
        visaFee: 150,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "Public universities FREE. Blocked account €11,904 required. Strong HK-Germany academic ties. English-medium programs widely available.",
        visaFee: 75,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "HK applicants have high approval rate. Post-study 2~4yr visa. Working Holiday option under 30. Australia popular HK emigration destination.",
        visaFee: 710,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Many HK students choose Singapore as alternative financial hub base. NUS/NTU world top 20. Cantonese spoken in some communities. Strong APAC career launch.",
        visaFee: 30,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Tax-free living. Fast visa processing. International universities in UAE. HK finance professionals use UAE as stepping stone.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/student-visa"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "15 working days",
        special: "UK is top HK emigration destination. BN(O) holders get streamlined entry. Graduate Visa 2yr post-study. IHS £776/yr. Strong HK-UK historical ties.",
        visaFee: 490,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "easy",
        processingDays: "3~5 days (after CoE)",
        special: "CoE issued by school takes 1~3 months. Cantonese-Japanese cultural proximity. Many HK students choose Japan for anime/culture. N2 Japanese preferred at top schools.",
        visaFee: 30,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "EU access from Portugal. D4 visa. Growing HK expat community in Lisbon. Low cost vs. UK. Strong internet for online work.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=28"
      },
      usa: {
        cost: { annual: 45000, currency: "USD", label: "$35K~55K/yr" },
        difficulty: "easy",
        processingDays: "14~30 days",
        special: "F-1 visa. Large HK student community in USA (Harvard, MIT, Caltech). OPT + STEM OPT 3yr work authorization. Top destination for HK graduate students.",
        visaFee: 510,
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
        special: "Fast processing. Post-study 3yr visa. Working Holiday for under 30. Auckland popular with HK families emigrating. Clean environment, low density — appealing to HK residents.",
        visaFee: 330,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fee-paying-student-visa"
      },
      france: {
        cost: { annual: 10000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "Campus France procedure. VLS-TS student visa. France-HK cultural ties strong. Cantonese community in Paris (Belleville). Fashion/art programs popular.",
        visaFee: 99,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 16000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MVV + residence permit. Orientation year post-graduation. English-taught programs at Delft/Rotterdam/Amsterdam. Growing HK expat base in Amsterdam.",
        visaFee: 207,
        officialUrl: "https://www.nuffic.nl/en/subjects/studying-in-the-netherlands"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "National D visa required despite Schengen-free travel. Public universities from €900/yr. Architecture and design programs world-class.",
        visaFee: 116,
        officialUrl: "https://www.studiare-in-italia.it/studentistranieri/index_en.html"
      },
      spain: {
        cost: { annual: 9000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15 days",
        special: "National D student visa for long-term study. NIE required on arrival. Barcelona popular lifestyle destination for HK students seeking EU base.",
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
        cost: { annual: 3500, currency: "USD", label: "CAD 1,050 work permit" },
        difficulty: "easy",
        processingDays: "56~112 days",
        special: "IEC Working Holiday. HK Pathway (open work permit) for BN(O) holders. Express Entry for permanent residence. Largest HK diaspora destination post-2020.",
        visaFee: 1050,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€120~450 visa fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Opportunity Card and EU Blue Card available. Working Holiday for HK under 30. Strong financial and engineering demand. Fintech sector growing.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 635 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday for HK under 30. TSS employer-sponsored visa. HK finance professionals sought in Sydney. Australia has large HK migrant community.",
        visaFee: 635,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 EP fee" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "HK finance professionals highly sought in Singapore after 2020. EP salary min SGD 5,000. Singapore explicitly recruits HK talent. Cantonese widely spoken.",
        visaFee: 105,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Employer covers cost" },
        difficulty: "easy",
        processingDays: "5~10 days",
        special: "Zero income tax. HK finance and real estate professionals in demand in Dubai. Golden Visa for high earners. Large HK expat community in Dubai.",
        visaFee: 0,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/residence-visa/employment-visa"
      },
      uk: {
        cost: { annual: 2000, currency: "USD", label: "£719 visa fee" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "BN(O) holders: 5yr UK residency pathway → ILR → citizenship. Youth Mobility for under 30. Skilled Worker visa available. UK most popular HK emigration destination.",
        visaFee: 719,
        officialUrl: "https://www.gov.uk/british-national-overseas-bno-visa"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥3,000 visa fee" },
        difficulty: "moderate",
        processingDays: "5~10 days",
        special: "Engineer/Specialist or HSP (Highly Skilled Professional) visa. Japanese N2+ preferred. Strong Cantonese-Japanese business ties. Finance sector in Tokyo welcomes HK talent.",
        visaFee: 30,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/engineer.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€90 D3 fee" },
        difficulty: "easy",
        processingDays: "60 days",
        special: "D3 Highly Qualified visa. Digital Nomad Visa (D8) for remote workers. EU gateway. Growing HK expat community in Lisbon.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=27"
      },
      usa: {
        cost: { annual: 3500, currency: "USD", label: "$1,710 H-1B fee" },
        difficulty: "hard",
        processingDays: "90~180 days (lottery April)",
        special: "H-1B lottery ~20%. L-1 intracompany transfer available for HK-based multinational employees. E-2 treaty investor visa available. Finance sector has OPT→H-1B pipeline.",
        visaFee: 1710,
        officialUrl: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations"
      },
      thailand: {
        cost: { annual: 1500, currency: "USD", label: "Non-B + work permit" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Non-B visa + work permit. HK companies operate regional offices in Bangkok. Finance and hospitality sectors welcome HK professionals. Cantonese widely understood.",
        visaFee: 40,
        officialUrl: "https://www.dol.go.th/workpermit/Pages/home.aspx"
      },
      newzealand: {
        cost: { annual: 2500, currency: "USD", label: "NZD 750 AEWV fee" },
        difficulty: "easy",
        processingDays: "21~35 days",
        special: "AEWV. Working Holiday for HK under 30. Finance and tech sectors growing in Auckland. Popular family emigration + work destination for HK residents.",
        visaFee: 750,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/accredited-employer-work-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 Talent Passport" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "Talent Passport for skilled workers. PVT working holiday for HK under 30. Finance and luxury goods sectors in Paris welcome HK talent.",
        visaFee: 99,
        officialUrl: "https://france-visas.gouv.fr/en_US/web/france-visas/passeport-talent"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€207 HSM permit" },
        difficulty: "easy",
        processingDays: "14 days",
        special: "HSM visa with priority IND processing. 30% tax ruling. Strong financial sector in Amsterdam. ASML and Shell hire HK finance/tech professionals.",
        visaFee: 207,
        officialUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€116 work visa" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "Decreto Flussi quota system. Limited permits. Luxury goods and fashion industry has niche demand for HK professionals with China market expertise.",
        visaFee: 116,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-working-italy"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€80 work visa" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Highly Qualified Professionals permit. Digital Nomad Visa for remote workers. Barcelona tech and hospitality sectors welcome HK talent.",
        visaFee: 80,
        officialUrl: "https://www.exteriores.gob.es/en/ServiciosAlCiudadano/Paginas/Visados.aspx"
      },
      malaysia: {
        cost: { annual: 1500, currency: "USD", label: "MYR 1,200 EP fee" },
        difficulty: "easy",
        processingDays: "7~14 days",
        special: "Employment Pass: MYR 5,000+/month. HK and Malaysian Chinese share Cantonese/Hokkien cultural ties. HK companies have KL offices. Easiest Asian work destination from HK.",
        visaFee: 270,
        officialUrl: "https://esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 5000, currency: "USD", label: "CAD 1,365 PR fee" },
        difficulty: "easy",
        processingDays: "180 days",
        special: "Dedicated HK Pathway: open work permit → PR → citizenship. Largest HK emigration wave since 2020. Over 40,000 HK residents immigrated to Canada annually since 2021.",
        visaFee: 1365,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/hong-kong-residents.html"
      },
      germany: {
        cost: { annual: 1500, currency: "USD", label: "€120 permit fee" },
        difficulty: "moderate",
        processingDays: "21~33 months",
        special: "EU Blue Card after job offer €45K+. Settlement permit after 4yr. Dual citizenship since 2024. Strong HK-Germany financial ties via Deutsche Bank and HK offices.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/living-permanently-in-germany"
      },
      australia: {
        cost: { annual: 8000, currency: "USD", label: "AUD 4,640 PR fee" },
        difficulty: "easy",
        processingDays: "12~24 months",
        special: "Australia has special HK resident migration incentives. Points-based 189/190/491. Strong HK community in Sydney and Melbourne. Mandarin/Cantonese services widely available.",
        visaFee: 4640,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/permanent-resident"
      },
      singapore: {
        cost: { annual: 500, currency: "USD", label: "SGD 100 PR fee" },
        difficulty: "hard",
        processingDays: "4~6 months",
        special: "PR highly competitive despite HK influx post-2020. Discretionary assessment. EP 2yr+ with strong SG economic ties increases chances. Very competitive — under 50% acceptance.",
        visaFee: 100,
        officialUrl: "https://www.ica.gov.sg/reside/PR/apply"
      },
      uae: {
        cost: { annual: 2000, currency: "USD", label: "AED 3K Golden Visa fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "10-year Golden Visa. No income tax. Salary AED 30K+/month qualifies. UAE popular with HK real estate investors and finance professionals fleeing taxation concerns.",
        visaFee: 2722,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/long-term-residence-visas"
      },
      uk: {
        cost: { annual: 3000, currency: "USD", label: "£2,885 ILR fee" },
        difficulty: "easy",
        processingDays: "5 years (BN(O) pathway)",
        special: "BN(O) Pathway: 5yr residency → ILR → British citizenship. UK has accepted over 200,000 HK residents since 2021. Easiest formal emigration route globally for HK residents.",
        visaFee: 2885,
        officialUrl: "https://www.gov.uk/british-national-overseas-bno-visa"
      },
      japan: {
        cost: { annual: 500, currency: "USD", label: "¥8,000 PR fee" },
        difficulty: "hard",
        processingDays: "6~12 months",
        special: "PR after 10yr (5yr with HSP). Strict assimilation requirements. Dual citizenship not recognized — must renounce HKSAR passport. Small but growing HK community in Tokyo.",
        visaFee: 55,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/eijusha.html"
      },
      portugal: {
        cost: { annual: 1000, currency: "USD", label: "€320 permit fee" },
        difficulty: "easy",
        processingDays: "60~120 days",
        special: "PR after 5yr. EU citizenship path. D7/D8 Remote Worker Visa entry point popular with HK digital professionals. Growing HK expat community in Lisbon and Porto.",
        visaFee: 320,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=21"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "$1,440 Green Card fee" },
        difficulty: "moderate",
        processingDays: "3~5 years (EB for HK)",
        special: "EB-2/EB-3 Green Card. HK residents have much shorter wait than India. US Hong Kong Policy Act provides some special considerations. Citizenship after 5yr.",
        visaFee: 1440,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "$10K+ LTR visa" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "LTR visa for remote workers $80K+ income. Thailand Elite visa popular with HK retirees. No direct PR path. Cantonese spoken in Thai-Chinese communities.",
        visaFee: 10000,
        officialUrl: "https://ltr.boi.go.th"
      },
      newzealand: {
        cost: { annual: 3500, currency: "USD", label: "NZD 3,170 SMC fee" },
        difficulty: "moderate",
        processingDays: "12 months",
        special: "Skilled Migrant Category. HK professionals score well on qualifications. Auckland has large Cantonese-speaking community. NZ popular family emigration destination from HK.",
        visaFee: 3170,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-category-resident-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€225 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Carte de Résident after 5yr. French B2 required. Cantonese-speaking community in Paris (Belleville district). Dual citizenship allowed — popular with HK professionals.",
        visaFee: 225,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/N110"
      },
      netherlands: {
        cost: { annual: 2000, currency: "USD", label: "€167 PR permit" },
        difficulty: "easy",
        processingDays: "6 months",
        special: "PR after 5yr. Dutch civic integration exam. 30% tax ruling first 5yr. Amsterdam financial sector actively recruits HK finance professionals.",
        visaFee: 167,
        officialUrl: "https://ind.nl/en/residence-permits/permanent-residence"
      },
      italy: {
        cost: { annual: 2000, currency: "USD", label: "€200 long-stay permit" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Permesso di soggiorno UE after 5yr. Italian A2 required. Less common HK destination but EU citizenship path is the main draw.",
        visaFee: 200,
        officialUrl: "https://www.interno.gov.it/en/themes/immigration/foreigners-italy-residence-permits"
      },
      spain: {
        cost: { annual: 2000, currency: "USD", label: "€200 residency fee" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Long-term EU residency after 5yr. Spanish A2 required. Nationality after 10yr. Digital Nomad Visa 2023 popular entry point for HK remote professionals.",
        visaFee: 200,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 3000, currency: "USD", label: "MYR 5,000 MM2H fee" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MM2H 10-year renewable. Fixed deposit MYR 500,000. Malaysia popular with HK residents: Cantonese widely spoken in KL, familiar food culture, 1.5hr flight from HK.",
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
        visaFee: 7,
        weeklyLiving: 420,
        flightMinUSD: 820,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. 90 days in 180 days across 26 EU countries. Germany popular with HK tourists for engineering culture and Christmas markets.",
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
        visaFee: 20,
        weeklyLiving: 400,
        flightMinUSD: 280,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 30-day visa-free Singapore. #1 short-haul destination from HK. Cantonese widely spoken. 3.5hr direct flight. Easy overnight trip.",
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
        cost: { annual: 0, currency: "USD", label: "Visa-free 6 months" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 6-month visa-free UK. BN(O) holders can stay 5yr. London is top city for HK travelers — historical ties, Cantonese restaurants, financial district.",
        visaFee: 0,
        weeklyLiving: 420,
        flightMinUSD: 700,
        officialUrl: "https://www.gov.uk/check-uk-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 90-day visa-free Japan. Japan is consistently #1 overseas destination for HK residents. Cantonese-friendly service in Tokyo and Osaka. 3.5hr direct flight.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 50,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. Portugal entry = 26-country Schengen access. Lisbon growing in popularity with HK digital nomads and retirees.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 680,
        officialUrl: "https://www.schengenvisainfo.com/portugal-visa/"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "ESTA $21 (Visa Waiver)" },
        difficulty: "easy",
        processingDays: "Minutes (ESTA online)",
        special: "HKSAR passport → ESTA Visa Waiver. 90-day visa-free entry. USA popular with HK travelers for family visits (large HK diaspora in San Francisco, New York).",
        visaFee: 21,
        weeklyLiving: 350,
        flightMinUSD: 700,
        officialUrl: "https://esta.cbp.dhs.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 30-day visa-free Thailand. Bangkok is #2 most visited city by HK residents after Osaka. 2.5hr direct flight. Cantonese widely understood in tourist areas.",
        visaFee: 0,
        weeklyLiving: 75,
        flightMinUSD: 60,
        officialUrl: "https://www.thaiembassy.com/thailand/thailand-visa-exemption.php"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 23" },
        difficulty: "easy",
        processingDays: "Minutes (NZeTA online)",
        special: "HKSAR passport → NZeTA online in minutes. 90-day entry. Auckland and Queenstown popular with HK travelers. Large HK community makes it welcoming.",
        visaFee: 23,
        weeklyLiving: 180,
        flightMinUSD: 700,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. Paris beloved by HK tourists — fashion, art, food. Cantonese community in Belleville. Direct Cathay Pacific flights.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 680,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. Amsterdam popular with HK travelers for art museums and cycling culture. Direct Cathay Pacific service available.",
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
        officialUrl: "https://www.schengenvisainfo.com/italy-visa/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → Schengen visa-free. Barcelona and Madrid popular for HK tourists. Gaudi architecture and tapas culture resonate with HK food-centric travelers.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 680,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "HKSAR passport → 30-day visa-free Malaysia. Cantonese widely spoken in KL (Petaling Street, Chow Kit). 3hr direct flight. Cheapest destination from HK with familiar food.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 35,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-exemption.html"
      }
    }
  },
  usa: {
    study: {
      canada: {
        cost: { annual: 30000, currency: "USD", label: "CAD 30K~45K/yr" },
        difficulty: "easy",
        processingDays: "8~12 weeks",
        special: "Study Permit easy for Americans. No GIC required. CUSMA/USMCA professionals pathway post-study. Quebec French programs available.",
        visaFee: 150,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "easy",
        processingDays: "60~90 days",
        special: "German student visa required. Public universities nearly free (€170-350/semester). Blocked account €11,904. DAAD scholarships available for Americans.",
        visaFee: 75,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Student visa 500. Americans fast-tracked in processing. GTE statement required. 48hr/week work allowed during study. Post-study Graduate visa 2-4yr.",
        visaFee: 710,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Student Pass via ICA. NUS and NTU attract many American students. Strong English instruction. Excellent APAC job placement for graduates.",
        visaFee: 30,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "MBZUAI and Khalifa University attract international students. Visa linked to enrollment. Strong scholarships. Tax-free living.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/student-visa"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "easy",
        processingDays: "3 weeks",
        special: "Student visa for Americans same as other nationalities. IHS fee £776/yr. 2yr Graduate visa after study. Oxford, LSE, Imperial popular choices.",
        visaFee: 490,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "moderate",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "CoE from school takes 3 months. English-taught programs expanding at Waseda, Keio. JET Programme also available for Americans after graduation.",
        visaFee: 30,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "D4 Student Visa. Public universities €700-1,500/yr. EU access after residency. Popular with American students for affordability and lifestyle.",
        visaFee: 90,
        officialUrl: "https://www.sef.pt/en/pages/conteudo-detalhe.aspx?nID=28"
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
        special: "Post-study work visa 3yr. Part-time work 20hr/wk during study. Auckland and Otago University popular with American students.",
        visaFee: 330,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/fee-paying-student-visa"
      },
      france: {
        cost: { annual: 12000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "moderate",
        processingDays: "30 days",
        special: "Long-stay student visa (VLS-TS). Campus France procedure mandatory for Grandes Écoles. Public universities from €170/yr. French language helpful. Paris and Lyon top choices.",
        visaFee: 99,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 18000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "easy",
        processingDays: "30 days",
        special: "MVV + residence permit via university. Orientation year after graduation. TU Delft, Leiden, UvA popular with Americans. English-taught programs widely available.",
        visaFee: 207,
        officialUrl: "https://www.nuffic.nl/en/subjects/studying-in-the-netherlands"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "easy",
        processingDays: "15~30 days",
        special: "Type D national visa. Public universities €900~4,000/yr. Politecnico di Milano top ranked. Many Americans study art and design in Florence.",
        visaFee: 116,
        officialUrl: "https://www.studiare-in-italia.it/studentistranieri/index_en.html"
      },
      spain: {
        cost: { annual: 10000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "easy",
        processingDays: "15~30 days",
        special: "National D student visa. Public universities from €800/yr. NIE number required. Barcelona and Madrid top choices for American students abroad.",
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
        cost: { annual: 3000, currency: "USD", label: "Minimal (CUSMA treaty)" },
        difficulty: "easy",
        processingDays: "3~7 days (CUSMA)",
        special: "CUSMA (USMCA) covers 60+ professions — no LMIA needed. Present qualifications at port of entry. 1-year permit, renewable. Express Entry also available.",
        visaFee: 155,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/cusma.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€120~450 visa fee" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "EU Blue Card for salary €45K+. Opportunity Card for job seekers. Americans in high demand in tech, auto, and engineering sectors.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 4640, currency: "USD", label: "AUD 4,640 visa fee" },
        difficulty: "moderate",
        processingDays: "60~90 days",
        special: "TSS (482) employer sponsor required. Points-tested skilled migration via 189/190. Large American expat community in Sydney and Melbourne.",
        visaFee: 3115,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/working-in-australia"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 EP fee" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Employment Pass requires salary SGD 5,000+/month. American professionals highly competitive in finance, tech, and consulting. Employer applies via MyMOM Portal.",
        visaFee: 105,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 500~2,000 fees" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "Employer-sponsored work visa easy for Americans. Golden Visa (10yr) for salary AED 30K+/month. Tax-free income. Dubai and Abu Dhabi welcome US professionals.",
        visaFee: 500,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/employment-visa"
      },
      uk: {
        cost: { annual: 1500, currency: "USD", label: "£239 visa fee" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Skilled Worker visa. Certificate of Sponsorship from UK employer required. Salary threshold £38,700+. Americans competitive in finance, law, and tech sectors.",
        visaFee: 239,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 2000, currency: "USD", label: "¥3,000 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Engineer/Specialist in Humanities visa. JET Programme entry available. American professionals recruited by Japanese MNCs. HSP highly skilled professional fast-track.",
        visaFee: 20,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/engineer.html"
      },
      portugal: {
        cost: { annual: 2000, currency: "USD", label: "€83~440 visa fee" },
        difficulty: "easy",
        processingDays: "30~60 days",
        special: "D3 Highly Qualified or D8 Digital Nomad Visa (income €3,480+/month). Popular destination for American remote workers. Lisbon startup scene growing rapidly.",
        visaFee: 83,
        officialUrl: "https://aima.gov.pt/en"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "฿2,000 Non-B + permit" },
        difficulty: "moderate",
        processingDays: "3~4 weeks",
        special: "Non-Immigrant B visa + Work Permit required. BOI company sponsorship helps. LTR (Long-Term Resident) Visa for high-income remote workers.",
        visaFee: 80,
        officialUrl: "https://www.dbd.go.th/en/index.php"
      },
      newzealand: {
        cost: { annual: 700, currency: "USD", label: "NZD 700 AEWV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Accredited Employer Work Visa (AEWV). Americans in demand for tech and finance. Skilled Migrant PR pathway available. English-speaking environment.",
        visaFee: 470,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/accredited-employer-work-visa"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99 Talent Passport" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Talent Passport for salary €35K+ or in-demand profession. Employer sponsorship for other cases. French language helpful but many tech roles are English-only.",
        visaFee: 99,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/F16922"
      },
      netherlands: {
        cost: { annual: 1500, currency: "USD", label: "€207 HSM permit" },
        difficulty: "easy",
        processingDays: "30~45 days",
        special: "Highly Skilled Migrant visa. Salary threshold €5,670+/month. ASML, Booking.com, Philips hire Americans. 30% tax ruling reduces effective tax rate significantly.",
        visaFee: 207,
        officialUrl: "https://ind.nl/en/work/working_in_the_Netherlands/Pages/Highly-skilled-migrant.aspx"
      },
      italy: {
        cost: { annual: 1500, currency: "USD", label: "€116 visa fee" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Decreto Flussi quota for non-EU workers including Americans. EU Blue Card via local company also viable. Permesso di soggiorno required.",
        visaFee: 116,
        officialUrl: "https://www.lavoro.gov.it/en"
      },
      spain: {
        cost: { annual: 1500, currency: "USD", label: "€80~200 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Digital Nomad Visa for remote workers (income €2,300+/month). Highly Qualified Professionals visa. Growing US expat scene in Barcelona and Madrid.",
        visaFee: 80,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/nómadas-digitales"
      },
      malaysia: {
        cost: { annual: 1000, currency: "USD", label: "MYR 1,500 EP fee" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "Employment Pass Tier 1 (salary RM 10,000+). Many MNCs hire Americans for KL offices. Tech incentive zones and tax benefits. English working environment.",
        visaFee: 330,
        officialUrl: "https://www.esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 1,325~2,140 fees" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Express Entry: CRS 460+ typical. English native = high language score. CUSMA workers can switch to PR track. Americans among top 3 nationalities in Express Entry draws.",
        visaFee: 1325,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "€120~500 permit fees" },
        difficulty: "easy",
        processingDays: "3~6 months",
        special: "Niederlassungserlaubnis after 4-5 years work. EU Blue Card holders eligible after 2 years. High STEM demand. Germany welcoming of US professionals.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/settlement-permit"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "AUD 4,195 visa fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "Points-based 189/190 Skilled Migration. Americans score high: English, education. State nomination (190) adds 5 points. Strong US-Australia bilateral ties.",
        visaFee: 4115,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Varies" },
        difficulty: "hard",
        processingDays: "2~5 years",
        special: "PR application highly discretionary. Americans have good standing but must demonstrate strong economic ties, long-term employment, and community integration.",
        visaFee: 100,
        officialUrl: "https://www.ica.gov.sg/PR"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "AED 2,800~10,000" },
        difficulty: "easy",
        processingDays: "1~2 years",
        special: "Golden Visa (10yr): salary AED 30K+/month, $545K property investment, or exceptional talent. No citizenship path but secure long-term residence.",
        visaFee: 2800,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/golden-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "£2,389+ ILR fee" },
        difficulty: "moderate",
        processingDays: "5 years",
        special: "ILR after 5yr on Skilled Worker. B1 English, Life in UK test. Americans among top 5 nationalities for UK settlement.",
        visaFee: 2389,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "¥8,000 application fee" },
        difficulty: "hard",
        processingDays: "10 years (or 3 via HSP)",
        special: "Standard PR requires 10yr continuous residence. HSP (Highly Skilled Professional) fast-track: PR after 3yr with 70+ points. Americans score well on HSP language points.",
        visaFee: 80,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/permanent_resident.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "€320+ residence fee" },
        difficulty: "easy",
        processingDays: "5 years → PR",
        special: "D7/D8/D3 visa → 5yr residency → Permanent Residence. Golden Visa (€500K) accelerated. Portuguese B2 language. Americans increasingly choosing Lisbon and Porto.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "THB 600,000 Elite / LTR" },
        difficulty: "hard",
        processingDays: "No standard PR",
        special: "No standard PR path. Thailand Elite Visa (THB 600,000) for 5-20yr stays. LTR Wealthy Pensioner requires $80K passive income annually.",
        visaFee: 10000,
        officialUrl: "https://www.thailand-elite.com"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZD 3,310 visa fee" },
        difficulty: "moderate",
        processingDays: "12~18 months",
        special: "Skilled Migrant Category points-based. Americans typically strong candidates. 5yr residency → citizenship eligible. Close cultural and language ties.",
        visaFee: 2610,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-category-resident-visa"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "€269+ residence fees" },
        difficulty: "moderate",
        processingDays: "5 years → Carte de Résident",
        special: "Carte de Résident after 5yr legal residency. Talent Passport holders may fast-track. French language B1 required. Citizenship possible after 5yr.",
        visaFee: 269,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/F11429"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "€183+ IND fee" },
        difficulty: "moderate",
        processingDays: "5 years → PR",
        special: "Permanent Residence after 5yr legal residency. Dutch A2 language required. Integration exam. Dutch citizenship after 5yr PR.",
        visaFee: 183,
        officialUrl: "https://ind.nl/en/residence-permits/permanent-residence"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "€10.20+ permit fee" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "EU Long-term Residence Permit after 5yr. Italian A2 language test. Income requirement. Bologna, Milan, Rome top destinations for American expats.",
        visaFee: 10,
        officialUrl: "https://www.interno.gov.it/it/temi/immigrazione-e-asilo/permesso-di-soggiorno"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "€20+ residence card" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "Long-term EU Residency after 5yr. Spanish A2 language test. Income proof required. Barcelona and Málaga have growing American expat communities.",
        visaFee: 20,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones/w/residencia-de-larga-duracion-ue"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "MYR 500K MM2H deposit" },
        difficulty: "hard",
        processingDays: "10+ years",
        special: "PR is discretionary and extremely rare. MM2H (Malaysia My Second Home) practical long-term option: 10yr renewable, MYR 500K fixed deposit required.",
        visaFee: 5000,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "eTA CAD 7" },
        difficulty: "easy",
        processingDays: "Minutes (eTA)",
        special: "eTA only (no full visa). Up to 6 months per stay. NEXUS card for fast border crossing. Canada is the most visited country by Americans.",
        visaFee: 7,
        weeklyLiving: 420,
        flightMinUSD: 250,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → Schengen visa-free 90/180 days. Germany entry = 26 Schengen countries. Berlin, Munich, Frankfurt, Rhine Valley all accessible.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 500,
        officialUrl: "https://www.schengenvisainfo.com"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "eVisitor — Free" },
        difficulty: "easy",
        processingDays: "24~48 hours",
        special: "eVisitor (subclass 651) is FREE for Americans. Online application, approved within 48hr. 12-month multiple entry, 3 months per stay.",
        visaFee: 0,
        weeklyLiving: 400,
        flightMinUSD: 1200,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → 30-day visa-free entry. Strong US-Singapore diplomatic ties. Changi Airport is world-class transit hub.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 900,
        officialUrl: "https://www.ica.gov.sg"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "90-day visa on arrival" },
        difficulty: "easy",
        processingDays: "On arrival",
        special: "Americans receive 90-day visa on arrival at UAE airports. Renewable once. Dubai and Abu Dhabi popular with American tourists.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 800,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "ETA £10 required" },
        difficulty: "easy",
        processingDays: "24 hours (ETA)",
        special: "UK ETA required for Americans (introduced 2024). £10 fee. Up to 6 months per visit. London is the #1 destination for US travelers to Europe.",
        visaFee: 10,
        weeklyLiving: 500,
        flightMinUSD: 450,
        officialUrl: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → 90-day visa-free entry. Multiple entry allowed. Japan is a top destination for American tourists. Tokyo, Kyoto, Osaka easy to navigate in English.",
        visaFee: 0,
        weeklyLiving: 250,
        flightMinUSD: 800,
        officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → Schengen visa-free 90/180 days. Lisbon and Porto among fastest-growing American expat destinations. Affordable vs. other Western Europe.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 500,
        officialUrl: "https://www.schengenvisainfo.com/portugal-visa/"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 60 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Americans get 60-day visa-free entry (extended 2024). Extendable 30 days at local immigration. Bangkok, Phuket, Chiang Mai all popular.",
        visaFee: 0,
        weeklyLiving: 150,
        flightMinUSD: 900,
        officialUrl: "https://www.thaiembassy.com/thailand/thailand-visa-exemption.php"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 23" },
        difficulty: "easy",
        processingDays: "Minutes (NZeTA)",
        special: "NZeTA online in minutes. 90-day entry per visit. IVL tourism levy NZD 35. New Zealand is a top adventure travel destination for Americans.",
        visaFee: 23,
        weeklyLiving: 300,
        flightMinUSD: 1200,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "US passport → Schengen visa-free 90/180 days. France is the world's most visited country. Paris, French Riviera, Loire Valley, Bordeaux all accessible.",
        visaFee: 0,
        weeklyLiving: 300,
        flightMinUSD: 450,
        officialUrl: "https://www.schengenvisainfo.com/france-visa/"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Schengen visa-free. Amsterdam, The Hague, Rotterdam, Maastricht popular with Americans. Tulip season and world-class museums draw millions annually.",
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
        officialUrl: "https://www.schengenvisainfo.com/italy-visa/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Schengen visa-free. Barcelona, Madrid, Seville, Ibiza all accessible. Americans love Spain for food, culture, and architecture.",
        visaFee: 0,
        weeklyLiving: 220,
        flightMinUSD: 450,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Americans get 90-day visa-free entry to Malaysia. One of Asia's most accessible and affordable destinations. Kuala Lumpur skyline and Borneo rainforest both popular.",
        visaFee: 0,
        weeklyLiving: 100,
        flightMinUSD: 900,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-exemption.html"
      }
    }
  },
  france: {
    study: {
      canada: {
        cost: { annual: 28000, currency: "USD", label: "CAD 28K~40K/yr" },
        difficulty: "easy",
        processingDays: "8~12 weeks",
        special: "Study Permit straightforward for French nationals. Quebec French-language stream gives competitive advantage. PGWP 3yr post-study work. IEC Working Holiday available.",
        visaFee: 150,
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
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr" },
        difficulty: "easy",
        processingDays: "14~21 days",
        special: "Student visa 500. French nationals eligible for Working Holiday (417) which allows incidental study. 2yr Graduate visa post-study available.",
        visaFee: 710,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Student Pass via ICA. NUS and NTU well-known in France. INSEAD Singapore campus popular for MBA candidates. Strong English instruction.",
        visaFee: 30,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "Student visa via university enrollment. MBZUAI has French research partnerships. No income tax. Popular destination for French engineering graduates.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/student-visa"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "moderate",
        processingDays: "3 weeks",
        special: "Post-Brexit: French nationals now need UK Student visa same as non-EU. IHS fee £776/yr. 2yr Graduate visa after. Oxford, Imperial, LSE popular with French students.",
        visaFee: 490,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "moderate",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "CoE from school takes 3 months. French-Japanese cultural ties strong. PVT Working Holiday also available. French students at Kyoto and Waseda increasing.",
        visaFee: 30,
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
        special: "F-1 visa + SEVIS fee. Campus interview at US Embassy Paris. OPT 1yr + STEM OPT 2yr. French students well-represented at MIT, Columbia, and NYU.",
        visaFee: 510,
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
        special: "Student visa easy for French nationals. PVT Working Holiday available. Post-study work visa 3yr. Auckland popular with French students.",
        visaFee: 330,
        officialUrl: "https://www.immigration.govt.nz"
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
        officialUrl: "https://www.studiare-in-italia.it"
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
        cost: { annual: 3500, currency: "USD", label: "CAD 1,050 permit fee" },
        difficulty: "easy",
        processingDays: "2 weeks (IEC) / 6~12 months (Express Entry)",
        special: "IEC Working Holiday for French under 35: open work permit, no job offer needed. Francophone bonus points in Express Entry. Quebec Skilled Worker fast-track for French speakers.",
        visaFee: 1050,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/iec.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work anywhere in Germany immediately. Register EU citizenship (Freizügigkeitsbescheinigung). No work permit needed. Strong demand for French speakers.",
        visaFee: 0,
        officialUrl: "https://www.make-it-in-germany.com/en/living-in-germany/moving-to-germany/eu-eea-nationals"
      },
      australia: {
        cost: { annual: 635, currency: "USD", label: "AUD 635 WHV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (417) for French under 35. Can extend to 3 years. TSS 482 for employer-sponsored longer term. French professionals in-demand in hospitality and tech.",
        visaFee: 635,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-417"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 EP fee" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Employment Pass requires SGD 5,000+/month. French MNCs (TotalEnergies, AXA, L'Oréal) sponsor employees to Singapore. Employer applies via MyMOM.",
        visaFee: 105,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 500~2,000 fees" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "French professionals recruited in engineering, finance, luxury, and education sectors. French community ~60,000 in UAE. Golden Visa for high earners.",
        visaFee: 500,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/employment-visa"
      },
      uk: {
        cost: { annual: 1500, currency: "USD", label: "£239 visa fee" },
        difficulty: "moderate",
        processingDays: "3~8 weeks",
        special: "Post-Brexit: French nationals need Skilled Worker visa for UK work. Certificate of Sponsorship required. Youth Mobility Scheme (YMS) available for French under 30.",
        visaFee: 239,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 2000, currency: "USD", label: "¥3,000 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Engineer/Specialist or Cultural Activities visa. PVT Working Holiday for French under 30. French cultural institutes recruit French nationals. HSP route for high skilled.",
        visaFee: 20,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/engineer.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work anywhere in Portugal immediately. Register residency at local council. Large and growing French expat community in Lisbon and Algarve.",
        visaFee: 0,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "H-1B: $1,710+ fees" },
        difficulty: "hard",
        processingDays: "6~9 months",
        special: "H-1B cap lottery (85,000 spots). Employer must sponsor. L-1 intracompany transfer easier if already in a US multinational. E-3 visa not available for French.",
        visaFee: 1710,
        officialUrl: "https://www.dol.gov/agencies/eta/foreign-labor/programs/h-1b"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "฿2,000 Non-B + permit" },
        difficulty: "moderate",
        processingDays: "3~4 weeks",
        special: "Non-B + work permit required. French companies (Michelin, Airbus Thailand) sponsor employees. LTR Visa for high-income professionals. Active French community in Bangkok.",
        visaFee: 80,
        officialUrl: "https://www.dbd.go.th/en"
      },
      newzealand: {
        cost: { annual: 700, currency: "USD", label: "NZD 700 AEWV fee" },
        difficulty: "easy",
        processingDays: "14~28 days",
        special: "Working Holiday (PVT) allows 23 months work+travel. AEWV for accredited employer roles. French professionals in-demand in tech, agriculture, and hospitality.",
        visaFee: 470,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/accredited-employer-work-visa"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "EU Freedom of Movement" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — work in Netherlands immediately. Register with municipality. ASML, Booking, Shell hire many French speakers. 30% tax ruling available for qualifying roles.",
        visaFee: 0,
        officialUrl: "https://ind.nl/en/eu-eea-or-swiss-national"
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
        special: "Employment Pass Tier 1 for salary RM 10,000+. French companies (Airbus, Schneider) recruit locally. English working environment in MNCs.",
        visaFee: 330,
        officialUrl: "https://www.esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 1,325~2,140 fees" },
        difficulty: "moderate",
        processingDays: "6~12 months",
        special: "Express Entry: French speakers receive Francophone bonus — French citizens almost guaranteed extra 50 CRS points. Quebec skilled worker PNP stream very fast for French speakers.",
        visaFee: 1325,
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
        cost: { annual: 0, currency: "USD", label: "AUD 4,195 visa fee" },
        difficulty: "moderate",
        processingDays: "12~24 months",
        special: "189/190 skilled migration points-based. French nationals score well: English, education, experience. Australia highly desirable for French emigrants.",
        visaFee: 4115,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Varies" },
        difficulty: "hard",
        processingDays: "2~5 years",
        special: "PR highly discretionary. French nationals with strong employment history and community ties have reasonable chances. Must demonstrate long-term commitment to Singapore.",
        visaFee: 100,
        officialUrl: "https://www.ica.gov.sg/PR"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "AED 2,800~10,000" },
        difficulty: "easy",
        processingDays: "1~2 years",
        special: "Golden Visa (10yr) for salary AED 30K+/month or investment. France is among top source countries for UAE Golden Visa holders. Popular among French executives.",
        visaFee: 2800,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/golden-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "£2,389+ ILR fee" },
        difficulty: "moderate",
        processingDays: "5 years",
        special: "ILR after 5yr Skilled Worker. B1 English, Life in UK test. French community ~150,000 in London area. Post-Brexit increased admin for French nationals.",
        visaFee: 2389,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "¥8,000 application fee" },
        difficulty: "hard",
        processingDays: "10 years (or 3 via HSP)",
        special: "Standard PR 10yr. HSP fast-track 3yr with 70+ points. French-Japanese cultural ties (Alliance Française) help with integration. Language B1+ required.",
        visaFee: 80,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/permanent_resident.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "EU right — minimal fees" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — automatic permanent residence right after 5yr. No formal PR needed. Golden Visa accelerated for investments. Portugal is the most popular EU destination for French emigrants.",
        visaFee: 0,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "DV Lottery or EB petition" },
        difficulty: "hard",
        processingDays: "3~10+ years",
        special: "Green Card via employer EB-1/EB-2/EB-3 (1-5yr) or Diversity Visa Lottery (French eligible). Investment EB-5 ($800K) faster. France popular origin for US Green Card applicants.",
        visaFee: 325,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "THB 600,000 Elite / LTR" },
        difficulty: "hard",
        processingDays: "No standard PR",
        special: "No standard PR. Thailand Elite Visa (THB 600,000) for long stays. LTR Wealthy Pensioner requires $80K income. Large French expat retiree community in Chiang Mai.",
        visaFee: 10000,
        officialUrl: "https://www.thailand-elite.com"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZD 3,310 visa fee" },
        difficulty: "moderate",
        processingDays: "12~18 months",
        special: "Skilled Migrant points-based. French professionals strong candidates. 5yr residency → citizenship. Pacific lifestyle attractive to French emigrants.",
        visaFee: 2610,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/skilled-migrant-category-resident-visa"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "EU right — minimal fees" },
        difficulty: "easy",
        processingDays: "No wait — EU right",
        special: "EU citizen — automatic permanent right after 5yr. Amsterdam and Rotterdam attract French professionals, especially in tech, finance, and logistics.",
        visaFee: 0,
        officialUrl: "https://ind.nl/en/eu-eea-or-swiss-national"
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
        cost: { annual: 0, currency: "USD", label: "MYR 500K MM2H deposit" },
        difficulty: "hard",
        processingDays: "10+ years",
        special: "PR is discretionary and rare. MM2H (10yr renewable) practical option: MYR 500K fixed deposit. French community ~3,000 in Malaysia, mainly in KL.",
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
        visaFee: 7,
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
        cost: { annual: 0, currency: "USD", label: "ETA AUD 20" },
        difficulty: "easy",
        processingDays: "Instant (ETA)",
        special: "French passport → ETA (subclass 601). Instant approval. 12-month multiple entry. Barrier Reef and Melbourne popular with French tourists.",
        visaFee: 20,
        weeklyLiving: 400,
        flightMinUSD: 900,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "French passport → 30-day visa-free entry. Singapore is key transit hub for French travelers heading to Southeast Asia and Oceania.",
        visaFee: 0,
        weeklyLiving: 280,
        flightMinUSD: 700,
        officialUrl: "https://www.ica.gov.sg"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "90-day visa on arrival" },
        difficulty: "easy",
        processingDays: "On arrival",
        special: "French passport → 90-day visa on arrival at UAE airports. Dubai is a popular luxury destination for French tourists. Direct Air France flights daily from Paris.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 250,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "ETA £10 required" },
        difficulty: "easy",
        processingDays: "24 hours (ETA)",
        special: "UK ETA required for French (post-Brexit, 2024). £10, valid 2yr. Up to 6 months per visit. London top destination for French tourists. Eurostar 2hr 15min Paris-London.",
        visaFee: 10,
        weeklyLiving: 500,
        flightMinUSD: 50,
        officialUrl: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 90 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "French passport → 90-day visa-free. Japan very popular with French tourists (Japonisme cultural affinity). Tokyo, Kyoto, Osaka. Direct Air France Paris-Tokyo.",
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
        cost: { annual: 0, currency: "USD", label: "ESTA $21" },
        difficulty: "easy",
        processingDays: "Minutes (ESTA)",
        special: "ESTA Visa Waiver: 90-day visa-free entry. New York, Los Angeles, Miami, Chicago. Direct Air France and Delta flights. France sends ~2M tourists/year to USA.",
        visaFee: 21,
        weeklyLiving: 350,
        flightMinUSD: 350,
        officialUrl: "https://esta.cbp.dhs.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 60 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "French passport → 60-day visa-free. Extendable 30 days. Thailand popular with French backpackers and retirees. Koh Samui, Phuket, Chiang Mai are favorites.",
        visaFee: 0,
        weeklyLiving: 150,
        flightMinUSD: 600,
        officialUrl: "https://www.thaiembassy.com/thailand/thailand-visa-exemption.php"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZeTA NZD 23" },
        difficulty: "easy",
        processingDays: "Minutes (NZeTA)",
        special: "French passport → NZeTA in minutes. 90-day entry. Hobbiton, Milford Sound, Queenstown. PVT Working Holiday also very popular with French travelers.",
        visaFee: 23,
        weeklyLiving: 300,
        flightMinUSD: 1200,
        officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta"
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
        special: "French passport → 90-day visa-free. KL, Penang, Langkawi, Borneo. Air France via hub or direct connections. Affordable and diverse destination.",
        visaFee: 0,
        weeklyLiving: 100,
        flightMinUSD: 650,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-exemption.html"
      }
    }
  },
  tunisia: {
    study: {
      canada: {
        cost: { annual: 25000, currency: "USD", label: "CAD 28K~40K/yr" },
        difficulty: "moderate",
        processingDays: "8~16 weeks",
        special: "Canadian Study Permit requires proof of funds (CAD 20,635 + tuition), IELTS/TEF, acceptance letter. French-language Quebec programs have easier path. Strong financial documentation essential.",
        visaFee: 150,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
      },
      germany: {
        cost: { annual: 10000, currency: "USD", label: "€8K~12K/yr" },
        difficulty: "moderate",
        processingDays: "120~180 days",
        special: "Studienkolleg preparatory course may be required. DAAD scholarships available. Blocked account €11,904. Appointment bottleneck at German consulate Tunis — apply early.",
        visaFee: 75,
        officialUrl: "https://www.make-it-in-germany.com/en/study-training/study/studying-in-germany"
      },
      australia: {
        cost: { annual: 32000, currency: "USD", label: "AUD 30K~45K/yr" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "GTE (Genuine Temporary Entrant) statement critical. Strong ties-to-Tunisia evidence required. Refusal rates higher for Tunisian applicants — must demonstrate compelling reason to return.",
        visaFee: 710,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
      },
      singapore: {
        cost: { annual: 22000, currency: "USD", label: "SGD 20K~30K/yr" },
        difficulty: "hard",
        processingDays: "14~28 days",
        special: "Student Pass via ICA. Tunisian applicants face close scrutiny. Strong financial evidence, parental support documentation, and clear academic track required.",
        visaFee: 30,
        officialUrl: "https://www.ica.gov.sg/reside/STP/apply"
      },
      uae: {
        cost: { annual: 18000, currency: "USD", label: "AED 50K~80K/yr" },
        difficulty: "easy",
        processingDays: "7 days",
        special: "UAE has large Tunisian community. MBZUAI and AUS welcome North African students. Student visa via enrollment. Arabic language shared advantage.",
        visaFee: 270,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/student-visa"
      },
      uk: {
        cost: { annual: 35000, currency: "USD", label: "£20K~35K/yr" },
        difficulty: "hard",
        processingDays: "3~8 weeks",
        special: "UK Student visa. Higher refusal rates for some North African passports. Strong bank statements (3-6 months), IELTS 5.5+, accommodation proof, and non-immigrant intent required.",
        visaFee: 490,
        officialUrl: "https://www.gov.uk/student-visa"
      },
      japan: {
        cost: { annual: 12000, currency: "USD", label: "¥1.2M~2M/yr" },
        difficulty: "hard",
        processingDays: "3~5 days (after CoE: 3 months)",
        special: "Rare pathway for Tunisian students. CoE from school takes 3 months. JLPT N4+ or English proficiency required. High documentation burden.",
        visaFee: 30,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/student.html"
      },
      portugal: {
        cost: { annual: 9000, currency: "USD", label: "€7K~12K/yr" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "D4 student visa. Portugal has more accommodating processes for North African students. French language competency often shared. Public universities affordable.",
        visaFee: 90,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 50000, currency: "USD", label: "$40K~60K/yr" },
        difficulty: "hard",
        processingDays: "2~6 months",
        special: "F-1 visa requires US Embassy interview in Tunis. Must prove non-immigrant intent strongly. TOEFL/IELTS required. Full financial proof. Apply 6+ months in advance.",
        visaFee: 510,
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
        special: "Student visa possible for Tunisians. Financial evidence and IELTS required. Clear academic purpose and return ties to Tunisia strengthen application.",
        visaFee: 330,
        officialUrl: "https://www.immigration.govt.nz"
      },
      france: {
        cost: { annual: 12000, currency: "USD", label: "€8K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Very large Tunisian student community in France (~600,000 Tunisian diaspora total). Campus France procedure mandatory. French language proficiency major advantage. Documents must be apostilled.",
        visaFee: 99,
        officialUrl: "https://www.campusfrance.org/en"
      },
      netherlands: {
        cost: { annual: 18000, currency: "USD", label: "€12K~20K/yr" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "IND strict for Tunisian applicants. Full financial evidence package mandatory. Must apply from Tunisia. University acceptance letter and insurance required.",
        visaFee: 207,
        officialUrl: "https://www.nuffic.nl/en"
      },
      italy: {
        cost: { annual: 8000, currency: "USD", label: "€5K~15K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Strong historical Tunisian community in Italy (Sicily, Turin). Italian consulate in Tunis familiar with North African applicants. Public universities affordable. Permesso di soggiorno required on arrival.",
        visaFee: 116,
        officialUrl: "https://www.studiare-in-italia.it"
      },
      spain: {
        cost: { annual: 10000, currency: "USD", label: "€8K~14K/yr" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "National D student visa. Spanish consulate in Tunis processes applications. Public universities from €800/yr. Growing Tunisian community in Valencia and Madrid.",
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
        cost: { annual: 3500, currency: "USD", label: "CAD 1,050 fees" },
        difficulty: "hard",
        processingDays: "2~6 months",
        special: "LMIA-backed work permit required. Francophone Tunisians can apply via Quebec MOI or Francophone Mobility stream. Express Entry CRS 460+ competitive. English or French required.",
        visaFee: 1050,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
      },
      germany: {
        cost: { annual: 2000, currency: "USD", label: "€120~450 fees" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "Germany-Tunisia Skilled Worker Agreement (2022) creates facilitated pathway. Chancenkarte (Opportunity Card) allows job-seeking. EU Blue Card needs €45K+ salary. German language B1+ helpful.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals"
      },
      australia: {
        cost: { annual: 4640, currency: "USD", label: "AUD 4,640 TSS fee" },
        difficulty: "hard",
        processingDays: "2~4 months",
        special: "TSS (482) employer sponsor required. Skills assessment by relevant body. Immigration background check thorough. IELTS 6.0+ required. Tunisian credential recognition may need assessment.",
        visaFee: 3115,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/working-in-australia"
      },
      singapore: {
        cost: { annual: 1200, currency: "USD", label: "SGD 105 EP fee" },
        difficulty: "hard",
        processingDays: "3~8 weeks",
        special: "Employment Pass requires SGD 5,000+/month. Competitive process for Tunisians — STEM and finance professionals with top qualifications succeed. Employer applies via MyMOM Portal.",
        visaFee: 105,
        officialUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass"
      },
      uae: {
        cost: { annual: 1500, currency: "USD", label: "AED 500~2,000 fees" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "UAE has large Tunisian expatriate workforce. Employer-sponsored visa. Dubai and Abu Dhabi popular for Tunisian engineers, healthcare workers, and educators. Tax-free income major draw.",
        visaFee: 500,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/employment-visa"
      },
      uk: {
        cost: { annual: 1500, currency: "USD", label: "£239 Skilled Worker fee" },
        difficulty: "hard",
        processingDays: "3~8 weeks",
        special: "Skilled Worker visa needs UK licensed sponsor + CoS + English language. Salary threshold £38,700+. Immigration background check thorough for Tunisian applicants.",
        visaFee: 239,
        officialUrl: "https://www.gov.uk/skilled-worker-visa"
      },
      japan: {
        cost: { annual: 2000, currency: "USD", label: "¥3,000 visa fee" },
        difficulty: "hard",
        processingDays: "1~3 months",
        special: "Very rare pathway for Tunisian workers. Engineer/Specialist visa requires university degree in relevant field. Japanese or English business level needed. Long process.",
        visaFee: 20,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/engineer.html"
      },
      portugal: {
        cost: { annual: 2000, currency: "USD", label: "€83~440 visa fee" },
        difficulty: "moderate",
        processingDays: "30~60 days",
        special: "D3 Highly Qualified or D7 Passive Income. Portugal has bilateral agreement facilitating some North African worker mobility. Francophone advantage. Lisbon growing tech hub.",
        visaFee: 83,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 5000, currency: "USD", label: "H-1B: $1,710+ fees" },
        difficulty: "hard",
        processingDays: "6~9 months",
        special: "H-1B annual cap lottery (85,000 spots). Employer must sponsor and file petition. No E-3 visa for Tunisians. L-1 intracompany transfer possible for MNC employees.",
        visaFee: 1710,
        officialUrl: "https://www.dol.gov/agencies/eta/foreign-labor/programs/h-1b"
      },
      thailand: {
        cost: { annual: 2000, currency: "USD", label: "฿2,000 Non-B + permit" },
        difficulty: "moderate",
        processingDays: "3~4 weeks",
        special: "Non-Immigrant B visa + Work Permit. BOI-registered companies help with sponsorship. LTR Visa for qualifying professionals. OIC member countries have informal goodwill.",
        visaFee: 80,
        officialUrl: "https://www.dbd.go.th/en"
      },
      newzealand: {
        cost: { annual: 700, currency: "USD", label: "NZD 700 AEWV fee" },
        difficulty: "hard",
        processingDays: "4~8 weeks",
        special: "AEWV requires employer accreditation. Immigration health and character standards checked. IELTS 6.5+ typically required. Tunisian credential assessment may be needed.",
        visaFee: 470,
        officialUrl: "https://www.immigration.govt.nz"
      },
      france: {
        cost: { annual: 2000, currency: "USD", label: "€99~265 permit fees" },
        difficulty: "easy",
        processingDays: "1~3 months",
        special: "France-Tunisia bilateral labor agreement (one of oldest in Europe). Tech, healthcare, construction sectors actively recruit Tunisians. French language advantage. Largest Tunisian diaspora in Europe.",
        visaFee: 99,
        officialUrl: "https://www.immigration.interieur.gouv.fr/En"
      },
      netherlands: {
        cost: { annual: 1500, currency: "USD", label: "€207 HSM permit" },
        difficulty: "hard",
        processingDays: "30~60 days",
        special: "Highly Skilled Migrant threshold €5,670+/month. IND-recognized sponsor required. Achievable for qualified engineers, IT, and data science professionals.",
        visaFee: 207,
        officialUrl: "https://ind.nl/en/work/working_in_the_Netherlands/Pages/Highly-skilled-migrant.aspx"
      },
      italy: {
        cost: { annual: 1500, currency: "USD", label: "€116 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Italy has historic Decreto Flussi quota specifically including Tunisia (one of oldest bilateral agreements). Quota positions for seasonal and permanent workers. Sicily and northern Italy have strong Tunisian communities.",
        visaFee: 116,
        officialUrl: "https://www.lavoro.gov.it/en"
      },
      spain: {
        cost: { annual: 1500, currency: "USD", label: "€80~200 visa fee" },
        difficulty: "moderate",
        processingDays: "1~3 months",
        special: "Spain-Tunisia bilateral agreement for seasonal agricultural workers. Digital Nomad Visa for remote income €2,300+/month. Growing Tunisian community in Valencia.",
        visaFee: 80,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones"
      },
      malaysia: {
        cost: { annual: 1000, currency: "USD", label: "MYR 1,500 EP fee" },
        difficulty: "easy",
        processingDays: "2~4 weeks",
        special: "Employment Pass feasible for Tunisian STEM professionals. OIC solidarity. English working environment in MNCs. Halal environment familiar. KL popular for North African professionals.",
        visaFee: 330,
        officialUrl: "https://www.esd.imi.gov.my"
      }
    },
    immigration: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "CAD 1,325~2,140 fees" },
        difficulty: "moderate",
        processingDays: "6~18 months",
        special: "Express Entry: French-speaking Tunisians receive Francophone priority — up to 50 bonus CRS points. Quebec skilled worker fast-track for French speakers. English IELTS or French TEF required.",
        visaFee: 1325,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "€120~500 permit fees" },
        difficulty: "moderate",
        processingDays: "3~5 years",
        special: "Niederlassungserlaubnis after 3-5yr legal work. Germany-Tunisia bilateral agreement helps. B1 German language required. High demand for Tunisian engineers under bilateral agreement.",
        visaFee: 120,
        officialUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/settlement-permit"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "AUD 4,195 visa fee" },
        difficulty: "hard",
        processingDays: "2~4 years",
        special: "Skills assessment mandatory. IELTS 7.0+ strongly advised. Points test competitive. Credential recognition from Tunisian institutions may require additional steps.",
        visaFee: 4115,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Varies" },
        difficulty: "hard",
        processingDays: "3~6 years",
        special: "PR highly selective and discretionary. No points system. Extended work history and community integration key. Very rare for Tunisian nationals to obtain Singapore PR.",
        visaFee: 100,
        officialUrl: "https://www.ica.gov.sg/PR"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "AED 2,800~10,000" },
        difficulty: "moderate",
        processingDays: "1~2 years",
        special: "Golden Visa (10yr) for professionals earning AED 30K+/month, investors, or exceptional talent. Large Tunisian diaspora facilitates. Popular route for established Tunisian professionals in UAE.",
        visaFee: 2800,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id/types-of-visa/golden-visa"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "£2,389+ ILR fee" },
        difficulty: "hard",
        processingDays: "5+ years",
        special: "ILR after 5yr continuous legal stay on Skilled Worker. B1 English, Life in UK test, criminal record check. Consistent employment record critical.",
        visaFee: 2389,
        officialUrl: "https://www.gov.uk/indefinite-leave-to-remain"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "¥8,000 application fee" },
        difficulty: "hard",
        processingDays: "10 years (or 3 via HSP)",
        special: "Standard PR requires 10yr continuous residence. HSP fast-track: 3yr with 70+ points. Japanese language required for naturalization. Very rare for Tunisian nationals.",
        visaFee: 80,
        officialUrl: "https://www.moj.go.jp/isa/applications/status/permanent_resident.html"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "€320+ residence fee" },
        difficulty: "moderate",
        processingDays: "5 years → PR",
        special: "D3/D7/D8 visa → 5yr legal residency → Permanent Residence. Portuguese B2 required. Portugal increasingly popular with Tunisian professionals as an EU gateway.",
        visaFee: 320,
        officialUrl: "https://aima.gov.pt/en"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "DV Lottery or EB petition" },
        difficulty: "hard",
        processingDays: "3~15+ years",
        special: "Diversity Visa (DV) Lottery: Tunisia is eligible most years. Employment-based EB Green Card via employer sponsorship. Long queues for most EB categories.",
        visaFee: 325,
        officialUrl: "https://www.uscis.gov/green-card"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "THB 600,000 Elite / LTR" },
        difficulty: "hard",
        processingDays: "No standard PR",
        special: "No standard PR path. Thailand Elite Visa (THB 600,000) for long-term stays. LTR requires $80K income or $250K savings — challenging for most Tunisian applicants.",
        visaFee: 10000,
        officialUrl: "https://www.thailand-elite.com"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "NZD 3,310 visa fee" },
        difficulty: "moderate",
        processingDays: "18~36 months",
        special: "Points-based Skilled Migrant. Skills assessment for Tunisian qualifications required. IELTS 6.5+ typically needed. After 5yr residency → citizenship eligible.",
        visaFee: 2610,
        officialUrl: "https://www.immigration.govt.nz"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "€269+ residence fees" },
        difficulty: "easy",
        processingDays: "3~5 years → Carte de Résident",
        special: "Franco-Tunisian bilateral treaty (1988) is one of most advantageous in Europe for Tunisians. Largest Tunisian diaspora globally is in France (~640,000). After 3yr legal residency → Carte de Résident possible. French B1 required. Fastest naturalization route for Tunisians.",
        visaFee: 269,
        officialUrl: "https://www.service-public.fr/particuliers/vosdroits/F11429"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "€183+ IND fee" },
        difficulty: "hard",
        processingDays: "5 years → PR",
        special: "5yr continuous legal stay → PR. Dutch language A2 required. Integration contract (inburgering). Difficult process for non-EU applicants.",
        visaFee: 183,
        officialUrl: "https://ind.nl/en/residence-permits/permanent-residence"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "€10.20+ permit fee" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "EU Long-term Residence after 5yr. Italian A2 language. Largest Tunisian community in EU outside France (Sicily, Turin, Milan). Italy-Tunisia bilateral agreement facilitates path.",
        visaFee: 10,
        officialUrl: "https://www.interno.gov.it"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "€20+ residence card" },
        difficulty: "moderate",
        processingDays: "5 years → EU PR",
        special: "Long-term EU Residency after 5yr. Spanish A2 language. Arraigo social path after 3yr if documented community ties. Arraigo laboral for workers. Growing Tunisian community.",
        visaFee: 20,
        officialUrl: "https://www.inclusion.gob.es/web/migraciones"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "MYR 500K MM2H deposit" },
        difficulty: "hard",
        processingDays: "10+ years",
        special: "PR highly discretionary and very difficult. MM2H (10yr renewable) practical option: MYR 500K fixed deposit. OIC connection makes Malaysia culturally comfortable despite difficult legal path.",
        visaFee: 5000,
        officialUrl: "https://mm2h.gov.my"
      }
    },
    travel: {
      canada: {
        cost: { annual: 0, currency: "USD", label: "Visitor Visa required" },
        difficulty: "hard",
        processingDays: "2~8 weeks",
        special: "Tunisian passport requires Temporary Resident Visa. Apply online or via VAC in Tunis. Financial proof, accommodation, and ties to Tunisia required. Advance planning essential.",
        visaFee: 100,
        weeklyLiving: 420,
        flightMinUSD: 900,
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
      },
      germany: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa required at German consulate in Tunis. Appointment wait 2-4 weeks. Financial proof, accommodation, travel insurance, and itinerary required. 90/180 day max.",
        visaFee: 80,
        weeklyLiving: 350,
        flightMinUSD: 200,
        officialUrl: "https://tunesien.diplo.de/tn-ar/service/-/1418918"
      },
      australia: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa required" },
        difficulty: "hard",
        processingDays: "2~4 weeks",
        special: "Australian visitor visa required for Tunisians. Apply online with financial evidence and ties to Tunisia. ETA not available for Tunisian passport.",
        visaFee: 145,
        weeklyLiving: 400,
        flightMinUSD: 1100,
        officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600"
      },
      singapore: {
        cost: { annual: 0, currency: "USD", label: "Visa required" },
        difficulty: "hard",
        processingDays: "5~10 days",
        special: "Visa required for Tunisian passport holders. Apply via Singapore embassy or authorized agent. Financial evidence required. 96hr IPATA transit without visa available.",
        visaFee: 30,
        weeklyLiving: 280,
        flightMinUSD: 600,
        officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa-requirements"
      },
      uae: {
        cost: { annual: 0, currency: "USD", label: "Visa on arrival 30 days" },
        difficulty: "easy",
        processingDays: "On arrival",
        special: "Tunisian passport → 30-day visa on arrival at UAE airports. One of easiest entries for Tunisian travelers. Dubai very popular for Tunisian tourists and business visitors.",
        visaFee: 0,
        weeklyLiving: 350,
        flightMinUSD: 300,
        officialUrl: "https://u.ae/en/information-and-services/visa-and-emirates-id"
      },
      uk: {
        cost: { annual: 0, currency: "USD", label: "Standard Visitor Visa required" },
        difficulty: "hard",
        processingDays: "3~6 weeks",
        special: "UK Visitor visa required. Financial evidence, accommodation, return ticket, employment proof. Apply minimum 3-4 weeks before travel.",
        visaFee: 115,
        weeklyLiving: 500,
        flightMinUSD: 300,
        officialUrl: "https://www.gov.uk/standard-visitor-visa"
      },
      japan: {
        cost: { annual: 0, currency: "USD", label: "Tourist visa required" },
        difficulty: "hard",
        processingDays: "3~5 days",
        special: "Japanese tourist visa required for Tunisian passport. Apply at Japanese Embassy Tunis. Financial evidence, itinerary, accommodation proof. No Visa Waiver for Tunisia.",
        visaFee: 20,
        weeklyLiving: 250,
        flightMinUSD: 800,
        officialUrl: "https://www.tn.emb-japan.go.jp"
      },
      portugal: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa required. Can apply via French, Spanish, or Portuguese consulate. French consulate in Tunis has historically fast processing. 90/180 day rule.",
        visaFee: 80,
        weeklyLiving: 220,
        flightMinUSD: 200,
        officialUrl: "https://www.schengenvisainfo.com/portugal-visa/"
      },
      usa: {
        cost: { annual: 0, currency: "USD", label: "B-2 Tourist Visa required" },
        difficulty: "hard",
        processingDays: "2~6 months",
        special: "B-2 visitor visa requires US Embassy interview in Tunis. Non-immigrant intent proof essential. Financial ties to Tunisia required. ESTA not available. Apply 6 months ahead.",
        visaFee: 185,
        weeklyLiving: 350,
        flightMinUSD: 800,
        officialUrl: "https://tn.usembassy.gov"
      },
      thailand: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Tunisian passport → 30-day visa-free entry to Thailand. Popular holiday destination. Phuket, Bangkok, and Koh Samui accessible. Extendable 30 days locally.",
        visaFee: 0,
        weeklyLiving: 150,
        flightMinUSD: 500,
        officialUrl: "https://www.thaiembassy.com/thailand/thailand-visa-exemption.php"
      },
      newzealand: {
        cost: { annual: 0, currency: "USD", label: "Visitor visa NZD 211" },
        difficulty: "hard",
        processingDays: "2~4 weeks",
        special: "NZeTA not available for Tunisian passport. Standard visitor visa required. Financial evidence and ties to Tunisia needed. Apply via Immigration New Zealand online.",
        visaFee: 170,
        weeklyLiving: 300,
        flightMinUSD: 1200,
        officialUrl: "https://www.immigration.govt.nz"
      },
      france: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "moderate",
        processingDays: "15~30 days",
        special: "Schengen visa via French consulate in Tunis — one of world's busiest. Very large applicant volume causes delays at peak. French language proficiency helps. Bilateral ties facilitate processing.",
        visaFee: 80,
        weeklyLiving: 300,
        flightMinUSD: 150,
        officialUrl: "https://fr.ambafrance.org/-Tunisie-"
      },
      netherlands: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa required. Can apply at Dutch, French, or German consulate in Tunis. Financial proof, hotel bookings, and travel insurance required.",
        visaFee: 80,
        weeklyLiving: 320,
        flightMinUSD: 200,
        officialUrl: "https://www.schengenvisainfo.com/netherlands-visa/"
      },
      italy: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa via Italian consulate in Tunis. Italy-Tunisia proximity (shortest Mediterranean crossing). Historical large Tunisian community in Italy facilitates consulate familiarity.",
        visaFee: 80,
        weeklyLiving: 250,
        flightMinUSD: 100,
        officialUrl: "https://ambtunis.esteri.it/it/"
      },
      spain: {
        cost: { annual: 0, currency: "USD", label: "Schengen visa required" },
        difficulty: "hard",
        processingDays: "15~30 days",
        special: "Schengen visa via Spanish consulate in Tunis. Spain-Tunisia bilateral goodwill due to geographic proximity. Some historically faster processing than northern EU consulates.",
        visaFee: 80,
        weeklyLiving: 220,
        flightMinUSD: 150,
        officialUrl: "https://www.schengenvisainfo.com/spain-visa/"
      },
      malaysia: {
        cost: { annual: 0, currency: "USD", label: "Visa-free 30 days" },
        difficulty: "easy",
        processingDays: "Visa-free",
        special: "Tunisian passport → 30-day visa-free entry to Malaysia. OIC and Muslim majority solidarity. KL popular for Tunisian travelers. Halal food widely available. Very affordable.",
        visaFee: 0,
        weeklyLiving: 80,
        flightMinUSD: 500,
        officialUrl: "https://www.imi.gov.my/index.php/en/main-services/visa/visa-exemption.html"
      }
    }
  }
};
