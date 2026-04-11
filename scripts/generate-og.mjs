import sharp from 'sharp';
import { statSync } from 'fs';

const WIDTH = 1200;
const HEIGHT = 630;

// Exact site hero gradient colours from global.css lines 479-483
const GRADIENT_START = '#071729';   // rgba(7, 23, 41)
const GRADIENT_END = '#0C0C21';     // rgba(12, 12, 33)
const ACCENT_RED = '#BD1C1C';       // rgba(189, 28, 28)
const ACCENT_BLUE = '#07172A';      // rgba(7, 23, 42)

const svg = `<svg width="${WIDTH}" height="${HEIGHT}"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${GRADIENT_START}"/>
      <stop offset="50%" style="stop-color:${GRADIENT_END}"/>
      <stop offset="100%" style="stop-color:#000000"/>
    </linearGradient>
    <radialGradient id="glowRed" cx="30%" cy="30%" r="50%">
      <stop offset="0%" style="stop-color:${ACCENT_RED};stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:${ACCENT_RED};stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="glowBlue" cx="80%" cy="60%" r="40%">
      <stop offset="0%" style="stop-color:${ACCENT_BLUE};stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:${ACCENT_BLUE};stop-opacity:0"/>
    </radialGradient>
  </defs>

  <!-- Background matching site hero -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Glow effects matching site gradient layers -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowRed)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowBlue)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="3" fill="${ACCENT_RED}" opacity="0.6"/>

  <!-- Left accent bar -->
  <rect x="80" y="80" width="4" height="180" fill="${ACCENT_RED}" rx="2" opacity="0.8"/>

  <!-- Company label -->
  <text x="110" y="155"
    font-family="Arial, sans-serif"
    font-size="14"
    font-weight="400"
    fill="#9ca3af"
    letter-spacing="6">
    PIXELETTE TECHNOLOGIES
  </text>

  <!-- Main headline -->
  <text x="110" y="260"
    font-family="Arial, sans-serif"
    font-size="56"
    font-weight="700"
    fill="#ffffff">
    Enterprise AI &amp;
  </text>
  <text x="110" y="335"
    font-family="Arial, sans-serif"
    font-size="56"
    font-weight="700"
    fill="#ffffff">
    Blockchain Development
  </text>

  <!-- Subline -->
  <text x="110" y="400"
    font-family="Arial, sans-serif"
    font-size="20"
    font-weight="400"
    fill="#9ca3af">
    APPG AI Secretariat · ISO 9001 · ISO 27001 · Cyber Essentials Plus
  </text>

  <!-- Divider -->
  <rect x="0" y="490" width="${WIDTH}" height="1" fill="#ffffff" opacity="0.08"/>

  <!-- Bottom strip -->
  <rect x="0" y="491" width="${WIDTH}" height="139" fill="#000000" opacity="0.4"/>

  <!-- Trust labels -->
  <text x="110" y="548"
    font-family="Arial, sans-serif"
    font-size="11"
    font-weight="600"
    fill="#ffffff"
    letter-spacing="2">
    APPG AI SECRETARIAT
  </text>
  <text x="110" y="568"
    font-family="Arial, sans-serif"
    font-size="12"
    fill="#9ca3af">
    Official Secretariat · UK Parliament
  </text>

  <text x="380" y="548"
    font-family="Arial, sans-serif"
    font-size="11"
    font-weight="600"
    fill="#ffffff"
    letter-spacing="2">
    ISO CERTIFIED
  </text>
  <text x="380" y="568"
    font-family="Arial, sans-serif"
    font-size="12"
    fill="#9ca3af">
    ISO 9001 · ISO 27001
  </text>

  <text x="620" y="548"
    font-family="Arial, sans-serif"
    font-size="11"
    font-weight="600"
    fill="#ffffff"
    letter-spacing="2">
    CLUTCH VERIFIED
  </text>
  <text x="620" y="568"
    font-family="Arial, sans-serif"
    font-size="12"
    fill="#9ca3af">
    4.8 Rating · 23+ Reviews
  </text>

  <text x="860" y="548"
    font-family="Arial, sans-serif"
    font-size="11"
    font-weight="600"
    fill="#ffffff"
    letter-spacing="2">
    CYBER ESSENTIALS
  </text>
  <text x="860" y="568"
    font-family="Arial, sans-serif"
    font-size="12"
    fill="#9ca3af">
    Plus Certified
  </text>

  <!-- Domain -->
  <text x="110" y="615"
    font-family="Arial, sans-serif"
    font-size="13"
    fill="#4b5563">
    pixelettetech.com
  </text>

  <!-- Decorative glow circles -->
  <circle cx="1100" cy="300" r="200" fill="${ACCENT_RED}" opacity="0.04"/>
  <circle cx="1100" cy="300" r="100" fill="${ACCENT_RED}" opacity="0.03"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ quality: 90, compressionLevel: 9 })
  .toFile('public/og/homepage.png');

const stats = statSync('public/og/homepage.png');
const sizeKB = Math.round(stats.size / 1024);
console.log('OG image generated: public/og/homepage.png');
console.log(`Size: ${sizeKB}KB ${sizeKB < 300 ? '✓ under 300KB' : '✗ exceeds budget'}`);
console.log(`Gradient: ${GRADIENT_START} → ${GRADIENT_END} → #000000`);
console.log(`Accent: ${ACCENT_RED} (red glow), ${ACCENT_BLUE} (blue glow)`);
