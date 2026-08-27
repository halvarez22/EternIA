import React, { useState, useRef } from 'react';
import { Sparkles, Play, Eye, Layers, Compass, Music, Heart, ShieldCheck, Film, ChevronRight, Video, ArrowUpRight, Volume2 } from 'lucide-react';
import { FinishedStory } from '../types';
import { EternIALogo } from './EternIALogo';
import { soundscape } from '../utils/audioSynth';

interface Hero3DSectionProps {
  onExploreStories: () => void;
  onCreateStory: () => void;
  onSelectStory: (story: FinishedStory) => void;
  featuredStory: FinishedStory;
  onOpenUpload: () => void;
}

export const Hero3DSection: React.FC<Hero3DSectionProps> = ({
  onExploreStories,
  onCreateStory,
  onSelectStory,
  featuredStory,
  onOpenUpload
}) => {
  const [logoTilt, setLogoTilt] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 25;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -25;
    setLogoTilt({ x: y, y: x });
  };

  const handleLogoLeave = () => {
    setLogoTilt({ x: 0, y: 0 });
  };

  const handleLogoClick = () => {
    soundscape.playSuccess();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-transparent"
    >
      {/* Background ambient lighting glows per cosmic studio theme */}
      <div className="absolute -top-10 -right-10 w-80 sm:w-[520px] h-80 sm:h-[520px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-80 sm:w-[520px] h-80 sm:h-[520px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 w-full">
        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 z-10 text-center lg:text-left">
            {/* Top Tagline Pill with Official Badge */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium glass border-[var(--glass-border)] text-[var(--text-primary)] opacity-90 mb-5 sm:mb-6 shadow-md"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Inteligencia Artificial & Producción Cinematográfica</span>
            </div>

            {/* Main Headline - Editorial Serif & Gradient */}
            <h1 className="serif text-3xl xs:text-4xl sm:text-5xl lg:text-[56px] xl:text-[60px] leading-[1.08] sm:leading-[1.02] tracking-normal mb-5 sm:mb-6 gradient-text">
              Tu historia, hecha canción.
            </h1>

            {/* Subtext description */}
            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-lg mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8 font-light">
              Tú nos das el momento. Nosotros lo convertimos en una historia que podrás volver a sentir una y otra vez. Eternizamos tus bodas, celebraciones, homenajes y recuerdos con Inteligencia Artificial, líricas de autor y producción sonora cinematográfica.
            </p>

            {/* CTA Button Group & User Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-8">
              <button
                id="btn-hero-start"
                onClick={onCreateStory}
                className="w-full sm:w-auto bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-2 cursor-pointer touch-target"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Planes y Tarifas</span>
              </button>

              <button
                id="btn-hero-explore-videos"
                onClick={onExploreStories}
                className="w-full sm:w-auto glass px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:opacity-100 transition-all border border-[var(--glass-border)] flex items-center justify-center gap-2 touch-target"
              >
                <Film className="w-3.5 h-3.5 opacity-70" />
                <span>Ver Obras</span>
              </button>
            </div>

            {/* User Avatars Counter */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-[var(--glass-border)]">
              <div className="flex -space-x-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[var(--bg-app)] bg-neutral-700 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                    alt="Usuario Eternia"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[var(--bg-app)] bg-neutral-800 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                    alt="Usuario Eternia"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[var(--bg-app)] bg-neutral-800 flex items-center justify-center text-[10px] font-semibold text-white">
                  +2k
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                Historias inolvidables creadas hoy
              </span>
            </div>
          </div>

          {/* Right Column: Massive Logo & Flat Clean Showcase Card */}
          <div className="lg:col-span-6 relative flex flex-col justify-center items-center gap-6 sm:gap-10 mt-8 lg:mt-0">
            
            {/* CENTERPIECE EMBLEM LOGO - PROTAGONISTA PRINCIPAL (Moved to right column) */}
            <div
              ref={logoRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoLeave}
              onClick={handleLogoClick}
              style={{
                transform: `perspective(1000px) rotateX(${logoTilt.x}deg) rotateY(${logoTilt.y}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
              className="relative cursor-pointer group select-none flex justify-center items-center"
              title="Haz clic para escuchar el sonido maestro de autor"
            >
              {/* Pulsing Multi-Color Radiant Halo */}
              <div className="absolute -inset-6 sm:-inset-10 rounded-full bg-gradient-to-r from-cyan-500/30 via-amber-400/25 to-pink-500/30 blur-2xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-amber-300 to-pink-500 opacity-40 group-hover:opacity-90 blur-xl transition-opacity duration-300 pointer-events-none" />

              {/* Giant Circular Emblem Badge with Gold & Neon Rim */}
              <div className="relative rounded-3xl p-4 bg-[#040814]/40 backdrop-blur-3xl border border-cyan-400/30 shadow-[0_0_80px_rgba(0,240,255,0.25)] group-hover:shadow-[0_0_120px_rgba(245,158,11,0.4)] transition-all duration-500 group-hover:scale-105 flex justify-center items-center">
                <EternIALogo
                  variant="badge"
                  showGlow={true}
                  animated={true}
                  className="w-[20vh] h-[20vh] sm:w-[25vh] sm:h-[25vh] lg:w-[35vh] lg:h-[35vh] xl:w-[40vh] xl:h-[40vh] max-w-[400px] max-h-[400px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Floating Quality Badge Pill */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070F22]/95 border border-amber-400/50 text-[9px] uppercase font-bold tracking-widest text-amber-300 shadow-xl backdrop-blur-md whitespace-nowrap group-hover:scale-110 transition-transform z-20">
                <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>Estudio Oficial</span>
              </div>
            </div>

            {/* Clean Flat Card Container */}
            <div
              id="hero-featured-card"
              className="glass w-full max-w-[340px] sm:max-w-[440px] rounded-[24px] p-4 relative overflow-hidden border border-[var(--glass-border)] shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10"
            >
              {/* Internal gradient shine overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

              {/* Card Header with Status and Pulse Dot */}
              <div className="flex justify-between items-center mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1.5 bg-black/20 dark:bg-white/20 rounded-full" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono">
                    EternIA // {featuredStory.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] uppercase tracking-widest text-[var(--text-muted)]">4K MASTER</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                </div>
              </div>

              {/* Media Showcase Player Preview */}
              <div className="aspect-[16/9] bg-neutral-900 rounded-xl overflow-hidden mb-3 relative group border border-[var(--glass-border)]">
                <img
                  src={featuredStory.thumbnailUrl}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Watermark Brand Seal */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <EternIALogo size={12} variant="icon" showGlow={false} />
                    <span className="text-[8px] font-bold text-white tracking-wider">EternIA</span>
                  </div>
                </div>

                {/* Play Trigger Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => onSelectStory(featuredStory)}
                    aria-label="Reproducir obra"
                    className="touch-target w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-white/30 transition-all shadow-xl"
                  >
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                  </button>
                </div>

                {/* Audio progress bar */}
                <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-white" />
                </div>
              </div>

              {/* Story Editorial Information */}
              <div className="space-y-1.5 relative z-10 text-left">
                <h3 className="text-base serif italic text-[var(--text-primary)] tracking-tight leading-snug">
                  {featuredStory.title}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="px-2 py-0.5 glass rounded-full text-[8px] uppercase tracking-tighter text-[var(--text-secondary)] border border-[var(--glass-border)]">
                    Cinemático 4K
                  </div>
                  <div className="px-2 py-0.5 glass rounded-full text-[8px] uppercase tracking-tighter text-[var(--text-secondary)] border border-[var(--glass-border)]">
                    {featuredStory.soundtrackStyle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
