// Live exchange rates via Frankfurter API (ECB data, no API key needed)
// Caches in localStorage for 24 hours, falls back to hardcoded on failure

const RATES_CACHE_KEY = "ltc_rates_v1";
const RATES_CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

async function loadExchangeRates() {
  // Check cache
  try {
    const cached = localStorage.getItem(RATES_CACHE_KEY);
    if (cached) {
      const { rates, ts } = JSON.parse(cached);
      if (Date.now() - ts < RATES_CACHE_TTL) {
        applyRates(rates);
        return;
      }
    }
  } catch {}

  // Fetch fresh rates — CDN-hosted JSON, no CORS issues
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json();
    const r = data.usd;
    const rates = { INR: r.inr, KRW: r.krw, JPY: r.jpy, HKD: r.hkd };

    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({ rates, ts: Date.now() }));
    applyRates(rates);
  } catch {
    // Silently use hardcoded fallback already in FROM_CURRENCY
  }
}

function applyRates(rates) {
  if (rates.INR) FROM_CURRENCY.india.rateFromUSD = rates.INR;
  if (rates.KRW) FROM_CURRENCY.korea.rateFromUSD = rates.KRW;
  if (rates.JPY) FROM_CURRENCY.japan.rateFromUSD = rates.JPY;
  if (rates.HKD) FROM_CURRENCY.hongkong.rateFromUSD = rates.HKD;
}
