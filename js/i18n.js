const TRANSLATIONS = {
  en: {
    // Article UI
    back_to_map: "← Back to map",
    home: "Home",
    art_work: "Work", art_study: "Study", art_immigration: "Immigration", art_travel: "Travel",
    qf_work: "Quick Facts — Work", qf_study: "Quick Facts — Study",
    qf_immigration: "Quick Facts — Immigration", qf_travel: "Quick Facts — Travel",
    label_difficulty: "Difficulty", label_processing: "Processing Time",
    official_sources: "Official Sources",
    about_guide: "About this guide",
    more_guides_from: "More guides from",
    // Main app
    step1_heading: "Where are you leaving from?",
    step1_sub: "We'll show you where you can go — and how hard it is.",
    passport_rank: "Passport Rank",
    from_india: "India", from_korea: "South Korea", from_japan: "Japan", from_hongkong: "Hong Kong",
    tab_study: "🎓 Study", tab_work: "💼 Work", tab_immigration: "🏠 Immigration", tab_travel: "✈️ Travel",
    from_label: "From", change_country: "← Change country",
    rankings: "🏆 Rankings", sort_by: "Sort by",
    sort_overall: "Overall", sort_easiest: "Easiest", sort_cheapest: "Cheapest",
    legend_easy: "Easy", legend_moderate: "Moderate", legend_hard: "Hard", legend_nodata: "No data",
    destinations_covered: "16 destinations covered",
    map_loading: "Loading world map…",
    diff_easy: "Easy", diff_moderate: "Moderate", diff_hard: "Hard", diff_none: "No data",
    purpose_study: "Study", purpose_work: "Work", purpose_immigration: "Immigration", purpose_travel: "Travel",
    tt_purpose: "Purpose", tt_cost: "Est. cost", tt_visa_fee: "Visa fee",
    tt_weekly: "Weekly living", tt_flight: "Cheapest flight",
    tt_processing: "Processing", tt_condition: "Key condition",
    tt_cta: "See full comparison →", tt_free: "Free", tt_from: "from", tt_per_week: "/wk",
    cost_free: "Free",
  },
  ko: {
    back_to_map: "← 지도로 돌아가기", home: "홈",
    art_work: "취업", art_study: "유학", art_immigration: "이민", art_travel: "여행",
    qf_work: "핵심 정보 — 취업", qf_study: "핵심 정보 — 유학",
    qf_immigration: "핵심 정보 — 이민", qf_travel: "핵심 정보 — 여행",
    label_difficulty: "난이도", label_processing: "처리 기간",
    official_sources: "공식 출처", about_guide: "이 가이드 정보",
    more_guides_from: "같은 출발지 가이드",
    step1_heading: "어느 나라를 떠나시나요?",
    step1_sub: "갈 수 있는 나라와 비자 난이도를 보여드릴게요.",
    passport_rank: "여권 순위",
    from_india: "인도", from_korea: "한국", from_japan: "일본", from_hongkong: "홍콩",
    tab_study: "🎓 유학", tab_work: "💼 취업", tab_immigration: "🏠 이민", tab_travel: "✈️ 여행",
    from_label: "출발", change_country: "← 국가 변경",
    rankings: "🏆 랭킹", sort_by: "정렬",
    sort_overall: "종합", sort_easiest: "쉬운 순", sort_cheapest: "저렴한 순",
    legend_easy: "쉬움", legend_moderate: "보통", legend_hard: "어려움", legend_nodata: "데이터 없음",
    destinations_covered: "16개 목적지",
    map_loading: "지도 불러오는 중…",
    diff_easy: "쉬움", diff_moderate: "보통", diff_hard: "어려움", diff_none: "데이터 없음",
    purpose_study: "유학", purpose_work: "취업", purpose_immigration: "이민", purpose_travel: "여행",
    tt_purpose: "목적", tt_cost: "예상 비용", tt_visa_fee: "비자 수수료",
    tt_weekly: "주간 생활비", tt_flight: "최저 항공료",
    tt_processing: "처리 기간", tt_condition: "핵심 조건",
    tt_cta: "전체 가이드 보기 →", tt_free: "무료", tt_from: "부터", tt_per_week: "/주",
    cost_free: "무료",
  },
  zh: {
    back_to_map: "← 返回地圖", home: "首頁",
    art_work: "工作", art_study: "留學", art_immigration: "移民", art_travel: "旅遊",
    qf_work: "重點資訊 — 工作", qf_study: "重點資訊 — 留學",
    qf_immigration: "重點資訊 — 移民", qf_travel: "重點資訊 — 旅遊",
    label_difficulty: "難度", label_processing: "處理時間",
    official_sources: "官方來源", about_guide: "關於本指南",
    more_guides_from: "更多出發地指南",
    step1_heading: "你想離開哪個國家？",
    step1_sub: "我們會告訴你可以去哪裡，以及簽證難度。",
    passport_rank: "護照排名",
    from_india: "印度", from_korea: "南韓", from_japan: "日本", from_hongkong: "香港",
    tab_study: "🎓 留學", tab_work: "💼 工作", tab_immigration: "🏠 移民", tab_travel: "✈️ 旅遊",
    from_label: "出發地", change_country: "← 更換國家",
    rankings: "🏆 排名", sort_by: "排序",
    sort_overall: "綜合", sort_easiest: "最容易", sort_cheapest: "最便宜",
    legend_easy: "容易", legend_moderate: "中等", legend_hard: "困難", legend_nodata: "無資料",
    destinations_covered: "16個目的地",
    map_loading: "地圖載入中…",
    diff_easy: "容易", diff_moderate: "中等", diff_hard: "困難", diff_none: "無資料",
    purpose_study: "留學", purpose_work: "工作", purpose_immigration: "移民", purpose_travel: "旅遊",
    tt_purpose: "目的", tt_cost: "預計費用", tt_visa_fee: "簽證費",
    tt_weekly: "每週生活費", tt_flight: "最低機票",
    tt_processing: "處理時間", tt_condition: "主要條件",
    tt_cta: "查看完整指南 →", tt_free: "免費", tt_from: "起", tt_per_week: "/週",
    cost_free: "免費",
  },
  hi: {
    back_to_map: "← मानचित्र पर वापस", home: "होम",
    art_work: "काम", art_study: "पढ़ाई", art_immigration: "आव्रजन", art_travel: "यात्रा",
    qf_work: "मुख्य जानकारी — काम", qf_study: "मुख्य जानकारी — पढ़ाई",
    qf_immigration: "मुख्य जानकारी — आव्रजन", qf_travel: "मुख्य जानकारी — यात्रा",
    label_difficulty: "कठिनाई", label_processing: "प्रसंस्करण समय",
    official_sources: "आधिकारिक स्रोत", about_guide: "इस गाइड के बारे में",
    more_guides_from: "और गाइड —",
    step1_heading: "आप किस देश को छोड़ना चाहते हैं?",
    step1_sub: "हम दिखाएंगे कि आप कहाँ जा सकते हैं और वीज़ा कितना कठिन है।",
    passport_rank: "पासपोर्ट रैंक",
    from_india: "भारत", from_korea: "दक्षिण कोरिया", from_japan: "जापान", from_hongkong: "हांगकांग",
    tab_study: "🎓 पढ़ाई", tab_work: "💼 काम", tab_immigration: "🏠 आव्रजन", tab_travel: "✈️ यात्रा",
    from_label: "से", change_country: "← देश बदलें",
    rankings: "🏆 रैंकिंग", sort_by: "क्रमबद्ध",
    sort_overall: "समग्र", sort_easiest: "सबसे आसान", sort_cheapest: "सबसे सस्ता",
    legend_easy: "आसान", legend_moderate: "मध्यम", legend_hard: "कठिन", legend_nodata: "डेटा नहीं",
    destinations_covered: "16 गंतव्य",
    map_loading: "मानचित्र लोड हो रहा है…",
    diff_easy: "आसान", diff_moderate: "मध्यम", diff_hard: "कठिन", diff_none: "डेटा नहीं",
    purpose_study: "पढ़ाई", purpose_work: "काम", purpose_immigration: "आव्रजन", purpose_travel: "यात्रा",
    tt_purpose: "उद्देश्य", tt_cost: "अनुमानित लागत", tt_visa_fee: "वीज़ा शुल्क",
    tt_weekly: "साप्ताहिक खर्च", tt_flight: "सस्ती उड़ान",
    tt_processing: "प्रसंस्करण", tt_condition: "मुख्य शर्त",
    tt_cta: "पूरी गाइड देखें →", tt_free: "मुफ्त", tt_from: "से", tt_per_week: "/सप्ताह",
    cost_free: "मुफ्त",
  },
  ja: {
    back_to_map: "← 地図に戻る", home: "ホーム",
    art_work: "就労", art_study: "留学", art_immigration: "移住", art_travel: "旅行",
    qf_work: "基本情報 — 就労", qf_study: "基本情報 — 留学",
    qf_immigration: "基本情報 — 移住", qf_travel: "基本情報 — 旅行",
    label_difficulty: "難易度", label_processing: "審査期間",
    official_sources: "公式情報源", about_guide: "このガイドについて",
    more_guides_from: "同じ出発国のガイド",
    step1_heading: "どの国を離れますか？",
    step1_sub: "行ける国とビザの難易度をお見せします。",
    passport_rank: "パスポートランク",
    from_india: "インド", from_korea: "韓国", from_japan: "日本", from_hongkong: "香港",
    tab_study: "🎓 留学", tab_work: "💼 就労", tab_immigration: "🏠 移住", tab_travel: "✈️ 旅行",
    from_label: "出発地", change_country: "← 国を変更",
    rankings: "🏆 ランキング", sort_by: "並び替え",
    sort_overall: "総合", sort_easiest: "容易な順", sort_cheapest: "安い順",
    legend_easy: "簡単", legend_moderate: "普通", legend_hard: "難しい", legend_nodata: "データなし",
    destinations_covered: "16の渡航先",
    map_loading: "地図を読み込み中…",
    diff_easy: "簡単", diff_moderate: "普通", diff_hard: "難しい", diff_none: "データなし",
    purpose_study: "留学", purpose_work: "就労", purpose_immigration: "移住", purpose_travel: "旅行",
    tt_purpose: "目的", tt_cost: "概算費用", tt_visa_fee: "ビザ料金",
    tt_weekly: "週間生活費", tt_flight: "最安航空券",
    tt_processing: "審査期間", tt_condition: "主な条件",
    tt_cta: "詳細ガイドを見る →", tt_free: "無料", tt_from: "から", tt_per_week: "/週",
    cost_free: "無料",
  }
};

