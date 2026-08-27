import React, { useState, useRef } from 'react';
import { X, UploadCloud, Film, Music, Sparkles, CheckCircle2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { FinishedStory, EterniaCategory } from '../types';
import confetti from 'canvas-confetti';

interface VideoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryUploaded: (newStory: FinishedStory) => void;
}

export const VideoUploaderModal: React.FC<VideoUploaderModalProps> = ({
  isOpen,
  onClose,
  onStoryUploaded
}) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [videoDirectUrl, setVideoDirectUrl] = useState<string>('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EterniaCategory>('bodas');
  const [protagonists, setProtagonists] = useState('');
  const [soundtrackStyle, setSoundtrackStyle] = useState('Balada Orquestal con Piano y Cuerdas');
  const [emotionalTone, setEmotionalTone] = useState('Romántico & Solemne');
  const [clientQuote, setClientQuote] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [tags, setTags] = useState('Obra Terminada, Calidad Master 4K');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleVideoFileChange = (file: File) => {
    if (!file.type.startsWith('video/')) {
      setErrorMsg('Por favor selecciona un archivo de video válido (MP4, WebM, MOV).');
      return;
    }
    setErrorMsg('');
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);

    // Auto-generate title if empty
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleThumbnailChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona una imagen válida para la portada.');
      return;
    }
    const url = URL.createObjectURL(file);
    setThumbnailUrl(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalVideoUrl = uploadMode === 'file' ? videoPreviewUrl : videoDirectUrl;

    if (!finalVideoUrl) {
      setErrorMsg('Debes cargar un archivo de video o ingresar un enlace de video.');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Ingresa un título para la obra.');
      return;
    }

    setIsProcessing(true);

    const categoryIcons: Record<EterniaCategory, string> = {
      bodas: '💍',
      celebraciones: '🎂',
      bautizos: '✝️',
      homenajes: '🕊️',
      recuerdos: '❤️',
      historias: '✨'
    };

    const categoryLabels: Record<EterniaCategory, string> = {
      bodas: 'EternIA Bodas 💍',
      celebraciones: 'EternIA Celebraciones 🎂',
      bautizos: 'EternIA Bautizos ✝️',
      homenajes: 'EternIA Homenajes 🕊️',
      recuerdos: 'EternIA Recuerdos ❤️',
      historias: 'EternIA Historias ✨'
    };

    const newStory: FinishedStory = {
      id: `uploaded-${Date.now()}`,
      title: title.trim(),
      serviceType: 'video_musicalizado',
      category: category,
      categoryLabel: categoryLabels[category],
      categoryIcon: categoryIcons[category],
      videoUrl: finalVideoUrl,
      thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      duration: '02:50',
      protagonists: protagonists.trim() || 'Historia Personalizada',
      clientQuote: clientQuote.trim() || '“Una obra de arte inolvidable que guardaremos para toda la vida.”',
      synopsis: synopsis.trim() || 'Producción musical y cinematográfica personalizada terminada con la más alta calidad.',
      soundtrackStyle: soundtrackStyle,
      emotionalTone: emotionalTone,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      viewsCount: 1,
      likesCount: 0,
      isUserUploaded: true,
      uploadedAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setTimeout(() => {
      onStoryUploaded(newStory);
      setIsProcessing(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe confetti fallback
      }
      onClose();
    }, 600);
  };

  return (
    <div
      id="video-uploader-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-3xl rounded-[36px] glass border border-white/20 overflow-hidden shadow-2xl bg-[#050505] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-[#090909] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="serif italic text-lg sm:text-xl text-white tracking-tight">
                Cargar Video Terminado a la Galería
              </h3>
              <p className="text-xs text-white/50 font-light">
                Añade tus producciones cinematográficas para que los clientes aprecien la calidad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/30 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Upload Method Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-full glass border border-white/10">
            <button
              type="button"
              onClick={() => setUploadMode('file')}
              className={`flex-1 py-2 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                uploadMode === 'file'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Archivo Local (.mp4 / .webm)
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('url')}
              className={`flex-1 py-2 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${
                uploadMode === 'url'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Enlace Directo (URL)
            </button>
          </div>

          {/* Video Dropzone */}
          {uploadMode === 'file' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && handleVideoFileChange(e.target.files[0])}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleVideoFileChange(e.dataTransfer.files[0]);
                }}
                className={`border border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                  videoPreviewUrl
                    ? 'border-white/40 bg-white/[0.04]'
                    : 'border-white/20 hover:border-white/40 glass'
                }`}
              >
                {videoPreviewUrl ? (
                  <div className="flex flex-col items-center gap-3">
                    <video
                      src={videoPreviewUrl}
                      className="w-full max-w-sm rounded-2xl aspect-video object-cover border border-white/10"
                      controls
                    />
                    <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>{videoFile?.name || 'Video cargado correctamente'}</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 underline">
                      Haz clic para cambiar de archivo
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2.5 py-4">
                    <Film className="w-8 h-8 text-white/60" />
                    <p className="font-medium text-white text-sm">
                      Arrastra tu video terminado aquí o haz clic para explorar
                    </p>
                    <p className="text-[11px] font-mono text-white/40">
                      Formatos compatibles: MP4, WebM, MOV (Hasta 500MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                URL del Video (MP4 / Streaming directo)
              </label>
              <input
                type="url"
                placeholder="https://ejemplo.com/videos/mi-boda-4k.mp4"
                value={videoDirectUrl}
                onChange={(e) => setVideoDirectUrl(e.target.value)}
                className="w-full px-5 py-3 rounded-full glass-input text-white text-xs placeholder:text-white/30 focus:outline-none"
              />
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Título de la Obra *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: El Sí Quiero de Sofía & Mateo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-2.5 rounded-full glass-input text-white text-xs placeholder:text-white/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Línea EternIA *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EterniaCategory)}
                className="w-full px-5 py-2.5 rounded-full glass-input text-white text-xs focus:outline-none bg-[#090909]"
              >
                <option value="bodas">Eternia Bodas 💍</option>
                <option value="celebraciones">Eternia Celebraciones 🎂</option>
                <option value="bautizos">Eternia Bautizos ✝️</option>
                <option value="homenajes">Eternia Homenajes 🕊️</option>
                <option value="recuerdos">Eternia Recuerdos ❤️</option>
                <option value="historias">Eternia Historias ✨</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Protagonistas / Ciudad
              </label>
              <input
                type="text"
                placeholder="Ej: Lucía & Carlos (Madrid)"
                value={protagonists}
                onChange={(e) => setProtagonists(e.target.value)}
                className="w-full px-5 py-2.5 rounded-full glass-input text-white text-xs placeholder:text-white/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Estilo Musical
              </label>
              <input
                type="text"
                placeholder="Ej: Balada Orquestal con Cuerdas"
                value={soundtrackStyle}
                onChange={(e) => setSoundtrackStyle(e.target.value)}
                className="w-full px-5 py-2.5 rounded-full glass-input text-white text-xs placeholder:text-white/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Atmósfera Emocional
              </label>
              <input
                type="text"
                placeholder="Ej: Romántico, Solemne, Alegre"
                value={emotionalTone}
                onChange={(e) => setEmotionalTone(e.target.value)}
                className="w-full px-5 py-2.5 rounded-full glass-input text-white text-xs placeholder:text-white/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Imagen de Portada (Opcional)
              </label>
              <input
                ref={thumbInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleThumbnailChange(e.target.files[0])}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => thumbInputRef.current?.click()}
                className="w-full px-5 py-2.5 rounded-full glass-input text-white/70 text-xs flex items-center justify-between hover:border-white/40"
              >
                <span className="truncate">{thumbnailUrl ? 'Portada Seleccionada' : 'Subir imagen miniatura'}</span>
                <ImageIcon className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
              Sinopsis de la Historia
            </label>
            <textarea
              rows={2}
              placeholder="Describe brevemente la narrativa, los recuerdos o los votos que se plasmaron en esta obra..."
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="w-full p-4 rounded-2xl glass-input text-white text-xs placeholder:text-white/30 focus:outline-none resize-none font-light"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-2">
              Testimonio o Cita del Cliente
            </label>
            <input
              type="text"
              placeholder="“No pudimos contener las lágrimas al ver el resultado...”"
              value={clientQuote}
              onChange={(e) => setClientQuote(e.target.value)}
              className="w-full px-5 py-2.5 rounded-full glass-input text-white text-xs placeholder:text-white/30 focus:outline-none font-light"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:scale-105 transition-all shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Publicando...' : 'Publicar en la Galería'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
