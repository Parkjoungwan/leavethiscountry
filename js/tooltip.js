const tooltip = document.getElementById("tooltip");
let hideTimer = null;

function showTooltip(e, countryKey, fromKey, purpose) {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

  const data = DATA[fromKey]?.[purpose]?.[countryKey];
  const country = TO_COUNTRIES[countryKey];
  if (!data || !country) return;

  const diff = DIFFICULTY_CONFIG[data.difficulty] || DIFFICULTY_CONFIG.none;
  const T = (key) => (typeof I18N !== "undefined") ? I18N.t(key) : key;

  const cur = FROM_CURRENCY[fromKey];
  const visaLabel = data.visaFee === 0 ? T("tt_free") : `$${data.visaFee}`;
  const articleUrl = getArticleUrl(fromKey, countryKey, purpose);

  let costRows;
  if (purpose === "travel") {
    const weeklyStr = cur ? cur.format(data.weeklyLiving || 0) : `$${data.weeklyLiving || 0}`;
    const flightStr = cur ? cur.format(data.flightMinUSD || 0) : `$${data.flightMinUSD || 0}`;
    costRows = `
        <div class="tooltip-row"><span class="label">${T("tt_visa_fee")}</span><span class="val">${visaLabel}</span></div>
        <div class="tooltip-row"><span class="label">${T("tt_weekly")}</span><span class="val">${weeklyStr}${T("tt_per_week")}</span></div>
        <div class="tooltip-row"><span class="label">${T("tt_flight")}</span><span class="val">${T("tt_from")} ${flightStr}</span></div>`;
  } else {
    const localCost = data.cost.annual === 0
      ? T("tt_free")
      : `${cur.formatFull(data.cost.annual)}/yr`;
    const nativeCost = data.cost.label;
    costRows = `
        <div class="tooltip-row"><span class="label">${T("tt_cost")}</span><span class="val">${localCost} <span style="color:var(--text-muted);font-size:11px">(${nativeCost})</span></span></div>
        <div class="tooltip-row"><span class="label">${T("tt_visa_fee")}</span><span class="val">${visaLabel}</span></div>`;
  }

  tooltip.innerHTML = `
    <div class="tooltip-inner">
      <div class="tooltip-header">
        <div class="tooltip-country">
          <span>${country.flag}</span>
          <span>${country.name}</span>
        </div>
        <span class="diff-badge ${data.difficulty}">${T("diff_" + data.difficulty)}</span>
      </div>
      <div class="tooltip-divider"></div>
      <div class="tooltip-rows">
        <div class="tooltip-row"><span class="label">${T("tt_purpose")}</span><span class="val">${T("purpose_" + purpose)}</span></div>
        ${costRows}
        <div class="tooltip-row"><span class="label">${T("tt_processing")}</span><span class="val">${data.processingDays}</span></div>
        <div class="tooltip-row"><span class="label">${T("tt_condition")}</span><span class="val">${data.special}</span></div>
      </div>
      ${articleUrl ? `<a class="tooltip-cta" href="${articleUrl}">${T("tt_cta")}</a>` : ''}
    </div>
  `;

  positionTooltip(e.clientX, e.clientY);
  tooltip.classList.remove("hiding");
  tooltip.classList.add("visible");
}

function positionTooltip(mx, my) {
  const tw = 300, th = 280;
  const x = Math.min(mx + 16, window.innerWidth - tw - 8);
  const y = Math.min(my - 20, window.innerHeight - th - 8);
  tooltip.style.left = x + "px";
  tooltip.style.top = Math.max(8, y) + "px";
}

function updateTooltipPos(e) {
  if (tooltip.classList.contains("visible")) {
    positionTooltip(e.clientX, e.clientY);
  }
}

function hideTooltip() {
  tooltip.classList.add("hiding");
  hideTimer = setTimeout(() => {
    tooltip.classList.remove("visible", "hiding");
  }, 100);
}