const I18N = (() => {
  let lang = localStorage.getItem("ltc_lang") || "en";

  function t(key) {
    return (TRANSLATIONS[lang] || TRANSLATIONS.en)[key] || TRANSLATIONS.en[key] || key;
  }

  function applyLang(newLang) {
    lang = newLang;
    localStorage.setItem("ltc_lang", lang);

    document.documentElement.lang = lang;

    // Update all data-i18n elements
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });

    // Update purpose tab text
    document.querySelectorAll(".purpose-tab[data-purpose]").forEach(btn => {
      btn.textContent = t("tab_" + btn.dataset.purpose);
    });

    // Update sort select options
    const sel = document.getElementById("rank-sort-select");
    if (sel) {
      sel.options[0].text = t("sort_overall");
      sel.options[1].text = t("sort_easiest");
      sel.options[2].text = t("sort_cheapest");
    }

    // Update all switcher instances
    document.querySelectorAll(".lang-opt").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    document.querySelectorAll(".lang-current").forEach(el => {
      el.textContent = lang.toUpperCase();
    });

    // Update from-badge country name
    const badgeText = document.getElementById("from-badge-text");
    if (badgeText && badgeText.dataset.fromKey) {
      badgeText.textContent = t("from_" + badgeText.dataset.fromKey);
    }

    // Re-render rankings if visible
    if (typeof renderRankings === "function" && typeof selectedFrom !== "undefined" && selectedFrom) {
      renderRankings(selectedFrom, selectedPurpose, rankSortMode);
    }
  }

  function init() {
    applyLang(lang);

    // Wire up all .lang-sw instances
    document.querySelectorAll(".lang-sw").forEach(sw => {
      const trigger = sw.querySelector(".lang-trigger");
      const menu = sw.querySelector(".lang-menu");
      if (!trigger || !menu) return;

      trigger.addEventListener("click", e => {
        e.stopPropagation();
        // Close other open menus
        document.querySelectorAll(".lang-menu.open").forEach(m => {
          if (m !== menu) m.classList.remove("open");
        });
        menu.classList.toggle("open");
      });
    });

    document.querySelectorAll(".lang-opt").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        applyLang(btn.dataset.lang);
        document.querySelectorAll(".lang-menu").forEach(m => m.classList.remove("open"));
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".lang-menu").forEach(m => m.classList.remove("open"));
    });
  }

  return { t, setLang: applyLang, init };
})();

document.addEventListener("DOMContentLoaded", () => I18N.init());
