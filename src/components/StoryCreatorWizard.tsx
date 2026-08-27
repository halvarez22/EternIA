import React, { useState } from 'react';
import { EterniaCategory, StoryDraft, GeneratedStoryResult } from '../types';
import { Sparkles, Music, Heart, Film, ArrowRight, ArrowLeft, Check, Loader2, Send, MessageCircle, Copy, CheckCheck } from 'lucide-react';
import { ETERNIA_CATEGORIES } from '../data/mockStories';
import { EternIALogo } from './EternIALogo';
import confetti from 'canvas-confetti';
import { generateStoryScript } from '../services/aiService';

interface StoryCreatorWizardProps {
  initialCategory?: EterniaCategory;
  onStoryCompleted?: (result: GeneratedStoryResult) => void;
}

export const StoryCreatorWizard: React.FC<StoryCreatorWizardProps> = ({
  initialCategory = 'bodas',
  onStoryCompleted
}) => {
  const [step, setStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedResult, setGeneratedResult] = useState<GeneratedStoryResult | null>(null);
  const [copiedLyrics, setCopiedLyrics] = useState(false);

  // Form State
  const [formData, setFormData] = useState<StoryDraft>({
    category: initialCategory,
    recipientName: '',
    senderName: '',
    relationship: 'Pareja / Prometidos',
    keyMoments: '',
    musicStyle: 'Balada Orquestal con Piano y Cuerdas',
    emotionalTone: 'Profundamente Emotivo & Romántico',
    specialPhrases: '',
    vocalPreference: 'dueto',
    deliverySpeed: 'express_48h'
  });

  const musicStyles = [
    { id: 'orquestal', label: 'Balada Orquestal (Piano, Violines & Chelo)', desc: 'Ideal para Bodas y Momentos Cumbre' },
    { id: 'acustico', label: 'Pop Acústico & Guitarra Cálida', desc: 'Fresco, cercano y lleno de luz' },
    { id: 'bolero', label: 'Bolero Clásico Modernizado', desc: 'Perfecto para 50 Años y Aniversarios' },
    { id: 'nana', label: 'Nana Celestial & Arpa de Cristal', desc: 'Diseñado para Bautizos y Primeros Latidos' },
    { id: 'epico', label: 'Banda Sonora Épica Cinematográfica', desc: 'Para Historias de Superación y Biografías' },
    { id: 'jazz', label: 'Jazz Íntimo / Soul Cálido', desc: 'Elegante, nocturno y sofisticado' }
  ];

  const emotionalTones = [
    'Profundamente Emotivo (Lágrimas de Alegría)',
    'Romántico & Poético Solemne',
    'Agradecido & Lleno de Paz',
    'Alegre, Dinámico & Celebrativo',
    'Nostálgico Dulce & Sanador'
  ];

  const handleGenerateScript = async () => {
    if (isGenerating || cooldown) return; // Prevent double-clicks and spam (Idempotencia + Cooldown)
    
    if (!formData.recipientName.trim()) {
      setErrorMsg('Por favor ingresa el nombre de la persona o pareja homenajeada.');
      return;
    }
    setErrorMsg('');
    setIsGenerating(true);

    try {
      const response = await generateStoryScript(formData);

      if (response.success && response.data) {
        setGeneratedResult(response.data);
        setStep(4);
        try {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        } catch (e) {
          // ignore
        }
        if (onStoryCompleted) onStoryCompleted(response.data);
      } else {
        setErrorMsg(response.errorMsg || 'Hubo un inconveniente. Intenta nuevamente.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error fatal en el servicio.');
    } finally {
      setIsGenerating(false);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 2000);
    }
  };

  const copyLyricsToClipboard = () => {
    if (!generatedResult) return;
    const fullText = `${generatedResult.title}\n\n[ESTILO: ${generatedResult.styleDescription}]\n\nVERSO 1:\n${generatedResult.lyrics.verse1}\n\nESTRIBILLO:\n${generatedResult.lyrics.chorus}\n\nVERSO 2:\n${generatedResult.lyrics.verse2}\n\nPUENTE:\n${generatedResult.lyrics.bridge}\n\nFINAL:\n${generatedResult.lyrics.outro}`;
    navigator.clipboard.writeText(fullText);
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 2500);
  };

  const openWhatsAppOrder = () => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "5215500000000";
    const text = encodeURIComponent(
      `¡Hola EternIA! Deseo encargar una producción cinematográfica:\n\n*Categoría:* ${formData.category}\n*Para:* ${formData.recipientName}\n*De parte de:* ${formData.senderName || 'Familia'}\n*Estilo:* ${formData.musicStyle}\n*Título propuesto:* ${generatedResult?.title || 'Mi Historia Eterna'}\n\n¿Podemos coordinar la entrega y el envío de fotos?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="creador" className="py-20 sm:py-28 lg:py-32 relative bg-transparent overflow-hidden border-t border-[var(--glass-border)]">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium glass text-[var(--text-primary)] opacity-90 mb-3 sm:mb-4 border border-[var(--glass-border)] shadow-sm">
            <EternIALogo size={18} variant="icon" showGlow={false} />
            <span>ESTUDIO DE CREACIÓN EN VIVO</span>
          </div>
          <h2 className="serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-normal text-[var(--text-primary)] gradient-text mb-3 sm:mb-4">
            Diseña tu Canción & Película Personalizada
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
            Comparte los momentos que definen tu historia y nuestro motor de autor creará la composición musical, las estrofas poéticas y el guion cinematográfico en instantes.
          </p>
        </div>

        {/* Wizard Progress Steps Bar */}
        <div className="flex items-center justify-between max-w-xl mx-auto mb-8 sm:mb-12 relative px-2">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--glass-border)] -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-[1px] bg-[var(--text-primary)] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />

          {[
            { n: 1, label: 'Línea' },
            { n: 2, label: 'Recuerdos' },
            { n: 3, label: 'Música' },
            { n: 4, label: 'Tu Obra' }
          ].map((s) => {
            const isCompleted = step > s.n;
            const isCurrent = step === s.n;

            return (
              <div key={s.n} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-mono font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md'
                      : isCurrent
                      ? 'bg-[var(--bg-app)] border-2 border-[var(--text-primary)] text-[var(--text-primary)] scale-110 shadow-lg'
                      : 'bg-[var(--bg-app)] border border-[var(--glass-border)] text-[var(--text-muted)]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.n}
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-mono mt-1.5 sm:mt-2 ${
                    isCurrent ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Wizard Form Container */}
        <div className="rounded-[28px] sm:rounded-[40px] glass border border-[var(--glass-border)] p-5 sm:p-8 lg:p-12 shadow-2xl relative">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Select Category */}
          {step === 1 && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">Paso 01</span>
                <h3 className="serif italic text-xl sm:text-2xl text-[var(--text-primary)]">1. Selecciona la Línea EternIA</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">¿Qué instante sagrado convertiremos en arte?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {ETERNIA_CATEGORIES.map((cat) => {
                  const isSelected = formData.category === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`p-5 sm:p-6 rounded-[24px] sm:rounded-[28px] border text-left transition-all relative overflow-hidden group touch-target ${
                        isSelected
                          ? 'border-[var(--glass-border)] bg-[var(--glass-hover-bg)] ring-1 ring-[var(--glass-border)] shadow-lg'
                          : 'border-[var(--glass-border)] glass hover:bg-[var(--glass-hover-bg)]'
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{cat.emoji}</div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)] block">
                        {cat.tagline}
                      </span>
                      <h4 className="serif italic text-base sm:text-lg text-[var(--text-primary)] transition-colors mt-0.5">
                        {cat.name}
                      </h4>
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-5 sm:pt-6 border-t border-[var(--glass-border)] flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="touch-target px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-105 transition-all shadow-xl flex items-center gap-2"
                >
                  <span>Continuar a Recuerdos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Memories & Protagonists */}
          {step === 2 && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">Paso 02</span>
                <h3 className="serif italic text-xl sm:text-2xl text-[var(--text-primary)]">2. Nombres y Recuerdos Clave</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">Cuéntanos los detalles que harán la composición inolvidable.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono text-[10px]">
                    ¿Para quién es la dedicatoria? (Protagonista/s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Sofía y Mateo / Mi abuelo Rafael"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="w-full px-4 sm:px-5 py-3 rounded-full glass-input text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono text-[10px]">
                    ¿Quién dedica la obra?
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Tu prometido David / Tus hijos y nietos"
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    className="w-full px-4 sm:px-5 py-3 rounded-full glass-input text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono text-[10px]">
                  Anécdotas, momentos especiales y secretos compartidos *
                </label>
                <textarea
                  rows={4}
                  placeholder="Ej: Nos conocimos en la biblioteca de la universidad un día de lluvia torrencial. Siempre me prepara café por las mañanas. Nuestro primer viaje a París donde perdimos el tren pero encontramos nuestro restaurante favorito..."
                  value={formData.keyMoments}
                  onChange={(e) => setFormData({ ...formData, keyMoments: e.target.value })}
                  className="w-full p-4 sm:p-5 rounded-2xl sm:rounded-3xl glass-input text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none resize-none leading-relaxed font-light"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono text-[10px]">
                  Frase o mensaje que DEBE aparecer en la letra o en el video (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: “Por cincuenta años más tomados de la mano”"
                  value={formData.specialPhrases}
                  onChange={(e) => setFormData({ ...formData, specialPhrases: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 rounded-full glass-input text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none"
                />
              </div>

              <div className="pt-5 sm:pt-6 border-t border-[var(--glass-border)] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="touch-target px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.recipientName.trim()) {
                      setErrorMsg('Por favor indica para quién es la obra.');
                      return;
                    }
                    setErrorMsg('');
                    setStep(3);
                  }}
                  className="touch-target px-6 sm:px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-105 transition-all shadow-xl flex items-center gap-2"
                >
                  <span>Elegir Música</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Musical Style & Tone */}
          {step === 3 && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">Paso 03</span>
                <h3 className="serif italic text-xl sm:text-2xl text-[var(--text-primary)]">3. Dirección Sonora & Vocal</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">Define la atmósfera acústica que envolverá tu película.</p>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[var(--text-secondary)] mb-3 font-mono text-[10px]">
                  Estilo Musical Deseado:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {musicStyles.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, musicStyle: style.label })}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all touch-target ${
                        formData.musicStyle === style.label
                          ? 'border-[var(--glass-border)] bg-[var(--glass-hover-bg)] ring-1 ring-[var(--glass-border)] text-[var(--text-primary)]'
                          : 'border-[var(--glass-border)] glass text-[var(--text-secondary)] hover:bg-[var(--glass-hover-bg)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[var(--text-primary)]">{style.label}</span>
                        {formData.musicStyle === style.label && (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1 font-light">{style.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono text-[10px]">
                    Tono Emocional
                  </label>
                  <select
                    value={formData.emotionalTone}
                    onChange={(e) => setFormData({ ...formData, emotionalTone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass-input text-[var(--text-primary)] text-xs focus:outline-none bg-[var(--bg-app)]"
                  >
                    {emotionalTones.map((tone, idx) => (
                      <option key={idx} value={tone}>{tone}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-mono text-[10px]">
                    Voz Principal de la Canción
                  </label>
                  <select
                    value={formData.vocalPreference}
                    onChange={(e) => setFormData({ ...formData, vocalPreference: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-2xl glass-input text-[var(--text-primary)] text-xs focus:outline-none bg-[var(--bg-app)]"
                  >
                    <option value="dueto">Dueto Armónico (Voz Femenina + Masculina)</option>
                    <option value="femenina">Voz Femenina Cálida / Baladista</option>
                    <option value="masculina">Voz Masculina Profunda / Cantautor</option>
                    <option value="solo_instrumental">Solo Instrumental Cinematográfico</option>
                  </select>
                </div>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-[var(--glass-border)] flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="touch-target px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Atrás</span>
                </button>

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateScript}
                  className="touch-target px-6 sm:px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-105 transition-all shadow-xl flex items-center gap-2.5 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Componiendo Letra & Guion con IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generar Propuesta Cinematográfica</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Generated Result Display */}
          {step === 4 && generatedResult && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              {/* Header */}
              <div className="p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] glass border border-[var(--glass-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="hidden sm:block shrink-0 mt-0.5">
                    <EternIALogo size={42} variant="icon" showGlow={true} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block">
                      Composición Oficial EternIA
                    </span>
                    <h3 className="serif italic text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                      {generatedResult.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">
                      {generatedResult.styleDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyLyricsToClipboard}
                    className="touch-target px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider glass text-[var(--text-primary)] hover:bg-[var(--glass-hover-bg)] transition-all flex items-center gap-2 border border-[var(--glass-border)]"
                  >
                    {copiedLyrics ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLyrics ? 'Letra Copiada' : 'Copiar Letra'}</span>
                  </button>
                </div>
              </div>

              {/* Lyrics Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Lyrics Box */}
                <div className="rounded-[28px] sm:rounded-[32px] glass p-5 sm:p-8 border border-[var(--glass-border)] flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2 mb-4">
                      <Music className="w-3.5 h-3.5 text-amber-400" />
                      <span>Letra Poética de la Canción</span>
                    </h4>

                    <div className="space-y-3.5 sm:space-y-4 text-xs font-serif leading-relaxed text-[var(--text-primary)] italic max-h-96 overflow-y-auto pr-2">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-[var(--glass-border)]">
                        <span className="text-[9px] font-mono text-[var(--text-muted)] block not-italic mb-1 font-sans uppercase">VERSO 1</span>
                        <p className="whitespace-pre-line">{generatedResult.lyrics.verse1}</p>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl glass border border-[var(--glass-border)] bg-[var(--glass-hover-bg)]">
                        <span className="text-[9px] font-mono text-[var(--text-primary)] block not-italic mb-1 font-sans font-bold uppercase">ESTRIBILLO (CLÍMAX)</span>
                        <p className="whitespace-pre-line font-medium text-[var(--text-primary)]">{generatedResult.lyrics.chorus}</p>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-[var(--glass-border)]">
                        <span className="text-[9px] font-mono text-[var(--text-muted)] block not-italic mb-1 font-sans uppercase">VERSO 2</span>
                        <p className="whitespace-pre-line">{generatedResult.lyrics.verse2}</p>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-[var(--glass-border)]">
                        <span className="text-[9px] font-mono text-[var(--text-muted)] block not-italic mb-1 font-sans uppercase">PUENTE EMOCIONAL</span>
                        <p className="whitespace-pre-line">{generatedResult.lyrics.bridge}</p>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-[var(--glass-border)]">
                        <span className="text-[9px] font-mono text-[var(--text-muted)] block not-italic mb-1 font-sans uppercase">FINAL (OUTRO)</span>
                        <p className="whitespace-pre-line">{generatedResult.lyrics.outro}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storyboard Escenas */}
                <div className="rounded-[28px] sm:rounded-[32px] glass p-5 sm:p-8 border border-[var(--glass-border)] flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2 mb-4">
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span>Guion & Storyboard para el Video</span>
                    </h4>

                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 text-xs">
                      {generatedResult.storyboard.map((sc, i) => (
                        <div key={i} className="p-3.5 sm:p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-[var(--glass-border)]">
                          <div className="flex items-center justify-between text-[var(--text-secondary)] font-mono text-[10px] mb-1">
                            <span className="font-semibold uppercase tracking-wider text-[var(--text-primary)]">Escena {sc.sceneNumber || i + 1}</span>
                            <span>{sc.timecode}</span>
                          </div>
                          <p className="text-[var(--text-primary)] font-medium">{sc.visualPrompt}</p>
                          <p className="text-[var(--text-secondary)] italic text-[11px] mt-1 font-light">
                            Voz en off: “{sc.voiceover}”
                          </p>
                          <p className="text-[var(--text-muted)] text-[10px] mt-1 font-mono">
                            ♫ {sc.musicalCues}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl glass border border-[var(--glass-border)] text-[11px] text-[var(--text-secondary)] font-light">
                    <strong className="text-[var(--text-primary)] block mb-0.5 font-mono text-[10px] uppercase tracking-wider">Consejo del Director:</strong>
                    {generatedResult.creativeAdvice}
                  </div>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="pt-5 sm:pt-6 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="touch-target text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ajustar Datos o Regenerar</span>
                </button>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={openWhatsAppOrder}
                    className="touch-target w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-emerald-500" />
                    <span>Encargar Producción por WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
