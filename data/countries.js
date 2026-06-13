const FROM_COUNTRIES = {
  india:    { name: "India",     flag: "🇮🇳", code: "IN", passportRank: 80 },
  korea:    { name: "South Korea", flag: "🇰🇷", code: "KR", passportRank: 2 },
  japan:    { name: "Japan",     flag: "🇯🇵", code: "JP", passportRank: 1 },
  hongkong: { name: "Hong Kong", flag: "🇭🇰", code: "HK", passportRank: 19 }
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
        difficulty: "easy",
        processingDays: "6 months",
        special: "PR after 5yr. Dutch civic integration exam required. 30% tax ruling available for first 5yr of employment. Strong expat infrastructure in Amsterdam.",
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
  }
};
