const fs = require('fs');
let content = fs.readFileSync('src/components/VideoShowcaseGallery.tsx', 'utf8');

content = content.replace(/case 'video_musicalizado':[\s\S]*?default:/, "default:");

fs.writeFileSync('src/components/VideoShowcaseGallery.tsx', content);
