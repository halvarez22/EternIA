import React from 'react';
import { TESTIMONIALS } from '../data/mockStories';
import { Star, Heart, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const EmotionalTestimonials: React.FC = () => {
  return (
    <section
      id="testimonios"
      className="min-h-screen flex flex-col justify-center py-12 relative bg-transparent overflow-hidden border-t border-[var(--glass-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium glass text-[var(--text-primary)] opacity-80 mb-3 sm:mb-4 border border-[var(--glass-border)]">
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
            <span>EL IMPACTO EN EL CORAZÓN</span>
          </div>
          <h2 className="serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-normal text-[var(--text-primary)] gradient-text mb-3 sm:mb-4">
            Historias que hicieron llorar de emoción
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
            Más de 1,400 familias y parejas han confiado en EternIA para guardar sus instantes sagrados.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-[24px] sm:rounded-[32px] glass p-6 sm:p-8 border border-[var(--glass-border)] flex flex-col justify-between hover:bg-[var(--glass-hover-bg)] transition-all duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1.5 text-amber-400 mb-4 sm:mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <blockquote className="serif italic text-sm text-[var(--text-primary)] leading-relaxed font-light">
                  “{t.text}”
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[var(--glass-border)] flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-[var(--glass-border)]"
                />
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <span>{t.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Counters Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-[28px] sm:rounded-[36px] glass border border-[var(--glass-border)] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <span className="serif italic text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-normal">
              1,420+
            </span>
            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mt-1">Historias Creadas</p>
          </div>
          <div>
            <span className="serif italic text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-normal">
              99.8%
            </span>
            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mt-1">Emoción Positiva</p>
          </div>
          <div>
            <span className="serif italic text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-normal">
              48h
            </span>
            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mt-1">Entrega Promedio</p>
          </div>
          <div>
            <span className="serif italic text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-normal">
              4K / Atmos
            </span>
            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mt-1">Estándar de Cine</p>
          </div>
        </div>
      </div>
    </section>
  );
};
