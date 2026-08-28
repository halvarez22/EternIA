const fs = require('fs');
const path = 'src/components/VideoShowcaseGallery.tsx';
let content = fs.readFileSync(path, 'utf8');

const target = `<div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
            Filtrar por Servicio:
          </span>
          </div>`;

const newSegmentedControl = `
        {/* Primary Service Filter Selector - Segmented Control */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] shrink-0 pl-1">
            Formato de Obra:
          </span>
          
          <div 
            role="group" 
            aria-label="Filtrar por servicio"
            className="relative flex p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5 overflow-x-auto scrollbar-none w-full sm:w-auto"
          >
            {/* Indicador animado */}
            <div 
              className="absolute h-[calc(100%-12px)] top-1.5 rounded-full bg-white/90 shadow-lg transition-all duration-300 ease-out z-0 pointer-events-none"
              style={{
                left: selectedServiceType === 'all' ? '6px' : 
                      selectedServiceType === 'cancion' ? 'calc(33.33% + 6px)' : 
                      'calc(66.66% + 6px)',
                width: 'calc(33.33% - 12px)'
              }}
            />
            
            <button
              role="radio"
              aria-checked={selectedServiceType === 'all'}
              onClick={() => setSelectedServiceType('all')}
              className={\`relative z-10 flex-1 min-w-[110px] sm:min-w-[130px] flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 shrink-0 \${
                selectedServiceType === 'all' 
                  ? 'text-black' 
                  : 'text-white/50 hover:text-white/80'
              }\`}
            >
              🌟 Todas ({stories.length})
            </button>
            
            <button
              role="radio"
              aria-checked={selectedServiceType === 'cancion'}
              onClick={() => setSelectedServiceType('cancion')}
              className={\`relative z-10 flex-1 min-w-[110px] sm:min-w-[130px] flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 shrink-0 \${
                selectedServiceType === 'cancion' 
                  ? 'text-black' 
                  : 'text-white/50 hover:text-white/80'
              }\`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Canciones ({stories.filter(s => s.serviceType === 'cancion').length})</span>
            </button>
            
            <button
              role="radio"
              aria-checked={selectedServiceType === 'video'}
              onClick={() => setSelectedServiceType('video')}
              className={\`relative z-10 flex-1 min-w-[110px] sm:min-w-[130px] flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 shrink-0 \${
                selectedServiceType === 'video' 
                  ? 'text-black' 
                  : 'text-white/50 hover:text-white/80'
              }\`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos ({stories.filter(s => s.serviceType === 'video').length})</span>
            </button>
          </div>
        </div>`;

content = content.replace(target, newSegmentedControl);
fs.writeFileSync(path, content);
console.log('Segmented control injected.');
