const { evaluateWcag3, getAPCAContrast, getWcagContrastRatio, simulateCvdHex } = require('@intuitui-labs/a11y-gate');

console.log('================================================================');
console.log('   BFSU DESIGN SYSTEM - WCAG 3 / APCA ACCESSIBILITY GATE');
console.log('   Auditing with @intuitui-labs/a11y-gate candidate engine');
console.log('================================================================\n');

// Active BFSU Design Tokens from src/index.css
const tokenPairs = [
  // ── Dark Mode Tokens ──────────────────────────────────────────
  { name: 'Dark Primary Text on Page Canvas', text: '#F1F5F9', bg: '#0C1017', role: 'headline', mode: 'Dark' },
  { name: 'Dark Primary Text on Card Surface', text: '#F1F5F9', bg: '#131923', role: 'headline', mode: 'Dark' },
  { name: 'Dark Secondary Body Text on Page Canvas', text: '#CBD5E1', bg: '#0C1017', role: 'body', mode: 'Dark' },
  { name: 'Dark Secondary Body Text on Card Surface', text: '#CBD5E1', bg: '#131923', role: 'body', mode: 'Dark' },
  { name: 'Dark Muted Meta Text on Page Canvas', text: '#A4B2C4', bg: '#0C1017', role: 'sub_fluent', mode: 'Dark' },
  { name: 'Dark Muted Meta Text on Card Surface', text: '#A4B2C4', bg: '#131923', role: 'sub_fluent', mode: 'Dark' },
  { name: 'Dark Radiant Gold Accent on Page Canvas', text: '#D4AF37', bg: '#0C1017', role: 'control', mode: 'Dark' },
  { name: 'Dark Radiant Gold Accent on Card Surface', text: '#D4AF37', bg: '#131923', role: 'control', mode: 'Dark' },
  { name: 'Dark Button Ink Text on Gold Pill', text: '#0C1017', bg: '#D4AF37', role: 'control', mode: 'Dark' },

  // ── Light Mode Tokens ─────────────────────────────────────────
  { name: 'Light Primary Ink Text on Ivory Canvas', text: '#12161F', bg: '#FBFBFA', role: 'headline', mode: 'Light' },
  { name: 'Light Primary Ink Text on White Surface', text: '#12161F', bg: '#FFFFFF', role: 'headline', mode: 'Light' },
  { name: 'Light Secondary Body Text on Ivory Canvas', text: '#374151', bg: '#FBFBFA', role: 'body', mode: 'Light' },
  { name: 'Light Secondary Body Text on White Surface', text: '#374151', bg: '#FFFFFF', role: 'body', mode: 'Light' },
  { name: 'Light Muted Meta Text on Ivory Canvas', text: '#566072', bg: '#FBFBFA', role: 'sub_fluent', mode: 'Light' },
  { name: 'Light Muted Meta Text on White Surface', text: '#566072', bg: '#FFFFFF', role: 'sub_fluent', mode: 'Light' },
  { name: 'Light Button Ink Text on Gold Pill', text: '#12161F', bg: '#D4AF37', role: 'control', mode: 'Light' },
  { name: 'Light Amber Gold Overline Text on Ivory Canvas', text: '#8E6F18', bg: '#FBFBFA', role: 'control', mode: 'Light' },
];

let allPassed = true;
let summary = { Gold: 0, Silver: 0, Bronze: 0, Component: 0, Fail: 0 };

tokenPairs.forEach(pair => {
  const wcag2 = getWcagContrastRatio ? getWcagContrastRatio(pair.text, pair.bg) : null;
  const wcag3 = evaluateWcag3 ? evaluateWcag3(pair.text, pair.bg) : null;
  const deuteranopia = simulateCvdHex ? simulateCvdHex(pair.text, 'deuteranopia') : pair.text;

  const level = wcag3 ? wcag3.level : 'Unknown';
  summary[level] = (summary[level] || 0) + 1;

  const passesTargetRole = wcag3 ? wcag3.passesRole[pair.role] : true;
  const statusIcon = passesTargetRole && level !== 'Fail' ? '✅' : '⚠️';

  console.log(`[${pair.mode}] ${pair.name}:`);
  console.log(`  ${statusIcon} WCAG 3 Level: ${level} | APCA Lc: ${wcag3 ? wcag3.absScore.toFixed(1) : 'N/A'} (Polarity: ${wcag3 ? wcag3.polarity : 'N/A'})`);
  if (wcag2) console.log(`     Legacy WCAG 2.1 Ratio: ${wcag2.toFixed(2)}:1`);
  console.log(`     Target Role: ${pair.role} (Passes: ${passesTargetRole ? 'YES' : 'NO'})`);
  console.log(`     CVD Deuteranopia Simulation: ${deuteranopia}`);

  if (!passesTargetRole || level === 'Fail') {
    console.warn(`  ⚠️ Warning: Does not meet minimum WCAG 3 / APCA threshold for ${pair.role}`);
    allPassed = false;
  }
  console.log('');
});

console.log('----------------------------------------------------------------');
console.log('WCAG 3 CONFORMANCE SUMMARY:');
console.log(`  🌟 Gold Tier (Lc >= 90):       ${summary.Gold || 0}`);
console.log(`  🥈 Silver Tier (Lc >= 75):     ${summary.Silver || 0}`);
console.log(`  🥉 Bronze Tier (Lc >= 60):     ${summary.Bronze || 0}`);
console.log(`  🔧 Component Tier (Lc >= 45):  ${summary.Component || 0}`);
console.log(`  ❌ Fail:                       ${summary.Fail || 0}`);
console.log('----------------------------------------------------------------\n');

if (allPassed && summary.Fail === 0) {
  console.log('🎉 ALL ACTIVE TOKENS PASS WCAG 3 / APCA CONFORMANCE GATE VIA @intuitui-labs/a11y-gate!');
} else {
  console.warn('⚠️ Some tokens require refinement to pass WCAG 3 standards.');
  process.exit(1);
}

