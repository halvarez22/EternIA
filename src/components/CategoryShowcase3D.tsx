import React from 'react';
import { ETERNIA_CATEGORIES } from '../data/mockStories';
import { EterniaCategory, CategoryInfo } from '../types';
import { Sparkles, ArrowRight, Music, HeartHandshake, Film } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

interface CategoryShowcase3DProps {
  onSelectCategory: (category: EterniaCategory) => void;
  onLaunchCreatorWithCategory: (category: EterniaCategory) => void;
  selectedCategoryFilter: string;
}

export const CategoryShowcase3D: React.FC<CategoryShowcase3DProps> = ({
  onSelectCategory,
  onLaunchCreatorWithCategory,
  selectedCategoryFilter
}) => {
  const handlePreviewTone = (e: React.MouseEvent, catId: EterniaCategory) => {
    e.stopPropagation();
    const moodMap: Record<EterniaCategory, 'romantico' | 'solemne' | 'mistico' | 'festivo'> = {
      bodas: 'romantico',
      celebraciones: 'festivo',
      bautizos: 'mistico',
      homenajes: 'solemne',
      recuerdos: 'romantico',
      historias: 'solemne'
    };
    soundscape.startAmbient(moodMap[catId]);
  };

  return (
    <section
      id="categorias"
      className="min-h-screen flex flex-col justify-center py-12 relative bg-transparent overflow-hidden border-t border-[var(--glass-border)]"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium glass text-[var(--text-primary)] opacity-80 mb-4 sm:mb-5 border border-[var(--glass-border)]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>COLECCIONES & LÍNEAS EternIA</span>
          </div>
          <h2 className="serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] sm:leading-[1.1] text-[var(--text-primary)] mb-4 gradient-text">
            Un santuario sonoro y visual para cada instante que trasciende
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-light">
            EternIA no dice “videos”. Dice eternidad. Cada categoría cuenta con dirección artística personalizada, composición musical exclusiva y producción cinematográfica de autor.
          </p>
        </div>

        {/* 3D Perspective Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ETERNIA_CATEGORIES.map((cat: CategoryInfo) => {
            const isFilterActive = selectedCategoryFilter === cat.id;

            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-[28px] sm:rounded-[32px] glass p-6 sm:p-8 border transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1.5 ${
                  isFilterActive
                    ? 'border-[var(--glass-border)] bg-[var(--glass-hover-bg)] shadow-xl ring-1 ring-[var(--glass-border)]'
                    : 'border-[var(--glass-border)] hover:bg-[var(--glass-hover-bg)]'
                }`}
              >
                {/* Top Row: Emoji Icon & Tone Sound Button */}
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-12 h-12 rounded-2xl glass border border-[var(--glass-border)] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {cat.emoji}
                  </div>

                  <button
                    id={`btn-sample-tone-${cat.id}`}
                    onClick={(e) => handlePreviewTone(e, cat.id)}
                    title="Escuchar atmósfera musical de esta categoría"
                    className="touch-target glass px-3.5 py-1.5 rounded-full border border-[var(--glass-border)] text-[var(--text-primary)] opacity-70 hover:opacity-100 transition-all flex items-center gap-1.5 text-xs"
                  >
                    <Music className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase tracking-wider font-mono">Tono</span>
                  </button>
                </div>

                {/* Category Title & Tagline */}
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--text-muted)] block mb-1">
                  {cat.tagline}
                </span>
                <h3 className="serif italic text-xl sm:text-2xl text-[var(--text-primary)] transition-colors">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed min-h-[50px] sm:min-h-[60px] font-light">
                  {cat.description}
                </p>

                {/* Attributes pill container */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[var(--glass-border)] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)] font-light">Atmósfera:</span>
                    <span className="text-[var(--text-primary)] font-medium truncate max-w-[170px] text-right font-mono text-[11px]">
                      {cat.musicalDefaults}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)] font-light">Emoción:</span>
                    <span className="text-[var(--text-primary)] font-medium text-[11px] uppercase tracking-wider">
                      {cat.highlightTone}
                    </span>
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="mt-5 sm:mt-6 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[var(--text-primary)] opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    <span>Ver Obras</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    id={`btn-create-for-${cat.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(cat.id);
                    }}
                    className="touch-target glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] hover:scale-105 transition-all shadow-md"
                  >
                    Ver Ejemplos
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
