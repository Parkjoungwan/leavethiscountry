// State
let selectedFrom = null;
let selectedPurpose = "study";
let rankSortMode = "composite";

// Star particle canvas
function initStars() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.2 + 0.2;
    const alpha = Math.random() * 0.6 + 0.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
}

// Rotating globe canvas — D3 orthographic projection with real world data
async function initGlobe() {
  const canvas = document.getElementById("globe");
  const ctx = canvas.getContext("2d");

  function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setSize();
  window.addEventListener("resize", setSize);

  // Load world topology (110m = low-res, fast)
  let land = null, graticule = d3.geoGraticule()();
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 5000);
    const world = await fetch(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
      { signal: ctrl.signal }
    ).then(r => r.json());
    clearTimeout(tid);
    land = topojson.feature(world, world.objects.land);
  } catch (e) {
    land = null; // continue with ocean-only fallback
  }

  const PERIOD = 60000; // ms per full rotation
  const SPHERE = { type: "Sphere" };

  // Cache projection + path — only update rotate/scale/translate each frame
  const projection = d3.geoOrthographic().clipAngle(90);
  const path = d3.geoPath(projection, ctx);

  let lastTs = 0;
  const FPS = 30;
  const MS_PER_FRAME = 1000 / FPS;

  function draw(ts) {
    // Throttle to 30fps
    if (ts - lastTs < MS_PER_FRAME) { requestAnimationFrame(draw); return; }
    lastTs = ts;

    const W = canvas.width;
    const H = canvas.height;
    const R = Math.min(W, H) * 0.32;
    const cx = W / 2;
    const cy = H / 2;

    const lon = -(ts / PERIOD) * 360;

    projection
      .scale(R)
      .translate([cx, cy])
      .rotate([lon, -15]);

    ctx.clearRect(0, 0, W, H);

    // Outer atmosphere glow
    const glow = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.35);
    glow.addColorStop(0, "rgba(59,130,246,0.18)");
    glow.addColorStop(0.5, "rgba(59,130,246,0.06)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // Ocean fill
    const ocean = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
    ocean.addColorStop(0, "#1a4a7a");
    ocean.addColorStop(1, "#061428");
    ctx.fillStyle = ocean;
    ctx.beginPath();
    path(SPHERE);
    ctx.fill();

    // Graticule (grid lines)
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = "rgba(100,160,220,0.12)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Land fill (only if topology loaded)
    if (land) {
      const landGrad = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.15, 0, cx, cy, R);
      landGrad.addColorStop(0, "#2d6a3f");
      landGrad.addColorStop(1, "#1a3d24");
      ctx.fillStyle = landGrad;
      ctx.beginPath();
      path(land);
      ctx.fill();

      ctx.beginPath();
      path(land);
      ctx.strokeStyle = "rgba(80,180,100,0.25)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    // Sphere outline
    ctx.beginPath();
    path(SPHERE);
    ctx.strokeStyle = "rgba(99,179,255,0.4)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Specular highlight (top-left gloss)
    const highlight = ctx.createRadialGradient(
      cx - R * 0.38, cy - R * 0.38, 0,
      cx - R * 0.38, cy - R * 0.38, R * 0.6
    );
    highlight.addColorStop(0, "rgba(255,255,255,0.14)");
    highlight.addColorStop(0.5, "rgba(255,255,255,0.04)");
    highlight.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = highlight;
    ctx.beginPath();
    path(SPHERE);
    ctx.fill();

    // Dark limb shadow (right/bottom edge)
    const limb = ctx.createRadialGradient(cx + R * 0.2, cy + R * 0.2, R * 0.5, cx, cy, R);
    limb.addColorStop(0, "rgba(0,0,0,0)");
    limb.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = limb;
    ctx.beginPath();
    path(SPHERE);
    ctx.fill();

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

// STEP 1 → STEP 2 transition
function selectCountry(fromKey) {
  selectedFrom = fromKey;

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const fromBadge = document.getElementById("from-badge-text");
  const fromFlag = document.getElementById("from-badge-flag");

  const country = FROM_COUNTRIES[fromKey];
  fromBadge.textContent = (typeof I18N !== "undefined") ? I18N.t("from_" + fromKey) : country.name;
  fromBadge.dataset.fromKey = fromKey;
  fromFlag.textContent = country.flag;

  step1.classList.add("fade-out");

  setTimeout(() => {
    step1.style.display = "none";
    step2.classList.add("visible");
    setActivePurposeTab(selectedPurpose);
    initMap(fromKey, selectedPurpose);
    renderRankings(fromKey, selectedPurpose, rankSortMode);
  }, 400);
}

// Purpose tab switching
function setActivePurposeTab(purpose) {
  selectedPurpose = purpose;
  document.querySelectorAll(".purpose-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.purpose === purpose);
  });
}

function switchPurpose(purpose) {
  setActivePurposeTab(purpose);
  updateMapPurpose(selectedFrom, purpose);
  renderRankings(selectedFrom, purpose, rankSortMode);
}

// Change country → back to step 1
function changeCountry() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  step2.classList.remove("visible");
  step1.style.display = "";
  step1.classList.remove("fade-out");
  selectedFrom = null;
}

// Rank panel collapse toggle
function toggleRankPanel() {
  const panel = document.getElementById("rank-panel");
  panel.classList.toggle("collapsed");
}

// Wire up on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadExchangeRates(); // fetch live rates, falls back to hardcoded
  initStars();
  initGlobe();

  // Country card clicks
  document.querySelectorAll(".country-card").forEach(card => {
    card.addEventListener("click", () => selectCountry(card.dataset.country));
  });

  // Purpose tab clicks
  document.querySelectorAll(".purpose-tab").forEach(tab => {
    tab.addEventListener("click", () => switchPurpose(tab.dataset.purpose));
  });

  // Change country button
  document.getElementById("change-country-btn").addEventListener("click", changeCountry);

  // Rank panel toggle
  document.getElementById("rank-toggle-btn").addEventListener("click", toggleRankPanel);

  // Sort mode change
  document.getElementById("rank-sort-select").addEventListener("change", e => {
    rankSortMode = e.target.value;
    if (selectedFrom) renderRankings(selectedFrom, selectedPurpose, rankSortMode);
  });
});
