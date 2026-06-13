// D3 world map rendering
// Requires: d3 v7, topojson-client, world-atlas countries-110m.json
// Globals: TO_COUNTRIES, DATA, DIFFICULTY_CONFIG, ISO_NUMERIC

let svg, projection, path, geoData;
let currentFrom = null;
let currentPurpose = null;

// iso numeric → country key lookup
const NUMERIC_TO_KEY = {};
for (const [key, val] of Object.entries(TO_COUNTRIES)) {
  const num = ISO_NUMERIC[val.iso3];
  if (num) NUMERIC_TO_KEY[num] = key;
}

async function initMap(fromKey, purpose) {
  currentFrom = fromKey;
  currentPurpose = purpose;

  const container = document.getElementById("map-container");
  const loading = document.getElementById("map-loading");

  // Load geo data once
  if (!geoData) {
    try {
      const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
      geoData = await res.json();
    } catch (err) {
      if (loading) loading.innerHTML = '<p style="color:#f43f5e">Failed to load map data.</p>';
      return;
    }
  }

  if (loading) loading.style.display = "none";

  // Remove existing SVG
  d3.select("#map-container svg").remove();

  const w = container.clientWidth;
  const h = container.clientHeight;

  projection = d3.geoNaturalEarth1()
    .scale(Math.min(w / 6.3, h / 3.3))
    .translate([w / 2, h / 2]);

  path = d3.geoPath().projection(projection);

  svg = d3.select("#map-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // Graticule (grid lines)
  svg.append("path")
    .datum(d3.geoGraticule()())
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "#0f1e2e")
    .attr("stroke-width", 0.4);

  const countries = topojson.feature(geoData, geoData.objects.countries);

  svg.selectAll(".country-path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", d => {
      const key = NUMERIC_TO_KEY[d.id];
      return key ? "country-path country-supported" : "country-path";
    })
    .attr("d", path)
    .each(function(d) {
      applyCountryStyle(d3.select(this), d, fromKey, purpose);
    })
    .on("mouseenter", function(event, d) {
      const key = NUMERIC_TO_KEY[d.id];
      if (!key) return;
      showTooltip(event, key, currentFrom, currentPurpose);
    })
    .on("mousemove", function(event) {
      updateTooltipPos(event);
    })
    .on("mouseleave", function() {
      hideTooltip();
    })
    .on("click", function(event, d) {
      const key = NUMERIC_TO_KEY[d.id];
      if (!key) return;
      window.location.href = `articles/${currentFrom}-to-${key}-${currentPurpose}-2026.html`;
    });

  // Zoom
  const zoom = d3.zoom()
    .scaleExtent([1, 6])
    .on("zoom", (event) => {
      svg.selectAll(".country-path").attr("transform", event.transform);
      svg.selectAll("path").attr("transform", event.transform);
    });

  svg.call(zoom);
}

function applyCountryStyle(sel, d, fromKey, purpose) {
  const key = NUMERIC_TO_KEY[d.id];
  if (!key) {
    sel.attr("fill", "#1e2d3a").attr("stroke", "#263548").attr("stroke-width", 0.5);
    return;
  }
  const entry = DATA[fromKey]?.[purpose]?.[key];
  const diff = entry ? DIFFICULTY_CONFIG[entry.difficulty] : DIFFICULTY_CONFIG.none;
  sel
    .attr("fill", diff.fill)
    .attr("stroke", diff.stroke)
    .attr("stroke-width", 1.5)
    .style("color", diff.fill); // for drop-shadow currentColor
}

function updateMapPurpose(fromKey, purpose) {
  currentFrom = fromKey;
  currentPurpose = purpose;

  if (!svg) return;

  svg.selectAll(".country-path")
    .transition()
    .duration(300)
    .each(function(d) {
      applyCountryStyle(d3.select(this), d, fromKey, purpose);
    });
}

function resizeMap() {
  if (!geoData || !currentFrom) return;
  initMap(currentFrom, currentPurpose);
}

window.addEventListener("resize", debounce(resizeMap, 200));

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
