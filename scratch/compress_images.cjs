const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const dir = 'C:\\EternIA\\public\\caratulas';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

console.log(`Found ${files.length} PNG files. Starting compression to WebP...`);

for (const file of files) {
  const inputPath = path.join(dir, file);
  const outputPath = path.join(dir, file.replace('.png', '.webp'));
  
  // Use ffmpeg to scale down to max 800x800 and convert to webp with qscale
  // -vf scale="min(800,iw):min(800,ih)" 
  // -c:v libwebp -q:v 70
  try {
    execSync(`ffmpeg -i "${inputPath}" -vf "scale=800:800:force_original_aspect_ratio=decrease" -c:v libwebp -quality 75 "${outputPath}" -y`, { stdio: 'ignore' });
    // delete original PNG to save space
    fs.unlinkSync(inputPath);
    console.log(`Converted and deleted: ${file}`);
  } catch (e) {
    console.error(`Error processing ${file}:`, e.message);
  }
}

// Update mockStories.ts
let storiesContent = fs.readFileSync('src/data/mockStories.ts', 'utf8');
storiesContent = storiesContent.replace(/\/caratulas\/(ia_[a-z_]+)\.png/g, '/caratulas/$1.webp');
fs.writeFileSync('src/data/mockStories.ts', storiesContent);

// Bump cache
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/_v8/g, '_v9');
fs.writeFileSync('src/App.tsx', appContent);

console.log('All images compressed and codebase updated.');
