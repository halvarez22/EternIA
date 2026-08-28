const fs = require('fs');

function replaceInFile(path, replacements) {
  let content = fs.readFileSync(path, 'utf8');
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }
  fs.writeFileSync(path, content);
}

// 1. types.ts
replaceInFile('src/types.ts', [
  { from: /'cancion' \| 'video' \| 'video_musicalizado'/g, to: "'cancion' | 'video'" }
]);

// 2. data/mockStories.ts
replaceInFile('src/data/mockStories.ts', [
  { from: /id: 'video-musicalizado-medida',/g, to: "id: 'video-medida'," },
  { from: /name: 'Video Musicalizado',/g, to: "name: 'Video a la Medida'," }
]);

// 3. components/VideoShowcaseGallery.tsx
replaceInFile('src/components/VideoShowcaseGallery.tsx', [
  { from: /case 'video_musicalizado':[\s\S]*?bg-gradient-to-r.*?' \};\s*/g, to: "" },
  { from: /<button[\s\S]*?setSelectedServiceType\('video_musicalizado'\)[\s\S]*?<\/button>\s*/g, to: "" }
]);

// 4. components/AdminVideoStudioModal.tsx
replaceInFile('src/components/AdminVideoStudioModal.tsx', [
  { from: /useState<ServiceType>\('video_musicalizado'\)/g, to: "useState<ServiceType>('cancion')" },
  { from: /useState<'all' \| 'cancion' \| 'video' \| 'video_musicalizado'>\('all'\)/g, to: "useState<'all' | 'cancion' | 'video'>('all')" },
  { from: /video_musicalizado: 'Video Musicalizado a la Medida'\s*/g, to: "" },
  { from: /<button[\s\S]*?setManageFilter\('video_musicalizado'\)[\s\S]*?<\/button>\s*/g, to: "" },
  { from: /<button[\s\S]*?setServiceType\('video_musicalizado'\)[\s\S]*?<\/button>\s*/g, to: "" }
]);

// 5. components/VideoPlayerModal.tsx
replaceInFile('src/components/VideoPlayerModal.tsx', [
  { from: /video_musicalizado: { label: '✨ Video Musicalizado', bg: 'bg-gradient-to-r from-amber-400\/20 to-pink-500\/20 text-amber-200 border-amber-400\/30' }\s*/g, to: "" },
  { from: /currentBadge = serviceBadgeConfig\[story\.serviceType \|\| 'video_musicalizado'\]/g, to: "currentBadge = serviceBadgeConfig[story.serviceType || 'cancion']" }
]);

// 6. components/ServicesShowcaseSection.tsx
replaceInFile('src/components/ServicesShowcaseSection.tsx', [
  { from: /onSelectServiceTab: \(serviceType: 'cancion' \| 'video' \| 'video_musicalizado'\) => void/g, to: "onSelectServiceTab: (serviceType: 'cancion' | 'video') => void" },
  { from: /id: 'video_musicalizado' as const/g, to: "id: 'video' as const" }
]);

// 7. components/VideoUploaderModal.tsx
replaceInFile('src/components/VideoUploaderModal.tsx', [
  { from: /serviceType: 'video_musicalizado'/g, to: "serviceType: 'video'" }
]);

console.log('All replacements complete.');
