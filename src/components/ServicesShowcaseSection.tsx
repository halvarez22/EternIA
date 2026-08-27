import React from 'react';
import { Music, Film, Sparkles, Disc, Video, CheckCircle2, ArrowRight, Layers, Volume2 } from 'lucide-react';
import { EternIALogo } from './EternIALogo';

interface ServicesShowcaseSectionProps {
  onSelectServiceTab: (serviceType: 'cancion' | 'video' | 'video_musicalizado') => void;
  onNavigateTo: (sectionId: string) => void;
}

export const ServicesShowcaseSection: React.FC<ServicesShowcaseSectionProps> = ({
  onSelectServiceTab,
  onNavigateTo,
}) => {
  const services = [
    {
      id: 'cancion' as const,
      badge: 'Servicio 01 • Audio & Composición',
      title: 'Canciones Hechas a la Medida',
      subtitle: 'Composición musical 100% original e inédita con letra basada en tu historia',
      icon: Music,
      accentColor: 'from-amber-400 to-amber-600',
      borderColor: 'border-amber-400/30',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      description:
        'Transformamos tus votos, cartas o anécdotas en una canción completa de estudio con arreglos de instrumentos reales y vocalistas profesionales.',
      highlights: [
        'Composición e instrumentación desde cero (cualquier género)',
        'Letra poética personalizada con nombres y momentos',
        'Vocalistas profesionales de estudio',
        'Se permite 1 ajuste en letra o mezcla',
        'Se entregan 2 versiones (Audio Master HD)'
      ],
      sampleLabel: 'Escuchar Canciones a la Medida',
      priceFrom: 'Desde $200 MXN'
    },
    {
      id: 'video_musicalizado' as const,
      badge: 'Servicio 02 • Experiencia Total EternIA',
      title: 'Videos Musicalizados',
      subtitle: 'Película cinematográfica + Canción original sincronizadas a la perfección',
      icon: Sparkles,
      accentColor: 'from-amber-300 via-pink-500 to-violet-600',
      borderColor: 'border-amber-400/70',
      badgeBg: 'bg-gradient-to-r from-amber-400/20 to-pink-500/20 text-amber-300 border-amber-400/50',
      isHero: true,
      description:
        'La máxima expresión de nuestro arte. Creamos la canción original y el video cinematográfico, sincronizando cada nota con cada imagen tuya.',
      highlights: [
        'Canción original compuesta para marcar el compás del video',
        'Película cinematográfica 4K sincronizada cuadro por cuadro',
        'Edición visual profesional con etalonaje y voces reales',
        'No se permiten ajustes (entrega final impecable)',
        'Se entrega 1 versión maestra final'
      ],
      sampleLabel: 'Ver Videos Musicalizados',
      priceFrom: 'Desde $560 MXN'
    }
  ];

  return (
    <section
      id="servicios"
      className="min-h-screen flex flex-col justify-center py-12 relative bg-transparent overflow-hidden border-t border-[var(--glass-border)]"
    >
      {/* Background glow ambiance */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium glass text-[var(--text-primary)] opacity-90 mb-4 border border-[var(--glass-border)]">
            <Disc className="w-3 h-3 text-amber-400 animate-spin" />
            <span>NUESTRA GAMA DE CREACIONES A LA MEDIDA</span>
          </div>

          <h2 className="serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-normal text-[var(--text-primary)] gradient-text mb-4">
            Dos formas de eternizar tus momentos sagrados
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
            Elige entre la pura emoción de una composición musical de autor, o la majestuosidad de nuestra obra maestra donde la música y el cine nacen sincronizados.
          </p>
        </div>

        {/* 2 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                className={`relative rounded-[32px] p-6 sm:p-8 flex flex-col justify-between glass border transition-all duration-300 hover:-translate-y-1.5 ${
                  srv.isHero
                    ? 'border-amber-400/80 bg-gradient-to-b from-amber-500/10 via-[var(--glass-bg)] to-[var(--glass-bg)] shadow-2xl shadow-amber-500/10 ring-1 ring-amber-400/40'
                    : `${srv.borderColor} hover:border-[var(--glass-border)]`
                }`}
              >
                {srv.isHero && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-black" />
                    <span>★ Experiencia Estelar Completa</span>
                  </div>
                )}

                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border ${srv.badgeBg}`}>
                      {srv.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-primary)]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="serif italic text-2xl text-[var(--text-primary)] tracking-tight mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-amber-300/90 font-medium mb-3">
                    {srv.subtitle}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-[var(--glass-border)] space-y-2.5 mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] block mb-2">
                      Lo que incluye a la medida:
                    </span>
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 border-t border-[var(--glass-border)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase">Tarifa</span>
                    <span className="font-bold text-[var(--text-primary)] font-mono">{srv.priceFrom}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onSelectServiceTab(srv.id);
                        onNavigateTo('videos');
                      }}
                      className="w-full py-2.5 rounded-full glass border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-amber-400/50 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{srv.sampleLabel}</span>
                    </button>

                    <button
                      onClick={() => onNavigateTo('precios')}
                      className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        srv.isHero
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-102 shadow-xl'
                          : 'bg-white/10 hover:bg-white/20 text-[var(--text-primary)]'
                      }`}
                    >
                      <span>Cotizar {srv.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
