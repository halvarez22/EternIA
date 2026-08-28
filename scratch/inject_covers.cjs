const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\EternIA\\Música IA\\Caratulas';
const destDir = 'C:\\EternIA\\public\\caratulas';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Function to safely create url-friendly names
function toUrlSafe(str) {
  return str.toLowerCase()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_\.]/g, '');
}

const files = fs.readdirSync(srcDir);
const mapping = {}; // Maps the logical key to the URL path

for (const file of files) {
  if (file.endsWith('.png')) {
    const safeName = toUrlSafe(file);
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, safeName));
    
    // Create a key based on the name without "ia_" and extension
    let key = safeName.replace('ia_', '').replace('.png', '');
    mapping[key] = `/caratulas/${safeName}`;
  }
}

// Now update mockStories.ts
let storiesContent = fs.readFileSync('src/data/mockStories.ts', 'utf8');

// The stories are mostly named similarly in their titles or ids.
// Let's do replacements manually for safety and exact matching based on the known keys.
const replacements = [
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/wedding,acoustic,guitar',/g, replace: `thumbnailUrl: '${mapping['acustico']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/wedding,dance,party',/g, replace: `thumbnailUrl: '${mapping['baile_boda']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/singer,microphone,man',/g, replace: `thumbnailUrl: '${mapping['balada_pop_hombre']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/singer,microphone,woman',/g, replace: `thumbnailUrl: '${mapping['balada_pop_mujer']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/mariachi,mexico,guitar',/g, replace: `thumbnailUrl: '${mapping['balada_ranchera']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/band,brass,fiesta',/g, replace: `thumbnailUrl: '${mapping['banda']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/blues,guitar,smoke',/g, replace: `thumbnailUrl: '${mapping['blues']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/cumbia,dance,party',/g, replace: `thumbnailUrl: '${mapping['cumbia']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/birthday,cake,party',/g, replace: `thumbnailUrl: '${mapping['cumpleanos']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/funeral,flowers,memorial',/g, replace: `thumbnailUrl: '${mapping['funeral']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/heavymetal,guitar,concert',/g, replace: `thumbnailUrl: '${mapping['heavy_metal']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/church,choir,gospel',/g, replace: `thumbnailUrl: '${mapping['iglesia']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/kids,party,fun',/g, replace: `thumbnailUrl: '${mapping['infantil']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/jazz,saxophone,club',/g, replace: `thumbnailUrl: '${mapping['jazz']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/opera,singer,stage',/g, replace: `thumbnailUrl: '${mapping['opera']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/reggaeton,party,club',/g, replace: `thumbnailUrl: '${mapping['regueton']}',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/tango,dance,couple',/g, replace: `thumbnailUrl: '${mapping['tango']}',` }
];

let replacedCount = 0;
for (const r of replacements) {
  if (storiesContent.match(r.search)) {
    storiesContent = storiesContent.replace(r.search, r.replace);
    replacedCount++;
  } else {
    console.warn('Could not find match for:', r.search);
  }
}

fs.writeFileSync('src/data/mockStories.ts', storiesContent);

// Bump localStorage version from _v7 to _v8
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/_v7/g, '_v8');
fs.writeFileSync('src/App.tsx', appContent);

console.log('Success');
