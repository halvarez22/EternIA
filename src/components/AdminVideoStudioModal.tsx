import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  Film, 
  Sparkles, 
  CheckCircle2, 
  Image as ImageIcon, 
  AlertCircle, 
  Star, 
  Trash2, 
  Edit3, 
  Lock, 
  LogOut, 
  Play, 
  ShieldCheck, 
  PlusCircle, 
  Eye,
  Check,
  Music,
  Disc,
  Layers,
  Volume2
} from 'lucide-react';
import { FinishedStory, EterniaCategory, ServiceType } from '../types';
import { ETERNIA_CATEGORIES } from '../data/mockStories';
import { EternIALogo } from './EternIALogo';
import confetti from 'canvas-confetti';

interface AdminVideoStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
  stories: FinishedStory[];
  featuredStoryId: string;
  onSetFeaturedStory: (storyId: string) => void;
  onStoryUploaded: (newStory: FinishedStory, setAsFeatured?: boolean) => void;
  onDeleteStory: (storyId: string) => void;
  onUpdateStory: (updatedStory: FinishedStory) => void;
}

export const AdminVideoStudioModal: React.FC<AdminVideoStudioModalProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLogin,
  onLogout,
  stories,
  featuredStoryId,
  onSetFeaturedStory,
  onStoryUploaded,
  onDeleteStory,
  onUpdateStory
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('manage');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form Fields for new upload
  const [serviceType, setServiceType] = useState<ServiceType>('cancion');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('url');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop');
  const [mediaDirectUrl, setMediaDirectUrl] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EterniaCategory>('bodas');
  const [protagonists, setProtagonists] = useState('');
  const [soundtrackStyle, setSoundtrackStyle] = useState('Balada Orquestal con Piano y Cuerdas');
  const [emotionalTone, setEmotionalTone] = useState('Romántico & Solemne');
  const [clientQuote, setClientQuote] = useState('');
  const [duration, setDuration] = useState('02:45');
  const [lyricsSnippet, setLyricsSnippet] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [setAsFeaturedOnUpload, setSetAsFeaturedOnUpload] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [uploadErrorMsg, setUploadErrorMsg] = useState('');
  const [manageFilter, setManageFilter] = useState<'all' | 'cancion' | 'video'>('all');

  // Edit Story State
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editQuote, setEditQuote] = useState('');
  const [editCategory, setEditCategory] = useState<EterniaCategory>('bodas');
  const [editMediaUrl, setEditMediaUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAttemptLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = onLogin(passwordInput);
    if (!success) {
      setLoginError('Contraseña incorrecta. (Prueba con "eternia" o usa el botón de acceso rápido)');
    }
  };

  const handleMediaFileChange = (file: File) => {
    setUploadErrorMsg('');
    setMediaFile(file);
    const url = URL.createObjectURL(file);
    setMediaPreviewUrl(url);

    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMediaUrl = uploadMode === 'file' ? mediaPreviewUrl : mediaDirectUrl;

    if (!finalMediaUrl) {
      setUploadErrorMsg('Ingresa un enlace de audio/video o carga un archivo local.');
      return;
    }

    if (!title.trim()) {
      setUploadErrorMsg('El título de la obra es obligatorio.');
      return;
    }

    setIsProcessing(true);
    setUploadErrorMsg('');

    const catObj = ETERNIA_CATEGORIES.find(c => c.id === category) || ETERNIA_CATEGORIES[0];

    const serviceTags: Record<ServiceType, string> = {
      cancion: 'Canción a la Medida',
      video: 'Video a la Medida',
      
    };

    const newStory: FinishedStory = {
      id: `story-${Date.now()}`,
      title: title.trim(),
      serviceType: serviceType,
      category: category,
      categoryLabel: `${catObj.name} ${catObj.emoji}`,
      categoryIcon: catObj.emoji,
      videoUrl: serviceType === 'cancion' ? undefined : finalMediaUrl,
      audioUrl: serviceType === 'cancion' ? finalMediaUrl : undefined,
      thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      duration: duration || '02:30',
      protagonists: protagonists.trim() || 'Protagonistas de la Historia',
      clientQuote: clientQuote.trim() || '“Un homenaje sonoro y visual que tocó las fibras más profundas de nuestra familia.”',
      synopsis: synopsis.trim() || 'Obra artística personalizada producida a la medida por EternIA.',
      soundtrackStyle: soundtrackStyle,
      emotionalTone: emotionalTone,
      lyricsSnippet: lyricsSnippet.trim() || undefined,
      tags: [serviceTags[serviceType], 'Calidad Master', catObj.name],
      viewsCount: 1,
      likesCount: 0,
      isUserUploaded: true,
      uploadedAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setTimeout(() => {
      onStoryUploaded(newStory, setAsFeaturedOnUpload && serviceType !== 'cancion');
      setIsProcessing(false);
      setUploadSuccessMsg(`¡${serviceTags[serviceType]} "${newStory.title}" publicada con éxito en la landing page!`);
      
      // Reset form
      setTitle('');
      setProtagonists('');
      setClientQuote('');
      setLyricsSnippet('');
      setMediaFile(null);
      setMediaPreviewUrl('');
      setActiveTab('manage');

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe confetti fallback
      }
    }, 400);
  };

  const startEditStory = (story: FinishedStory) => {
    setEditingStoryId(story.id);
    setEditTitle(story.title);
    setEditQuote(story.clientQuote);
    setEditCategory(story.category);
    setEditMediaUrl(story.videoUrl || story.audioUrl || '');
  };

  const saveEditStory = (story: FinishedStory) => {
    const catObj = ETERNIA_CATEGORIES.find(c => c.id === editCategory) || ETERNIA_CATEGORIES[0];
    const updated: FinishedStory = {
      ...story,
      title: editTitle.trim() || story.title,
      clientQuote: editQuote.trim() || story.clientQuote,
      category: editCategory,
      categoryLabel: `${catObj.name} ${catObj.emoji}`,
      categoryIcon: catObj.emoji,
      videoUrl: story.serviceType === 'cancion' ? undefined : (editMediaUrl.trim() || story.videoUrl),
      audioUrl: story.serviceType === 'cancion' ? (editMediaUrl.trim() || story.audioUrl) : undefined,
    };
    onUpdateStory(updated);
    setEditingStoryId(null);
  };

  const filteredStoriesForAdmin = stories.filter(s => {
    if (manageFilter === 'all') return true;
    return s.serviceType === manageFilter;
  });

  return (
    <div
      id="admin-video-studio-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-4xl rounded-[32px] sm:rounded-[40px] glass border border-white/20 overflow-hidden shadow-2xl bg-[var(--modal-bg)] flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[var(--glass-border)] flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full glass border border-[var(--glass-border)] flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="serif italic text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  Estudio de Administración de Canciones & Videos
                </h3>
                {isAdminLoggedIn && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] uppercase font-mono tracking-widest font-bold">
                    Autorizado
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-light">
                {isAdminLoggedIn
                  ? 'Carga y gestiona Canciones a la Medida, Videos y Videos Musicalizados para la Landing Page'
                  : 'Ingreso exclusivo para administradores y creadores autorizados de EternIA'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="w-9 h-9 rounded-full glass border border-[var(--glass-border)] text-[var(--text-primary)] opacity-70 hover:opacity-100 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Not Logged In View: Login Screen */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="p-4 rounded-full glass border border-amber-400/30 text-amber-400">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl serif italic font-bold text-[var(--text-primary)]">
                Acceso al Portal de Creación
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Ingresa para cargar canciones a la medida, videos y videos musicalizados que se exhibirán a los clientes en la landing page.
              </p>
            </div>

            <form onSubmit={handleAttemptLogin} className="w-full space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase tracking-wider font-mono opacity-70">
                  Clave de Acceso
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Introduce la clave de estudio..."
                  className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-amber-400"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-xs uppercase tracking-widest hover:scale-102 transition-all shadow-lg cursor-pointer"
              >
                Ingresar al Estudio
              </button>

              <button
                type="button"
                onClick={() => onLogin('eternia')}
                className="w-full py-2.5 rounded-full glass border border-[var(--glass-border)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-amber-400/50 transition-all font-mono cursor-pointer"
              >
                ✨ Acceso Rápido de Demostración
              </button>
            </form>
          </div>
        ) : (
          /* Authorized Studio Management View */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Studio Navigation Tabs & Actions */}
            <div className="px-6 sm:px-8 py-3 border-b border-[var(--glass-border)] bg-black/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'manage'
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md'
                      : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Obras Publicadas ({stories.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'upload'
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md'
                      : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Cargar Canción o Video</span>
                </button>
              </div>

              <button
                onClick={onLogout}
                className="px-3.5 py-1.5 rounded-full glass border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {uploadSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{uploadSuccessMsg}</span>
                  </div>
                  <button
                    onClick={() => setUploadSuccessMsg('')}
                    className="text-emerald-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* TAB 1: Manage Existing Works (Songs & Videos) */}
              {activeTab === 'manage' && (
                <div className="space-y-6">
                  {/* Filter by service type in admin */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass border border-[var(--glass-border)]">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Filtrar:</span>
                      <button
                        onClick={() => setManageFilter('all')}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          manageFilter === 'all' ? 'bg-amber-400 text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
                        }`}
                      >
                        Todos ({stories.length})
                      </button>
                      <button
                        onClick={() => setManageFilter('cancion')}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          manageFilter === 'cancion' ? 'bg-amber-400 text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
                        }`}
                      >
                        🎵 Canciones ({stories.filter(s => s.serviceType === 'cancion').length})
                      </button>
                      <button
                        onClick={() => setManageFilter('video')}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          manageFilter === 'video' ? 'bg-amber-400 text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
                        }`}
                      >
                        🎬 Videos ({stories.filter(s => s.serviceType === 'video').length})
                      </button>
                      <button
                        onClick={() => setManageFilter('video_musicalizado')}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          manageFilter === 'video_musicalizado' ? 'bg-amber-400 text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
                        }`}
                      >
                        ✨ Videos Musicalizados ({stories.filter(s => s.serviceType === 'video_musicalizado').length})
                      </button>
                    </div>
                  </div>

                  {/* Stories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredStoriesForAdmin.map((story) => {
                      const isFeatured = story.id === featuredStoryId;
                      const isEditing = editingStoryId === story.id;
                      const isSong = story.serviceType === 'cancion';

                      return (
                        <div
                          key={story.id}
                          className={`p-4 rounded-2xl glass border transition-all ${
                            isFeatured
                              ? 'border-amber-400/80 bg-amber-500/5 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/40'
                              : 'border-[var(--glass-border)]'
                          }`}
                        >
                          <div className="flex gap-3.5">
                            {/* Thumbnail */}
                            <div className="w-28 h-20 rounded-xl overflow-hidden bg-black/40 relative shrink-0 border border-[var(--glass-border)]">
                              <img
                                src={story.thumbnailUrl}
                                alt={story.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/80 text-[8px] font-mono text-white flex items-center gap-1">
                                {isSong ? '🎵 Canción' : story.serviceType === 'video' ? '🎬 Video' : '✨ Dual'}
                              </div>
                              {isFeatured && (
                                <div className="absolute bottom-1 right-1 p-1 rounded-full bg-amber-400 text-black shadow-md" title="Hero Principal">
                                  <Star className="w-3 h-3 fill-black" />
                                </div>
                              )}
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                {isEditing ? (
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={editTitle}
                                      onChange={(e) => setEditTitle(e.target.value)}
                                      className="w-full px-2.5 py-1 rounded-lg glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] font-bold"
                                      placeholder="Título de la obra"
                                    />
                                    <input
                                      type="text"
                                      value={editQuote}
                                      onChange={(e) => setEditQuote(e.target.value)}
                                      className="w-full px-2.5 py-1 rounded-lg glass border border-[var(--glass-border)] text-[10px] text-[var(--text-secondary)] italic"
                                      placeholder="Cita del cliente"
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => saveEditStory(story)}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black text-[10px] font-bold flex items-center gap-1"
                                      >
                                        <Check className="w-3 h-3" /> Guardar
                                      </button>
                                      <button
                                        onClick={() => setEditingStoryId(null)}
                                        className="px-2 py-1 rounded-lg glass text-[10px] text-[var(--text-secondary)]"
                                      >
                                        Cancelar
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex items-start justify-between gap-1">
                                      <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                                        {story.title}
                                      </h4>
                                    </div>
                                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 italic mt-0.5">
                                      "{story.clientQuote}"
                                    </p>
                                    <span className="text-[9px] font-mono opacity-60 mt-1 block">
                                      {story.duration} • {story.categoryLabel}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Action Buttons */}
                              {!isEditing && (
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--glass-border)]">
                                  {!isSong && (
                                    isFeatured ? (
                                      <span className="px-2.5 py-1 rounded-full bg-amber-400 text-black text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-black" /> Hero Actual
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          onSetFeaturedStory(story.id);
                                          setUploadSuccessMsg(`"${story.title}" ahora es la obra estelar del Hero principal.`);
                                        }}
                                        className="px-2.5 py-1 rounded-full glass hover:border-amber-400 text-amber-400 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                                      >
                                        <Star className="w-3 h-3" /> Fijar en Hero
                                      </button>
                                    )
                                  )}

                                  <button
                                    onClick={() => startEditStory(story)}
                                    title="Editar información"
                                    className="p-1.5 rounded-full glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all ml-auto cursor-pointer"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (window.confirm(`¿Deseas eliminar "${story.title}" de la galería?`)) {
                                        onDeleteStory(story.id);
                                      }
                                    }}
                                    title="Eliminar obra"
                                    className="p-1.5 rounded-full glass text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: Upload New Finished Piece (Songs, Videos, or Dual Works) */}
              {activeTab === 'upload' && (
                <form onSubmit={handleCreateSubmit} className="space-y-6">
                  {uploadErrorMsg && (
                    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{uploadErrorMsg}</span>
                    </div>
                  )}

                  {/* Service Type Selection (3 Pillars) */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                      Selecciona el Tipo de Servicio a Cargar *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setServiceType('cancion');
                          setSoundtrackStyle('Acústico con Guitarra y Voz de Estudio');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          serviceType === 'cancion'
                            ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                            : 'glass border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Music className="w-4 h-4 text-amber-400" />
                          <span className="text-[9px] font-mono uppercase tracking-wider opacity-70">Pilar 01</span>
                        </div>
                        <p className="text-xs font-bold text-[var(--text-primary)]">Canción a la Medida</p>
                        <p className="text-[10px] text-[var(--text-secondary)] mt-1">Audio / Master sonoro con lírica personalizada</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setServiceType('video');
                          setSoundtrackStyle('Edición de Video Cinematográfico');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          serviceType === 'video'
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                            : 'glass border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Film className="w-4 h-4 text-cyan-400" />
                          <span className="text-[9px] font-mono uppercase tracking-wider opacity-70">Pilar 02</span>
                        </div>
                        <p className="text-xs font-bold text-[var(--text-primary)]">Video a la Medida</p>
                        <p className="text-[10px] text-[var(--text-secondary)] mt-1">Montaje cinematográfico con fotos y videos</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setServiceType('video_musicalizado');
                          setSoundtrackStyle('Balada Orquestal con Piano y Cuerdas');
                        }}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          serviceType === 'video_musicalizado'
                            ? 'bg-gradient-to-r from-amber-400/20 to-pink-500/20 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                            : 'glass border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span className="text-[9px] font-mono uppercase tracking-wider opacity-70">Pilar 03 ★</span>
                        </div>
                        <p className="text-xs font-bold text-[var(--text-primary)]">Video Musicalizado</p>
                        <p className="text-[10px] text-[var(--text-secondary)] mt-1">Obra dual completa: Canción + Video sincronizados</p>
                      </button>
                    </div>
                  </div>

                  {/* Mode Selector (URL or File) */}
                  <div className="flex items-center gap-2 p-1 rounded-full glass border border-[var(--glass-border)] max-w-sm">
                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`flex-1 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        uploadMode === 'url'
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      Enlace Directo (URL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`flex-1 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        uploadMode === 'file'
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      Subir Archivo Local ({serviceType === 'cancion' ? 'Audio MP3/WAV' : 'Video MP4'})
                    </button>
                  </div>

                  {/* Media Input */}
                  {uploadMode === 'url' ? (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider opacity-80">
                        {serviceType === 'cancion'
                          ? 'URL del Audio Master (MP3 / WAV / Streaming)'
                          : 'URL del Video Final (MP4 / WebM)'}
                      </label>
                      <input
                        type="url"
                        value={mediaDirectUrl}
                        onChange={(e) => setMediaDirectUrl(e.target.value)}
                        placeholder={
                          serviceType === 'cancion'
                            ? 'https://tudominio.com/cancion-a-la-medida.mp3'
                            : 'https://tudominio.com/video-promocional.mp4'
                        }
                        className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[var(--glass-border)] hover:border-amber-400/60 rounded-3xl p-6 text-center cursor-pointer glass transition-all"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={serviceType === 'cancion' ? 'audio/mp3,audio/wav,audio/mpeg,audio/aac' : 'video/mp4,video/webm,video/quicktime'}
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleMediaFileChange(e.target.files[0])}
                      />
                      <UploadCloud className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                      <p className="text-xs font-bold text-[var(--text-primary)]">
                        {mediaFile ? mediaFile.name : `Haz clic para seleccionar el archivo de ${serviceType === 'cancion' ? 'audio' : 'video'}`}
                      </p>
                      <p className="text-[10px] text-[var(--text-secondary)] font-mono mt-1">
                        Formatos soportados: {serviceType === 'cancion' ? 'MP3, WAV, AAC' : 'MP4, WebM, MOV'}
                      </p>
                    </div>
                  )}

                  {/* Category & Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider opacity-80">
                        Categoría / Ocasión
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as EterniaCategory)}
                        className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-400"
                      >
                        {ETERNIA_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-neutral-900 text-white">
                            {cat.emoji} {cat.name} ({cat.tagline})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider opacity-80">
                        Título de la Obra *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej. El Vals de Valentina & Sebastián"
                        className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Style & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider opacity-80">
                        Estilo Musical o Técnico
                      </label>
                      <input
                        type="text"
                        value={soundtrackStyle}
                        onChange={(e) => setSoundtrackStyle(e.target.value)}
                        placeholder="Ej. Balada Pop con Guitarra Acústica y Cuerdas"
                        className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider opacity-80">
                        Duración (Minutos:Segundos)
                      </label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="03:15"
                        className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Lyrics / Quote Snippet */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider opacity-80">
                      Fragmento de la Letra o Cita del Cliente
                    </label>
                    <input
                      type="text"
                      value={lyricsSnippet || clientQuote}
                      onChange={(e) => {
                        setLyricsSnippet(e.target.value);
                        setClientQuote(e.target.value);
                      }}
                      placeholder="Ej. “Cruzamos diez mil kilómetros por un abrazo, hoy toda la distancia cabe en tu mano...”"
                      className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Thumbnail Image URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider opacity-80">
                      Imagen de Portada (URL)
                    </label>
                    <input
                      type="url"
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-3 rounded-2xl glass border border-[var(--glass-border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  {/* Option to set directly as Featured Hero Promo (for videos/musicalized) */}
                  {serviceType !== 'cancion' && (
                    <div 
                      className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between cursor-pointer" 
                      onClick={() => setSetAsFeaturedOnUpload(!setAsFeaturedOnUpload)}
                    >
                      <div className="flex items-center gap-3">
                        <Star className={`w-5 h-5 ${setAsFeaturedOnUpload ? 'fill-amber-400 text-amber-400' : 'text-neutral-500'}`} />
                        <div>
                          <p className="text-xs font-bold text-[var(--text-primary)]">
                            Fijar inmediatamente como el video promo principal del Hero
                          </p>
                          <p className="text-[10px] text-[var(--text-secondary)]">
                            Reemplazará el video de portada actual en la página de inicio.
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={setAsFeaturedOnUpload}
                        onChange={(e) => setSetAsFeaturedOnUpload(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('manage')}
                      className="px-6 py-3 rounded-full glass text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-8 py-3 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Guardando...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Publicar en la Landing Page</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

