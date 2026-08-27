import React from 'react';
import { Sparkles, Heart, Shield, ArrowUp } from 'lucide-react';
import { EternIALogo } from './EternIALogo';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-transparent border-t border-[var(--glass-border)] pt-16 sm:pt-20 pb-28 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-[var(--glass-border)]">
          {/* Brand Col with Emblem Logo */}
          <div className="md:col-span-2 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-4">
              <EternIALogo size={52} variant="icon" showGlow={true} />
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="serif italic text-2xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent tracking-tight">
                    etern
                  </span>
                  <span className="text-2xl font-extrabold tracking-normal bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-600 bg-clip-text text-transparent ml-0.5 drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]">
                    IA
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-semibold -mt-0.5">
                  Canciones Personalizadas
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] max-w-md leading-relaxed font-light">
              <strong className="text-[var(--text-primary)] font-normal serif italic block text-sm mb-1">
                “Tu historia, hecha canción ♡”
              </strong>
              Tú nos das el momento. Nosotros lo convertimos en una historia sonora que podrás volver a sentir una y otra vez. Canciones compuestas a medida con Inteligencia Artificial y producción musical de alta fidelidad.
            </p>

            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 opacity-70" />
                Derechos Perpetuos
              </span>
              <span>•</span>
              <span>Mastering de Cine</span>
            </div>
          </div>

          {/* Lines Col */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 sm:mb-4">
              Líneas EternIA
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] font-light">
              <li>
                <button onClick={() => onNavigateTo('categorias')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  EternIA Bodas 💍
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('categorias')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  EternIA Celebraciones 🎂
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('categorias')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  EternIA Bautizos ✝️
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('categorias')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  EternIA Homenajes 🕊️
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('categorias')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  EternIA Recuerdos ❤️
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('categorias')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  EternIA Historias ✨
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 sm:mb-4">
              Experiencia Digital
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] font-light">
              <li>
                <button onClick={() => onNavigateTo('categorias')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  Líneas y Colecciones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('videos')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  Galería de Videos y Obras
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('precios')} className="hover:text-[var(--text-primary)] transition-colors text-left py-0.5">
                  Planes, Tarifas y Cotización
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} EternIA Studio. Todos los derechos reservados.</p>

          <button
            onClick={scrollToTop}
            className="touch-target px-4 py-2 rounded-full glass border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2 uppercase tracking-wider text-[10px]"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
