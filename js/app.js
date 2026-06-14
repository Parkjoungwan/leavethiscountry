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

// Rotating globe canvas
function initGlobe() {
  const canvas = document.getElementById("globe");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const PERIOD = 60000; // ms per full rotation
  const LAT_LINES = 6;  // latitude rings (excl. equator)
  const LON_LINES = 12; // longitude lines

  function draw(ts) {
    const W = canvas.width;
    const H = canvas.height;
    const R = Math.min(W, H) * 0.32;
    const cx = W / 2;
    const cy = H / 2;
    const phase = (ts / PERIOD) * Math.PI * 2; // rotation angle

    ctx.clearRect(0, 0, W, H);

    // Glow behind globe
    const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.4);
    glow.addColorStop(0, "rgba(59,130,246,0.07)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    // Clip everything to the globe circle
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();

    // Filled sphere base
    const sphere = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * 0.05, cx, cy, R);
    sphere.addColorStop(0, "rgba(30,50,90,0.55)");
    sphere.addColorStop(1, "rgba(5,15,35,0.75)");
    ctx.fillStyle = sphere;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

    // Latitude lines
    for (let i = 1; i <= LAT_LINES; i++) {
      const lat = (i / (LAT_LINES + 1)) * Math.PI - Math.PI / 2; // -PI/2 to PI/2
      const y = cy + R * Math.sin(lat);
      const rx = R * Math.cos(lat);
      const ry = rx * 0.28; // flattening for perspective
      ctx.beginPath();
      ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99,179,255,0.18)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Longitude lines (rotate with phase)
    for (let i = 0; i < LON_LINES; i++) {
      const lon = phase + (i / LON_LINES) * Math.PI * 2;
      const cosLon = Math.cos(lon);
      // rx = R * |cos(lon)| — width of the ellipse at this rotation
      const rx = Math.abs(cosLon) * R;
      const ry = R;
      // Lines on the front half are more opaque
      const front = cosLon > 0;
      const alpha = front ? 0.22 : 0.07;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(99,179,255,${alpha})`;
      ctx.lineWidth = front ? 0.9 : 0.5;
      ctx.stroke();
    }

    ctx.restore();

    // Globe outline
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(99,179,255,0.35)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Specular highlight
    const highlight = ctx.createRadialGradient(
      cx - R * 0.35, cy - R * 0.35, 0,
      cx - R * 0.35, cy - R * 0.35, R * 0.55
    );
    highlight.addColorStop(0, "rgba(255,255,255,0.12)");
    highlight.addColorStop(1, "rgba(255,255,255,0)");
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = highlight;
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
