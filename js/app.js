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

// STEP 1 → STEP 2 transition
function selectCountry(fromKey) {
  selectedFrom = fromKey;

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const fromBadge = document.getElementById("from-badge-text");
  const fromFlag = document.getElementById("from-badge-flag");

  const country = FROM_COUNTRIES[fromKey];
  fromBadge.textContent = country.name;
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
