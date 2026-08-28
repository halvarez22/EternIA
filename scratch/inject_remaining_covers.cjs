const fs = require('fs');

let storiesContent = fs.readFileSync('src/data/mockStories.ts', 'utf8');

const replacements = [
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/birthday,cake,celebration',/g, replace: `thumbnailUrl: '/caratulas/ia_cumpleanos.png',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/peaceful,sky,clouds',/g, replace: `thumbnailUrl: '/caratulas/ia_funeral.png',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/heavy,metal,concert',/g, replace: `thumbnailUrl: '/caratulas/ia_heavy_metal.png',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/church,choir,light',/g, replace: `thumbnailUrl: '/caratulas/ia_iglesia.png',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/children,happy,playful',/g, replace: `thumbnailUrl: '/caratulas/ia_infantil.png',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/jazz,saxophone,stage',/g, replace: `thumbnailUrl: '/caratulas/ia_jazz.png',` },
  { search: /thumbnailUrl: 'https:\/\/loremflickr\.com\/800\/600\/reggaeton,urban,party',/g, replace: `thumbnailUrl: '/caratulas/ia_regueton.png',` }
];

for (const r of replacements) {
  storiesContent = storiesContent.replace(r.search, r.replace);
}

fs.writeFileSync('src/data/mockStories.ts', storiesContent);
console.log('Finished replacing remaining thumbnails.');
