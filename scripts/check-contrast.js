const fs = require('fs');
const css = fs.readFileSync('src/index.css','utf8');
const varRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
const vars = {};
let m;
while ((m = varRegex.exec(css)) !== null) {
  vars[m[1]] = m[2].trim();
}
function parseColor(s) {
  s = s.trim();
  if (s.startsWith('#')) {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
    const r = parseInt(hex.slice(0,2),16);
    const g = parseInt(hex.slice(2,4),16);
    const b = parseInt(hex.slice(4,6),16);
    return {r,g,b, a:1};
  }
  const rgba = s.match(/rgba?\(([^)]+)\)/);
  if (rgba) {
    const parts = rgba[1].split(',').map(p=>p.trim()).map(Number);
    return {r:parts[0], g:parts[1], b:parts[2], a: parts[3]===undefined?1:parts[3]};
  }
  return null;
}
function lum(c) {
  const srgb = [c.r/255, c.g/255, c.b/255].map(v => {
    return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  });
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}
function contrast(c1,c2) {
  const L1 = lum(c1);
  const L2 = lum(c2);
  const hi = Math.max(L1,L2);
  const lo = Math.min(L1,L2);
  return (hi+0.05)/(lo+0.05);
}
function report(name1,name2) {
  const v1 = vars[name1];
  const v2 = vars[name2];
  if (!v1 || !v2) { console.log(`Missing variable ${name1} or ${name2}`); return; }
  const c1 = parseColor(v1);
  const c2 = parseColor(v2);
  if (!c1||!c2) { console.log(`Unable to parse ${name1} or ${name2}`); return; }
  const ratio = contrast(c1,c2);
  const aa = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  console.log(`${name1} vs ${name2}: ratio=${ratio.toFixed(2)} — AA=${aa} (large=${aaLarge})`);
}
console.log('Detected CSS variables:', Object.keys(vars).join(', '));
report('text','cp-bg');
report('text','surface');
report('neon-pink','cp-bg');
report('neon-blue','cp-bg');
report('neon-purple','cp-bg');
process.exit(0);
