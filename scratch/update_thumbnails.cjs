const fs = require('fs');
let text = fs.readFileSync('src/data/mockStories.ts', 'utf8');

const urls = {
  acustico: 'https://loremflickr.com/800/600/wedding,acoustic,guitar',
  baile_boda: 'https://loremflickr.com/800/600/wedding,dance,party',
  balada_pop_hombre: 'https://loremflickr.com/800/600/singer,microphone,man',
  balada_pop_mujer: 'https://loremflickr.com/800/600/singer,microphone,woman',
  balada_ranchera: 'https://loremflickr.com/800/600/mariachi,mexico,guitar',
  banda: 'https://loremflickr.com/800/600/band,brass,fiesta',
  blues: 'https://loremflickr.com/800/600/blues,guitar,smoke',
  cumbia: 'https://loremflickr.com/800/600/cumbia,dance,party',
  cumpleanos: 'https://loremflickr.com/800/600/birthday,cake,celebration',
  funeral: 'https://loremflickr.com/800/600/peaceful,sky,clouds',
  heavy_metal: 'https://loremflickr.com/800/600/heavy,metal,concert',
  iglesia: 'https://loremflickr.com/800/600/church,choir,light',
  infantil: 'https://loremflickr.com/800/600/children,happy,playful',
  jazz: 'https://loremflickr.com/800/600/jazz,saxophone,stage',
  regueton: 'https://loremflickr.com/800/600/reggaeton,urban,party',
  tango: 'https://loremflickr.com/800/600/tango,dance,couple',
  opera: 'https://loremflickr.com/800/600/opera,singer,stage'
};

for (const [key, url] of Object.entries(urls)) {
  const regex = new RegExp(`id: 'cancion-${key}',[\\s\\S]*?thumbnailUrl: '.*?'`);
  text = text.replace(regex, match => match.replace(/thumbnailUrl: '.*?'/, `thumbnailUrl: '${url}'`));
}

fs.writeFileSync('src/data/mockStories.ts', text);
