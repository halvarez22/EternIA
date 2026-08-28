const fs = require('fs');
const path = 'src/components/VideoShowcaseGallery.tsx';
let content = fs.readFileSync(path, 'utf8');

const target = `<span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
            Filtrar por Servicio:
          </span>`;

const replacement = `<span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
            Filtrar por Servicio:
          </span>
          <button
            onClick={() => setSelectedServiceType('all')}
            className={\`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer \${
              selectedServiceType === 'all'
                ? 'bg-white text-black font-bold shadow-md'
                : 'glass text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)]'
            }\`}
          >
            🌟 Todas las Obras ({stories.length})
          </button>
          <button
            onClick={() => setSelectedServiceType('cancion')}
            className={\`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 \${
              selectedServiceType === 'cancion'
                ? 'bg-amber-400 text-black font-bold shadow-md'
                : 'glass text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)]'
            }\`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Canciones a la Medida ({stories.filter(s => s.serviceType === 'cancion').length})</span>
          </button>
          <button
            onClick={() => setSelectedServiceType('video')}
            className={\`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 \${
              selectedServiceType === 'video'
                ? 'bg-cyan-400 text-black font-bold shadow-md'
                : 'glass text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)]'
            }\`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Videos a la Medida ({stories.filter(s => s.serviceType === 'video').length})</span>
          </button>`;

content = content.replace(target, replacement);
fs.writeFileSync(path, content);
console.log('Gallery restored.');
