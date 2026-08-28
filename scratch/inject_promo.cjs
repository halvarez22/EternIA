const fs = require('fs');

const promoStory = `export const INITIAL_FINISHED_STORIES: FinishedStory[] = [
  {
    id: 'promo-principal',
    title: '¿Por qué siempre regalar lo mismo?',
    serviceType: 'video',
    category: 'bodas',
    categoryLabel: 'EternIA Promo 🎬',
    categoryIcon: '🎬',
    mediaUrl: '/video_promo_1.mp4',
    thumbnailUrl: '/video_promo_1_thumbnail.jpg',
    duration: '01:00',
    protagonists: 'EternIA Studio',
    clientQuote: '"Eternizamos tus momentos más valiosos con obras cinematográficas inolvidables."',
    synopsis: 'Descubre por qué una obra musical y cinematográfica a la medida es el regalo perfecto que trasciende el tiempo.',
    soundtrackStyle: 'Cinematográfico',
    emotionalTone: 'Inspirador',
    lyricsSnippet: 'Tu historia merece ser contada...',
    isUserUploaded: false,
    createdAt: new Date().toISOString(),
  },`;

let content = fs.readFileSync('src/data/mockStories.ts', 'utf8');
content = content.replace(/export const INITIAL_FINISHED_STORIES: FinishedStory\[\] = \[/, promoStory);
fs.writeFileSync('src/data/mockStories.ts', content);

console.log('Promo video injected into mockStories.ts');
