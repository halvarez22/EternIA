import React, { useState, useMemo } from 'react';
import { FinishedStory, EterniaCategory, ServiceType } from '../types';
import { Play, Film, Sparkles, UploadCloud, Search, Eye, Heart, Music, Tag, Filter, CheckCircle, Disc, Layers } from 'lucide-react';
import { ETERNIA_CATEGORIES } from '../data/mockStories';

interface VideoShowcaseGalleryProps {
  stories: FinishedStory[];
  onSelectStory: (story: FinishedStory) => void;
  onOpenUploadModal: () => void;
  activeCategoryFilter: string;
  onCategoryFilterChange: (cat: string) => void;
}

export const VideoShowcaseGallery: React.FC<VideoShowcaseGalleryProps> = ({
  stories,
  onSelectStory,
  onOpenUploadModal,
  activeCategoryFilter,
  onCategoryFilterChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState<'all' | ServiceType>('all');

  // Filter stories based on category, service type, and search text
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchCategory =
        activeCategoryFilter === 'todas' ||
        story.category === activeCategoryFilter ||
        (activeCategoryFilter === 'subidos' && story.isUserUploaded);

      const matchService =
        selectedServiceType === 'all' ||
        story.serviceType === selectedServiceType;

      const matchSearch =
        !searchQuery.trim() ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.protagonists.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.soundtrackStyle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchService && matchSearch;
    });
  }, [stories, activeCategoryFilter, selectedServiceType, searchQuery]);

  const userUploadedCount = stories.filter((s) => s.isUserUploaded).length;

  const getServiceBadge = (type?: ServiceType) => {
    switch (type) {
      case 'cancion':
        return {
          label: 'Canción a la Medida',
          icon: <Music className="w-3 h-3 text-amber-300" />,
          classes: 'bg-amber-400/20 text-amber-300 border-amber-400/40'
        };
      case 'video':
        return {
          label: 'Video a la Medida',
          icon: <Film className="w-3 h-3 text-cyan-300" />,
          classes: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
        };
      default:
        return {
          label: 'Canción a la Medida',
          icon: <Music className="w-3 h-3 text-amber-400" />,
          classes: 'bg-amber-400/20 text-amber-400 border-amber-400/40'
        };
    }
  };

  return (
    <section
      id="videos"
      className="min-h-screen flex flex-col justify-center py-12 relative bg-transparent overflow-hidden"
    >
      {/* Glow aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium glass text-[var(--text-primary)] opacity-80 mb-3 sm:mb-4 border border-[var(--glass-border)]">
              <Film className="w-3 h-3 text-amber-400" />
              <span>GALERÍA DE OBRAS TERMINADAS</span>
            </div>
            <h2 className="serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-normal text-[var(--text-primary)] gradient-text">
              Canciones, Videos y Obras Musicalizadas a la Medida
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl font-light leading-relaxed">
              Explora nuestra colección de obras maestras: desde canciones con letras y melodías 100% exclusivas, hasta videos cinematográficos y fusiones duales orquestadas para la eternidad.
            </p>
          </div>
        </div>

        {/* Primary Service Filter Selector */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
            Filtrar por Servicio:
          </span>
          </div>

        {/* Filters & Search Control Bar */}
        <div className="glass p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[var(--glass-border)] mb-8 sm:mb-12 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              id="filter-cat-todas"
              onClick={() => onCategoryFilterChange('todas')}
              className={`touch-target shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategoryFilter === 'todas'
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-hover-bg)]'
              }`}
            >
              Todas las Ocasiones
            </button>

            {ETERNIA_CATEGORIES.map((cat) => {
              const count = stories.filter((s) => s.category === cat.id).length;
              const isActive = activeCategoryFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`filter-cat-${cat.id}`}
                  onClick={() => onCategoryFilterChange(cat.id)}
                  className={`touch-target px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-hover-bg)]'
                  }`}
                >
                  <span className="text-sm leading-none">{cat.emoji}</span>
                  <span className="whitespace-nowrap">{cat.name}</span>
                  <span className="opacity-70 font-mono text-[10px]">({count})</span>
                </button>
              );
            })}

            {userUploadedCount > 0 && (
              <button
                id="filter-cat-subidos"
                onClick={() => onCategoryFilterChange('subidos')}
                className={`touch-target shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategoryFilter === 'subidos'
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md font-bold'
                    : 'text-[var(--text-primary)] glass border border-[var(--glass-border)]'
                }`}
              >
                <span>🚀 Subidos en Portal ({userUploadedCount})</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por canción, nombre, boda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full glass-input text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
          </div>
        </div>

        {/* Video & Song Cards Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-12 sm:py-16 glass rounded-3xl border border-[var(--glass-border)]">
            <Film className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
            <h4 className="serif italic text-lg text-[var(--text-primary)]">No se encontraron obras con ese criterio</h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm mx-auto font-light">
              Prueba cambiando los filtros de servicio u ocasión para explorar más canciones y videos.
            </p>
            <button
              onClick={() => {
                setSelectedServiceType('all');
                onCategoryFilterChange('todas');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-105 transition-all touch-target cursor-pointer"
            >
              Ver Todas las Obras
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-h-[750px] overflow-y-auto custom-scrollbar pr-2">
            {filteredStories.map((story) => {
              const badge = getServiceBadge(story.serviceType);
              const isSong = story.serviceType === 'cancion';

              return (
                <div
                  key={story.id}
                  id={`video-card-${story.id}`}
                  onClick={() => onSelectStory(story)}
                  className="group rounded-[28px] sm:rounded-[32px] glass border border-[var(--glass-border)] hover:bg-[var(--glass-hover-bg)] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1.5 shadow-lg"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                    <img 
                      src={story.thumbnailUrl} 
                      alt={story.title}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Service Type Tag (Pill) */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                      <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border flex items-center gap-1.5 backdrop-blur-md ${badge.classes}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] font-mono text-white/90 glass border border-white/15">
                        {story.duration}
                      </span>
                    </div>

                    {/* Center Play Button with special icon for songs */}
                    <div className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white/30 transition-all z-20">
                      {isSong ? (
                        <Music className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-0 h-0 border-t-[6px] sm:border-t-[7px] border-t-transparent border-l-[10px] sm:border-l-[11px] border-l-white border-b-[6px] sm:border-b-[7px] border-b-transparent ml-0.5" />
                      )}
                    </div>

                    {/* Occasion / Category pill */}
                    <div className="absolute bottom-3 left-3 sm:left-4 z-10 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono text-white/90 bg-black/60 backdrop-blur-sm border border-white/20">
                        {story.categoryIcon} {story.categoryLabel.replace('Eternia ', '')}
                      </span>
                      {story.isUserUploaded && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-emerald-500/80 text-black font-mono">
                          Portal
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                          {story.protagonists}
                        </span>
                      </div>
                      <h3 className="serif italic text-lg sm:text-xl text-[var(--text-primary)] transition-colors tracking-tight leading-snug line-clamp-1">
                        {story.title}
                      </h3>

                      <p className="text-xs text-[var(--text-secondary)] mt-2 sm:mt-2.5 line-clamp-2 leading-relaxed font-light">
                        {story.synopsis}
                      </p>

                      {/* Client quote highlight */}
                      <div className="mt-3 sm:mt-3.5 p-2.5 sm:p-3 rounded-2xl glass border border-[var(--glass-border)] text-[11px] text-[var(--text-secondary)] italic line-clamp-2 font-light">
                        “{story.clientQuote}”
                      </div>
                    </div>

                    {/* Card Bottom Meta */}
                    <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                        <Music className="w-3.5 h-3.5 opacity-70 text-amber-400" />
                        <span className="truncate max-w-[120px] sm:max-w-[130px] font-mono text-[11px]">{story.soundtrackStyle}</span>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{story.viewsCount}</span>
                        </span>
                        <span className="flex items-center gap-1 text-[var(--text-primary)] opacity-80">
                          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                          <span>{story.likesCount}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

