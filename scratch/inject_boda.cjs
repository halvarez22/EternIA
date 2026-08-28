const fs = require('fs');

const weddingVideoStory = `  {
    id: 'video-boda-01',
    title: 'El Sí Quiero: Recuerdo Inolvidable',
    serviceType: 'video',
    category: 'bodas',
    categoryLabel: 'Bodas 💍',
    categoryIcon: '💍',
    mediaUrl: '/video_boda.mp4',
    thumbnailUrl: '/video_boda_thumbnail.jpg',
    duration: '01:22',
    protagonists: 'EternIA Studio',
    clientQuote: '"Una obra maestra que capturó cada lágrima y cada sonrisa de nuestro gran día."',
    synopsis: 'Montaje cinematográfico de boda a la medida, inmortalizando los momentos más hermosos del evento.',
    soundtrackStyle: 'Balada Orquestal',
    emotionalTone: 'Romántico y Solemne',
    lyricsSnippet: 'En cada paso que dimos juntos...',
    isUserUploaded: false,
    createdAt: new Date().toISOString(),
  },
`;

let content = fs.readFileSync('src/data/mockStories.ts', 'utf8');

// Insert the wedding video right after INITIAL_FINISHED_STORIES array opens, or after the promo video.
// Let's replace the first element with the first element + the wedding video.
content = content.replace(
  /(export const INITIAL_FINISHED_STORIES: FinishedStory\[\] = \[\s*\{[\s\S]*?\},)/,
  `$1\n${weddingVideoStory}`
);

fs.writeFileSync('src/data/mockStories.ts', content);

// Bump localStorage version in App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/_v6/g, '_v7');
fs.writeFileSync('src/App.tsx', appContent);

console.log('Wedding video injected and cache bumped to _v7.');
