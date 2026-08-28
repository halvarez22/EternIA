import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, UploadCloud, Film, Play, Menu, X, Sun, Moon, LogIn, ShieldCheck, Video } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';
import { EternIALogo } from './EternIALogo';

interface NavbarProps {
  onOpenUploadModal: () => void;
  onOpenAdminModal: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
  onNavigateTo: (sectionId: string) => void;
  activeSection: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUploadModal,
  onOpenAdminModal,
  isAdminLoggedIn,
  onLogoutAdmin,
  onNavigateTo,
  activeSection,
  theme,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSoundscape = () => {
    if (isAudioActive) {
      soundscape.stopAmbient();
      setIsAudioActive(false);
    } else {
      soundscape.startAmbient('romantico');
      setIsAudioActive(true);
    }
  };

  // Navigation items for promotional draft 1 (perspectivas 3d and creador are preserved for draft 2)
  const SHOW_DRAFT2_NAV = false;

    const navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'categorias', label: 'Líneas EternIA' },
    { id: 'videos', label: 'Galería de Obras' },
    ...(SHOW_DRAFT2_NAV ? [
      { id: 'mockups-3d', label: 'Perspectiva 3D' },
      { id: 'creador', label: 'Estudio de Creación' },
    ] : []),
    { id: 'precios', label: 'Planes' },
    { id: 'testimonios', label: 'Testimonios' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 sm:py-3.5 bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-xl'
          : 'py-3.5 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo - Official Emblem + Typography */}
        <button
          id="btn-brand-logo"
          onClick={() => onNavigateTo('hero')}
          className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none min-h-[44px]"
        >
          <div className="relative group-hover:scale-105 transition-transform duration-300 shrink-0">
            <EternIALogo size={38} variant="icon" showGlow={true} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline leading-tight">
              <span className="serif italic text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent tracking-tight">
                etern
              </span>
              <span className="text-lg sm:text-2xl font-extrabold tracking-normal bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-600 bg-clip-text text-transparent ml-0.5 drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]">
                IA
              </span>
            </div>
            <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.22em] text-[var(--text-muted)] font-semibold -mt-0.5 hidden xs:block">
              Canciones Personalizadas
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links - Editorial Tracking */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[10px] uppercase tracking-[0.3em] font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigateTo(item.id)}
                className={`transition-all duration-200 cursor-pointer py-2 ${
                  isActive
                    ? 'text-[var(--text-primary)] opacity-100 font-semibold'
                    : 'text-[var(--text-primary)] opacity-60 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            id="btn-toggle-theme"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="touch-target glass px-3 py-2 rounded-full border border-[var(--glass-border)] text-[var(--text-primary)] hover:scale-105 transition-all flex items-center gap-1.5"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span className="hidden md:inline text-[9px] uppercase tracking-widest font-mono opacity-80">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-neutral-800" />
                <span className="hidden md:inline text-[9px] uppercase tracking-widest font-mono opacity-80">Oscuro</span>
              </>
            )}
          </button>

          {/* [DRAFT 2 FEATURE - HIDDEN FOR PROMOTIONAL DRAFT 1] Ambient Soundscape Button */}
          {SHOW_DRAFT2_NAV && (
            <button
              id="btn-toggle-soundscape"
              onClick={toggleSoundscape}
              title={isAudioActive ? 'Silenciar atmósfera sonora' : 'Activar atmósfera musical'}
              className={`touch-target glass px-3 sm:px-3.5 py-2 rounded-full border border-[var(--glass-border)] transition-all duration-200 flex items-center gap-2 text-xs text-[var(--text-primary)] ${
                isAudioActive
                  ? 'bg-white/15 shadow-sm opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="hidden xl:inline text-[10px] uppercase tracking-widest">Música Activa</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 opacity-70" />
                  <span className="hidden xl:inline text-[10px] uppercase tracking-widest opacity-70">Música</span>
                </>
              )}
            </button>
          )}

          {/* [DRAFT 2 FEATURE - HIDDEN FOR PROMOTIONAL DRAFT 1] Upload Finished Video Button */}
          {SHOW_DRAFT2_NAV && (
            <button
              id="btn-open-upload-video-nav"
              onClick={onOpenUploadModal}
              className="hidden sm:flex items-center gap-2 glass px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] border border-[var(--glass-border)] hover:scale-105 transition-all"
            >
              <UploadCloud className="w-3.5 h-3.5 opacity-80" />
              <span className="text-[10px] tracking-widest">Subir Video</span>
            </button>
          )}

          {/* Authorized Admin / Ingresar Button (High contrast, clearly legible) */}
          {isAdminLoggedIn ? (
            <button
              id="btn-nav-admin-studio"
              onClick={onOpenAdminModal}
              className="px-4 sm:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer bg-amber-400 text-slate-950 hover:bg-amber-300 hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 border border-amber-300"
              title="Panel de Gestión de Videos"
            >
              <Video className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden xs:inline font-bold text-slate-950">Gestionar Videos</span>
              <span className="inline xs:hidden font-bold text-slate-950">Videos</span>
            </button>
          ) : (
            <button
              id="btn-nav-login"
              onClick={onOpenAdminModal}
              className="px-4 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] cursor-pointer bg-white text-slate-950 dark:bg-white dark:text-slate-950 hover:bg-neutral-100 hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-white/10 border border-white/40"
            >
              <LogIn className="w-3.5 h-3.5 shrink-0 text-slate-950" />
              <span className="font-bold text-slate-950">Ingresar</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="lg:hidden touch-target p-2.5 rounded-full glass border border-[var(--glass-border)] text-[var(--text-primary)] hover:opacity-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden mt-3 mx-4 sm:mx-6 p-6 rounded-3xl bg-[var(--modal-bg)] backdrop-blur-2xl border border-[var(--glass-border)] shadow-2xl flex flex-col gap-3.5 animate-fade-in"
        >
          {/* Drawer header / Theme switch shortcut */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Menú de Navegación</span>
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-[var(--text-primary)]"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="text-[10px] uppercase">{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigateTo(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-3 rounded-2xl text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                  : 'text-[var(--text-primary)] opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-[var(--glass-border)] flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenAdminModal();
                setMobileMenuOpen(false);
              }}
              className={`touch-target flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
                isAdminLoggedIn
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                  : 'bg-white text-slate-950 hover:bg-neutral-100 border border-white/40'
              }`}
            >
              {isAdminLoggedIn ? (
                <>
                  <Video className="w-4 h-4 text-slate-950" />
                  <span className="text-slate-950 font-bold">Gestionar Videos & Promos</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-slate-950" />
                  <span className="text-slate-950 font-bold">Ingresar al Estudio</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


