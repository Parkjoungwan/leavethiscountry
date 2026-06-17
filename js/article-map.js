// Valid FROM→TO pairs. URL pattern: articles/${from}-to-${to}-2026.html#${purpose}
const VALID_PAIRS = new Set([
  "india-canada","india-australia","india-germany","india-singapore",
  "india-uae","india-uk","india-japan","india-usa","india-thailand",
  "india-france","india-portugal","india-newzealand","india-netherlands",
  "india-malaysia","india-italy","india-spain",
  "korea-canada","korea-australia","korea-germany","korea-singapore",
  "korea-uae","korea-uk","korea-japan","korea-portugal","korea-usa",
  "korea-thailand","korea-newzealand","korea-france","korea-netherlands",
  "korea-italy","korea-spain","korea-malaysia",
  "japan-canada","japan-australia","japan-germany","japan-singapore",
  "japan-uae","japan-uk","japan-thailand","japan-portugal","japan-usa",
  "japan-newzealand","japan-france","japan-netherlands","japan-italy",
  "japan-spain","japan-malaysia",
  "hongkong-canada","hongkong-australia","hongkong-germany","hongkong-singapore",
  "hongkong-uae","hongkong-uk","hongkong-japan","hongkong-portugal",
  "hongkong-usa","hongkong-thailand","hongkong-newzealand","hongkong-france",
  "hongkong-netherlands","hongkong-italy","hongkong-spain","hongkong-malaysia",
  "usa-canada","usa-australia","usa-germany","usa-singapore",
  "usa-uae","usa-uk","usa-japan","usa-portugal","usa-thailand",
  "usa-newzealand","usa-france","usa-netherlands","usa-italy","usa-spain","usa-malaysia",
  "france-canada","france-australia","france-germany","france-singapore",
  "france-uae","france-uk","france-japan","france-portugal","france-thailand",
  "france-newzealand","france-netherlands","france-italy","france-spain","france-malaysia","france-usa",
  "tunisia-canada","tunisia-australia","tunisia-germany","tunisia-singapore",
  "tunisia-uae","tunisia-uk","tunisia-japan","tunisia-portugal","tunisia-thailand",
  "tunisia-newzealand","tunisia-france","tunisia-netherlands","tunisia-italy",
  "tunisia-spain","tunisia-malaysia","tunisia-usa",
]);

function getArticleUrl(fromKey, toKey, currentPurpose) {
  if (!VALID_PAIRS.has(`${fromKey}-${toKey}`)) return null;
  return `articles/${fromKey}-to-${toKey}-2026.html#${currentPurpose}`;
}
