// Rank 8 destination countries
// sortMode: "composite" | "difficulty" | "cost"

function computeRankings(fromKey, purpose, sortMode) {
  const entries = Object.keys(TO_COUNTRIES).map(key => {
    const d = DATA[fromKey]?.[purpose]?.[key];
    if (!d) return null;
    return { key, data: d };
  }).filter(Boolean);

  const diffScore = { easy: 3, moderate: 2, hard: 1 };

  // For travel: trip cost = visaFee + weeklyLiving + flightMin
  // For other: use cost.annual
  const getCostUSD = (e) => {
    if (purpose === "travel") {
      return (e.data.visaFee || 0) + (e.data.weeklyLiving || 0) + (e.data.flightMinUSD || 0);
    }
    return e.data.cost.annual;
  };

  const byCost = [...entries].sort((a, b) => getCostUSD(a) - getCostUSD(b));
  const costRank = {};
  byCost.forEach((e, i) => {
    costRank[e.key] = i <= 2 ? 3 : i <= 4 ? 2 : 1;
  });

  function parseSpeed(str) {
    const m = str.match(/(\d+)/);
    return m ? parseInt(m[1]) : 999;
  }
  const bySpeed = [...entries].sort((a, b) => parseSpeed(a.data.processingDays) - parseSpeed(b.data.processingDays));
  const speedRank = {};
  bySpeed.forEach((e, i) => {
    speedRank[e.key] = i <= 2 ? 3 : i <= 4 ? 2 : 1;
  });

  const scored = entries.map(e => {
    const diff = diffScore[e.data.difficulty] || 1;
    const cost = costRank[e.key] || 1;
    const speed = speedRank[e.key] || 1;
    let score;
    if (sortMode === "difficulty") score = diff * 10 + cost * 0.1;
    else if (sortMode === "cost")   score = cost * 10 + diff * 0.1;
    else                             score = diff * 0.5 + cost * 0.3 + speed * 0.2;
    return { key: e.key, score, data: e.data, tripCostUSD: getCostUSD(e) };
  });

  return scored.sort((a, b) => b.score - a.score);
}

function renderRankings(fromKey, purpose, sortMode) {
  const panel = document.getElementById("rank-list");
  if (!panel) return;

  const rankings = computeRankings(fromKey, purpose, sortMode || "composite");

  panel.innerHTML = rankings.map((item, i) => {
    const country = TO_COUNTRIES[item.key];
    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;
    const cur = FROM_CURRENCY[fromKey];
    const T = (key) => (typeof I18N !== "undefined") ? I18N.t(key) : key;

    let costStr;
    if (purpose === "travel") {
      const flightStr = cur ? cur.format(item.data.flightMinUSD || 0) : `$${item.data.flightMinUSD || 0}`;
      const weeklyStr = cur ? cur.format(item.data.weeklyLiving || 0) : `$${item.data.weeklyLiving || 0}`;
      const visaStr = item.data.visaFee === 0 ? T("cost_free") : (cur ? cur.format(item.data.visaFee) : `$${item.data.visaFee}`);
      costStr = `✈️ ${flightStr} · 🏠 ${weeklyStr}${T("tt_per_week")}`;
      if (item.data.visaFee > 0) costStr += ` · visa ${visaStr}`;
    } else {
      costStr = cur ? cur.format(item.data.cost.annual) : (item.data.cost.annual === 0 ? T("cost_free") : `~$${item.data.cost.annual.toLocaleString()}`);
    }

    return `
      <div class="rank-item" data-country="${item.key}">
        <div class="rank-medal">${medal}</div>
        <div class="rank-info">
          <div class="rank-name">${country.flag} ${country.name}</div>
          <div class="rank-meta">
            <span class="rank-diff rank-diff-${item.data.difficulty}">${T("diff_" + item.data.difficulty)}</span>
            <span class="rank-cost">${costStr}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  panel.querySelectorAll(".rank-item").forEach(el => {
    el.addEventListener("click", () => highlightCountry(el.dataset.country));
  });
}

function highlightCountry(key) {
  if (!svg) return;
  svg.selectAll(".country-supported").each(function(d) {
    const k = NUMERIC_TO_KEY[d.id];
    if (k === key) {
      const entry = DATA[currentFrom]?.[currentPurpose]?.[k];
      const diff = entry ? DIFFICULTY_CONFIG[entry.difficulty] : DIFFICULTY_CONFIG.none;
      const brightColor = d3.color(diff.fill);
      if (brightColor) {
        d3.select(this)
          .attr("fill", brightColor.brighter(0.9).formatHex())
          .transition().duration(700)
          .attr("fill", diff.fill);
      }
    }
  });
}
