import React, { useState } from 'react';
import { Smartphone, Laptop, Tablet, Eye, Sparkles, Layers, Sliders, RefreshCw, Compass, Music, Film, CheckCircle2 } from 'lucide-react';
import { EternIALogo } from './EternIALogo';

export const Interactive3DMockupViewer: React.FC = () => {
  const [deviceMode, setDeviceMode] = useState<'all' | 'mobile' | 'tablet' | 'desktop'>('all');
  const [rotX, setRotX] = useState(24);
  const [rotY, setRotY] = useState(-18);
  const [rotZ, setRotZ] = useState(4);
  const [depthZ, setDepthZ] = useState(40);
  const [activeScreenTab, setActiveScreenTab] = useState<'player' | 'lyrics' | 'certificate'>('player');

  const presetView = (preset: 'iso' | 'top' | 'side' | 'reset') => {
    if (preset === 'iso') {
      setRotX(24);
      setRotY(-18);
      setRotZ(4);
    } else if (preset === 'top') {
      setRotX(42);
      setRotY(0);
      setRotZ(0);
    } else if (preset === 'side') {
      setRotX(10);
      setRotY(-32);
      setRotZ(2);
    } else {
      setRotX(0);
      setRotY(0);
      setRotZ(0);
    }
  };

  return (
    <section id="mockups-3d" className="py-20 sm:py-28 lg:py-32 relative bg-transparent overflow-hidden border-t border-[var(--glass-border)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium glass text-[var(--text-primary)] opacity-90 mb-3 sm:mb-4 border border-[var(--glass-border)] shadow-sm">
            <EternIALogo size={18} variant="icon" showGlow={false} />
            <span>ARQUITECTURA & PERSPECTIVA 3D</span>
          </div>
          <h2 className="serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[var(--text-primary)] mb-4 gradient-text">
            Diseño UI/UX en Perspectiva 3D y Glassmorphism
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Simulación de la suite digital EternIA. Controla la cámara tridimensional desde arriba y de lado para apreciar la profundidad visual y el diseño editorial.
          </p>
        </div>

        {/* Interactive 3D Controls Bar */}
        <div className="glass p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[var(--glass-border)] mb-8 sm:mb-12 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold flex items-center gap-1.5 mr-1 sm:mr-2">
              <Compass className="w-3.5 h-3.5 opacity-70" />
              Ángulo de Cámara:
            </span>
            <button
              onClick={() => presetView('iso')}
              className="touch-target px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] transition-all shadow-sm"
            >
              Isométrico (3/4)
            </button>
            <button
              onClick={() => presetView('top')}
              className="touch-target px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold glass text-[var(--text-primary)] opacity-70 hover:opacity-100 transition-all border border-[var(--glass-border)]"
            >
              Cenital (Superior)
            </button>
            <button
              onClick={() => presetView('side')}
              className="touch-target px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold glass text-[var(--text-primary)] opacity-70 hover:opacity-100 transition-all border border-[var(--glass-border)]"
            >
              Lateral (De Lado)
            </button>
            <button
              onClick={() => presetView('reset')}
              className="touch-target p-2 rounded-full glass border border-[var(--glass-border)] text-[var(--text-primary)] opacity-70 hover:opacity-100"
              title="Reiniciar rotación"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sliders for precise 3D manipulation */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Rot X:</span>
              <input
                type="range"
                min="-45"
                max="60"
                value={rotX}
                onChange={(e) => setRotX(parseInt(e.target.value))}
                className="w-20 sm:w-24 accent-[var(--text-primary)] h-1 bg-black/10 dark:bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[10px] text-[var(--text-secondary)] w-6">{rotX}°</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Rot Y:</span>
              <input
                type="range"
                min="-60"
                max="60"
                value={rotY}
                onChange={(e) => setRotY(parseInt(e.target.value))}
                className="w-20 sm:w-24 accent-[var(--text-primary)] h-1 bg-black/10 dark:bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[10px] text-[var(--text-secondary)] w-6">{rotY}°</span>
            </div>
          </div>
        </div>

        {/* 3D Perspective Stage Area */}
        <div className="perspective-deep min-h-[480px] sm:min-h-[580px] w-full flex items-center justify-center py-6 sm:py-10 relative overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[var(--glass-border)] glass">
          {/* Main 3D Canvas Canvas */}
          <div
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.25s ease-out',
            }}
            className="relative w-full max-w-4xl flex items-center justify-center px-3"
          >
            {/* Device 1: Central Web App Dashboard Mockup */}
            <div
              style={{
                transform: `translateZ(${depthZ}px)`,
                transformStyle: 'preserve-3d',
              }}
              className="w-full sm:w-[92%] md:w-[720px] rounded-[28px] sm:rounded-[36px] glass border border-[var(--glass-border)] p-4 sm:p-6 shadow-2xl relative"
            >
              {/* Web Header Bar */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-1 sm:ml-2 font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)] tracking-wider truncate max-w-[140px] sm:max-w-none">
                    https://eternia.app/experiencia/votos-sofia-mateo
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest px-2.5 sm:px-3 py-0.5 rounded-full glass text-[var(--text-primary)] opacity-80 border border-[var(--glass-border)]">
                  Master 4K Suite
                </span>
              </div>

              {/* Mockup Screen View Content */}
              <div className="mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                {/* Left Mini Player & Wave */}
                <div className="md:col-span-7 bg-black/5 dark:bg-black/40 rounded-2xl p-3 sm:p-3.5 border border-[var(--glass-border)]">
                  <div className="aspect-video rounded-xl overflow-hidden relative bg-black">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
                      alt="Mockup video"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-3">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/70">EternIA Bodas 💍</span>
                        <p className="serif italic text-sm text-white">El Sí Quiero de Sofía & Mateo</p>
                      </div>
                    </div>
                  </div>

                  {/* Synchronized Audio Track */}
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">
                      <Music className="w-3 h-3 opacity-70" />
                      Balada Orquestal en Re Mayor
                    </span>
                    <span className="font-semibold text-[var(--text-primary)]">02:45</span>
                  </div>

                  <div className="mt-2 flex items-center gap-1 h-5 px-1 bg-black/5 dark:bg-white/5 rounded-lg">
                    {[30, 60, 90, 45, 75, 100, 80, 50, 65, 85, 95, 40, 70, 80, 60, 45, 90, 100, 70, 30].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 bg-[var(--text-primary)] opacity-70 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Right Interactive Delivery Details */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                  <div className="p-3 sm:p-4 rounded-2xl glass border border-[var(--glass-border)] text-xs">
                    <div className="flex items-center justify-between text-[var(--text-primary)] font-medium mb-1.5">
                      <span className="serif italic text-sm">Votos Personalizados</span>
                      <Sparkles className="w-3.5 h-3.5 opacity-60 text-amber-400" />
                    </div>
                    <p className="text-[var(--text-secondary)] italic text-[11px] leading-relaxed font-light">
                      “En cada paso que dimos juntos, el tiempo pareció detenerse... un lazo eterno que nada podrá quebrar.”
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-[var(--glass-border)] text-[11px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-muted)]">Entrega:</span>
                      <span className="text-[var(--text-primary)] font-medium flex items-center gap-1 font-mono text-[10px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> 4K Ultra HD
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-muted)]">Audio:</span>
                      <span className="text-[var(--text-primary)] font-mono text-[10px]">Dolby Atmos / 24-bit</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-muted)]">Presentación:</span>
                      <span className="text-[var(--text-secondary)] text-[10px]">Cofre con QR de Cristal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device 2: Mobile Device Mockup Floating in 3D Space (Right) */}
            <div
              style={{
                transform: `translate3d(320px, -50px, ${depthZ + 70}px) rotateY(-18deg) rotateX(8deg)`,
                transformStyle: 'preserve-3d',
              }}
              className="hidden lg:block absolute w-60 rounded-[36px] p-3.5 glass border border-[var(--glass-border)] shadow-2xl"
            >
              {/* Phone Speaker Notch */}
              <div className="w-14 h-2 bg-white/20 rounded-full mx-auto mb-2" />

              <div className="rounded-[24px] overflow-hidden bg-neutral-900 border border-white/10 p-2.5">
                <div className="aspect-[9/16] rounded-xl overflow-hidden relative bg-black flex flex-col justify-between p-3">
                  <img
                    src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=400&auto=format&fit=crop"
                    alt="Bautizo Lucas"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="relative z-10 flex justify-between items-center text-[9px] uppercase tracking-widest text-white">
                    <span className="px-2 py-0.5 rounded-full glass">EternIA App</span>
                    <span className="font-mono text-white/70">1080p</span>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">Bautizo de Lucas ✝️</span>
                    <p className="serif italic text-xs text-white">Nana Celestial</p>
                    <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                      <div className="bg-white h-full w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device 3: Storyboard Holographic Card Floating in 3D Space (Left) */}
            <div
              style={{
                transform: `translate3d(-340px, 40px, ${depthZ + 60}px) rotateY(18deg) rotateX(-6deg)`,
                transformStyle: 'preserve-3d',
              }}
              className="hidden lg:block absolute w-64 rounded-[32px] glass p-5 border border-[var(--glass-border)] shadow-2xl"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] mb-2">
                <Film className="w-3.5 h-3.5 opacity-70" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Dirección de Cine IA</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                Renderizado multicapa con corrección de color cinemática y sincronización armónica automática.
              </p>
              <div className="mt-3 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                <span>Fotogrametría 3D</span>
                <span className="text-[var(--text-primary)] font-semibold">60 FPS Ultra HD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
