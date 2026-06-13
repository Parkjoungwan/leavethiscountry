const tooltip = document.getElementById("tooltip");
let hideTimer = null;

function showTooltip(e, countryKey, fromKey, purpose) {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

  const data = DATA[fromKey]?.[purpose]?.[countryKey];
  const country = TO_COUNTRIES[countryKey];
  if (!data || !country) return;

  const diff = DIFFICULTY_CONFIG[data.difficulty] || DIFFICULTY_CONFIG.none;
  const purposeLabel = PURPOSES[purpose].label;

  const cur = FROM_CURRENCY[fromKey];
  const visaLabel = data.visaFee === 0 ? "Free" : `$${data.visaFee}`;
  const articleUrl = `articles/${fromKey}-to-${countryKey}-${purpose}-2026.html`;

  let costRows;
  if (purpose === "travel") {
    const weeklyStr = cur ? cur.format(data.weeklyLiving || 0) : `$${data.weeklyLiving || 0}`;
    const flightStr = cur ? cur.format(data.flightMinUSD || 0) : `$${data.flightMinUSD || 0}`;
    costRows = `
        <div class="tooltip-row"><span class="label">Visa fee</span><span class="val">${visaLabel}</span></div>
        <div class="tooltip-row"><span class="label">Weekly living</span><span class="val">${weeklyStr}/wk</span></div>
        <div class="tooltip-row"><span class="label">Cheapest flight</span><span class="val">from ${flightStr}</span></div>`;
  } else {
    const localCost = data.cost.annual === 0
      ? "Free"
      : `${cur.formatFull(data.cost.annual)}/yr`;
    const nativeCost = data.cost.label;
    costRows = `
        <div class="tooltip-row"><span class="label">Est. cost</span><span class="val">${localCost} <span style="color:var(--text-muted);font-size:11px">(${nativeCost})</span></span></div>
        <div class="tooltip-row"><span class="label">Visa fee</span><span class="val">${visaLabel}</span></div>`;
  }

  tooltip.innerHTML = `
    <div class="tooltip-inner">
      <div class="tooltip-header">
        <div class="tooltip-country">
          <span>${country.flag}</span>
          <span>${country.name}</span>
        </div>
        <span class="diff-badge ${data.difficulty}">${diff.label}</span>
      </div>
      <div class="tooltip-divider"></div>
      <div class="tooltip-rows">
        <div class="tooltip-row"><span class="label">Purpose</span><span class="val">${purposeLabel}</span></div>
        ${costRows}
        <div class="tooltip-row"><span class="label">Processing</span><span class="val">${data.processingDays}</span></div>
        <div class="tooltip-row"><span class="label">Key condition</span><span class="val">${data.special}</span></div>
      </div>
      <a class="tooltip-cta" href="${articleUrl}">See full comparison →</a>
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
