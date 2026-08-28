const fs = require('fs');
const path = 'src/components/VideoShowcaseGallery.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Todas las Ocasiones button
content = content.replace(
  /className=\{`touch-target px-4 py-2 rounded-full text-\[10px\] uppercase tracking-\[0\.2em\] font-semibold whitespace-nowrap transition-all cursor-pointer \$\{/g,
  "className={`touch-target shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all cursor-pointer ${"
);

// 2. filter-cat-subidos button
content = content.replace(
  /className=\{`touch-target px-3\.5 sm:px-4 py-2 rounded-full text-\[10px\] uppercase tracking-\[0\.2em\] font-semibold whitespace-nowrap transition-all flex items-center gap-1\.5 cursor-pointer \$\{/g,
  "className={`touch-target shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${"
);

// 3. Service buttons (Todas las Obras, Canciones, Videos)
content = content.replace(
  /className=\{`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer \$\{/g,
  "className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${"
);
content = content.replace(
  /className=\{`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1\.5 \$\{/g,
  "className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${"
);

fs.writeFileSync(path, content);
console.log('Fixed squishing filters.');
