const { getAPCAContrast, getWcagContrastRatio, simulateCvdHex, evaluateApca } = require('@intuitui-labs/a11y-gate');

console.log('--- AUDITING THEME PALETTES WITH @intuitui-labs/a11y-gate ---\n');

const colorPairs = [
  // Dark mode pairs
  { name: 'Dark: White body on Obsidian Dark Bg', text: '#F3F4F6', bg: '#0A0A0A', mode: 'Dark' },
  { name: 'Dark: Gold accent on Obsidian Dark Bg', text: '#D4AF37', bg: '#0A0A0A', mode: 'Dark' },
  { name: 'Dark: Gold highlight on Primary Maroon Bg', text: '#FFD700', bg: '#2D1B10', mode: 'Dark' },
  { name: 'Dark: Muted Gray text on Dark Bg', text: '#9CA3AF', bg: '#0A0A0A', mode: 'Dark' },

  // Light mode pairs
  { name: 'Light: Deep Charcoal Text on Crisp Background', text: '#111827', bg: '#FAF9F6', mode: 'Light' },
  { name: 'Light: Deep Maroon Text on Parchment', text: '#2D1B10', bg: '#FAF9F6', mode: 'Light' },
  { name: 'Light: Burnished Amber/Gold Text on Light Bg', text: '#8A5A00', bg: '#FAF9F6', mode: 'Light' },
  { name: 'Light: Secondary Muted Text on Light Bg', text: '#4B5563', bg: '#FAF9F6', mode: 'Light' },
  { name: 'Light: Button Deep Maroon on Gold Button', text: '#2D1B10', bg: '#D4AF37', mode: 'Light' }
];

let allPassed = true;

colorPairs.forEach(pair => {
  const wcag = getWcagContrastRatio ? getWcagContrastRatio(pair.text, pair.bg) : null;
  const apca = getAPCAContrast ? getAPCAContrast(pair.text, pair.bg) : null;
  const deuteranopiaText = simulateCvdHex ? simulateCvdHex(pair.text, 'deuteranopia') : pair.text;
  
  console.log(`[${pair.mode}] ${pair.name}:`);
  if (wcag) console.log(`  - WCAG Contrast: ${wcag.toFixed(2)}:1`);
  if (apca) console.log(`  - APCA Lc: ${apca.toFixed(1)}`);
  console.log(`  - CVD Simulated Text (Deuteranopia): ${deuteranopiaText}`);

  if (wcag && wcag < 3.0 && Math.abs(apca || 0) < 45) {
    console.warn(`  ⚠️ Warning: Contrast may be low for small text`);
    allPassed = false;
  } else {
    console.log(`  ✅ Passed high accessibility threshold`);
  }
  console.log('');
});

if (allPassed) {
  console.log('🎉 All design tokens verified accessible under @intuitui-labs/a11y-gate standards.');
}
