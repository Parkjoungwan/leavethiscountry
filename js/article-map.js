// Maps each from-to pair to the list of available article purposes.
// First entry in the array = default fallback.
const ARTICLE_MAP = {
  // India
  "india-canada":      ["study"],
  "india-australia":   ["immigration", "study"],
  "india-germany":     ["study"],
  "india-singapore":   ["work"],
  "india-uae":         ["work"],
  "india-uk":          ["study"],
  "india-japan":       ["travel"],
  "india-usa":         ["study"],
  "india-thailand":    ["travel"],
  "india-france":      ["study"],
  "india-portugal":    ["immigration"],
  "india-newzealand":  ["study"],
  "india-netherlands": ["work"],
  "india-malaysia":    ["travel"],
  "india-italy":       ["study"],
  "india-spain":       ["study"],
  // Korea
  "korea-canada":      ["work"],
  "korea-australia":   ["work"],
  "korea-germany":     ["work"],
  "korea-singapore":   ["work"],
  "korea-uae":         ["work"],
  "korea-uk":          ["work"],
  "korea-japan":       ["travel"],
  "korea-portugal":    ["immigration"],
  "korea-usa":         ["work"],
  "korea-thailand":    ["travel"],
  "korea-newzealand":  ["work"],
  "korea-france":      ["travel"],
  "korea-netherlands": ["work"],
  "korea-italy":       ["travel"],
  "korea-spain":       ["immigration"],
  "korea-malaysia":    ["travel"],
  // Japan
  "japan-canada":      ["work"],
  "japan-australia":   ["work"],
  "japan-germany":     ["work"],
  "japan-singapore":   ["work"],
  "japan-uae":         ["work"],
  "japan-uk":          ["work"],
  "japan-thailand":    ["travel"],
  "japan-portugal":    ["immigration"],
  "japan-usa":         ["work"],
  "japan-newzealand":  ["work"],
  "japan-france":      ["travel"],
  "japan-netherlands": ["work"],
  "japan-italy":       ["travel"],
  "japan-spain":       ["travel"],
  "japan-malaysia":    ["travel"],
  // Hong Kong
  "hongkong-canada":      ["immigration"],
  "hongkong-australia":   ["immigration"],
  "hongkong-germany":     ["work"],
  "hongkong-singapore":   ["work"],
  "hongkong-uae":         ["work"],
  "hongkong-uk":          ["immigration"],
  "hongkong-japan":       ["travel"],
  "hongkong-portugal":    ["immigration"],
  "hongkong-usa":         ["work"],
  "hongkong-thailand":    ["travel"],
  "hongkong-newzealand":  ["work"],
  "hongkong-france":      ["travel"],
  "hongkong-netherlands": ["work"],
  "hongkong-italy":       ["travel"],
  "hongkong-spain":       ["immigration"],
  "hongkong-malaysia":    ["travel"],
};

function getArticleUrl(fromKey, toKey, currentPurpose) {
  const available = ARTICLE_MAP[`${fromKey}-${toKey}`];
  if (!available) return null;
  const purpose = available.includes(currentPurpose) ? currentPurpose : available[0];
  return `articles/${fromKey}-to-${toKey}-${purpose}-2026.html`;
}
