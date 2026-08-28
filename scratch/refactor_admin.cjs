const fs = require('fs');

const path = 'src/components/AdminVideoStudioModal.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace("useState<ServiceType>('video_musicalizado')", "useState<ServiceType>('cancion')");
content = content.replace("useState<'all' | 'cancion' | 'video' | 'video_musicalizado'>('all')", "useState<'all' | 'cancion' | 'video'>('all')");
content = content.replace("video_musicalizado: 'Video Musicalizado a la Medida'", "");

const btnFilter = `<button
                          onClick={() => setManageFilter('video_musicalizado')}
                          className={\`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider \${
                            manageFilter === 'video_musicalizado' ? 'bg-amber-400 text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
                          }\`}
                        >
                          ✨ Videos Musicalizados ({stories.filter(s => s.serviceType === 'video_musicalizado').length})
                        </button>`;
content = content.replace(btnFilter, "");


const btnUpload = `<button
                        type="button"
                        onClick={() => {
                          setServiceType('video_musicalizado');
                          setSoundtrackStyle('Balada Orquestal con Piano y Cuerdas');
                        }}
                        className={\`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between \${
                          serviceType === 'video_musicalizado'
                            ? 'bg-gradient-to-r from-amber-400/20 to-pink-500/20 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                            : 'glass border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-white/40'
                        }\`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span className="text-[9px] font-mono uppercase tracking-wider opacity-70">Pilar 03 ★</span>
                        </div>
                        <p className="text-xs font-bold text-[var(--text-primary)]">Video Musicalizado</p>
                        <p className="text-[10px] text-[var(--text-secondary)] mt-1">Obra dual completa: Canción + Video sincronizados</p>
                      </button>`;
content = content.replace(btnUpload, "");


fs.writeFileSync(path, content);
console.log("Admin modal precise refactor complete.");
