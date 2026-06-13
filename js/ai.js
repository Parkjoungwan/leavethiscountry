// Claude API key — replace with Cloudflare Pages env var injection at build time
// For local dev: set window.CLAUDE_API_KEY before loading this script
const CLAUDE_API_KEY = window.CLAUDE_API_KEY || "";

const AI_COOLDOWN_MS = 30000;
let lastAiCall = 0;

function buildPrompt(fromName, purpose, countriesData) {
  const lines = Object.entries(countriesData).map(([key, d]) => {
    const country = TO_COUNTRIES[key];
    return `${country.name}: Cost ${d.cost.label}, Difficulty ${d.difficulty}, Processing ${d.processingDays}, Key: ${d.special}`;
  }).join("\n");

  return `You are a friendly immigration advisor.
A person from ${fromName} wants to ${purpose} abroad.
Here is comparison data for 8 countries:
${lines}
Write a 3-sentence personalized recommendation in English.
Be specific. Mention the top 2 countries and why.
Keep it casual and helpful, not formal.`;
}

async function getAIRecommendation(fromKey, purpose) {
  if (!CLAUDE_API_KEY) return null;

  const now = Date.now();
  if (now - lastAiCall < AI_COOLDOWN_MS) return null;
  lastAiCall = now;

  const fromName = FROM_COUNTRIES[fromKey].name;
  const countriesData = DATA[fromKey][purpose];

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: buildPrompt(fromName, purpose, countriesData) }]
      })
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch {
    return null;
  }
}
