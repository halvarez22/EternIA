import React, { useState, useRef, useEffect } from 'react';
import { FinishedStory, ServiceType } from '../types';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Heart, Share2, Music, Check, Film, ArrowRight, Disc, Layers } from 'lucide-react';
import { EternIALogo } from './EternIALogo';

interface VideoPlayerModalProps {
  story: FinishedStory | null;
  onClose: () => void;
  onRequestSimilar: (story: FinishedStory) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  story,
  onClose,
  onRequestSimilar
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'lyrics' | 'storyboard'>('info');
  const [isCopied, setIsCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const isSongOnly = story?.serviceType === 'cancion';

  useEffect(() => {
    if (story) {
      if (isSongOnly && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
      setIsPlaying(true);
    }
  }, [story, isSongOnly]);

  if (!story) return null;

  const togglePlay = () => {
    const mediaEl = isSongOnly ? audioRef.current : videoRef.current;
    if (!mediaEl) return;

    if (isPlaying) {
      mediaEl.pause();
      setIsPlaying(false);
    } else {
      mediaEl.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const mediaEl = isSongOnly ? audioRef.current : videoRef.current;
    if (!mediaEl) return;
    mediaEl.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const mediaEl = isSongOnly ? audioRef.current : videoRef.current;
    if (mediaEl) {
      setCurrentTime(mediaEl.currentTime);
      setDuration(mediaEl.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const mediaEl = isSongOnly ? audioRef.current : videoRef.current;
    if (mediaEl) {
      mediaEl.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const serviceBadgeConfig = {
    cancion: { label: '🎵 Canción a la Medida', bg: 'bg-amber-400/20 text-amber-300 border-amber-400/30' },
    video: { label: '🎬 Video a la Medida', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    };

  const currentBadge = serviceBadgeConfig[story.serviceType || 'cancion'];

  return (
    <div
      id="video-player-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-5xl rounded-[36px] glass border border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] bg-[#050505]">
        {/* Modal Top Bar */}
        <div className="px-6 sm:px-8 py-5 bg-[#090909] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <span className="text-xl">{story.categoryIcon}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="serif italic text-lg sm:text-xl text-white tracking-tight">
                  {story.title}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${currentBadge.bg}`}>
                  {currentBadge.label}
                </span>
                {story.isUserUploaded && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-white/10 text-white/90 border border-white/20">
                    Cargado en Portal
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50 font-light">{story.protagonists}</p>
            </div>
          </div>

          <button
            id="btn-close-video-modal"
            onClick={onClose}
            aria-label="Cerrar reproductor"
            className="w-9 h-9 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/30 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video / Audio Area + Details Layout */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto">
          {/* Main Player Screen Container */}
          <div className="lg:w-3/5 bg-black flex flex-col justify-center relative group/video">
            {isSongOnly ? (
              /* Song Acoustic Audio Experience */
              <div className="relative aspect-video w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#141012] to-[#080808] p-6 text-center overflow-hidden">
                <audio
                  ref={audioRef}
                  src={story.audioUrl || story.videoUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Vinyl Album art turntable visual */}
                <div className="relative mb-4">
                  <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-amber-400/30 overflow-hidden shadow-2xl relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
                    <img
                      src={story.thumbnailUrl}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 z-10">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono uppercase tracking-widest border border-amber-400/30">
                    Master de Audio Acústico
                  </span>
                  <h4 className="text-white font-bold text-base serif italic mt-2">{story.title}</h4>
                  <p className="text-white/60 text-xs">{story.soundtrackStyle}</p>
                </div>

                {/* Center Play/Pause button */}
                <button
                  onClick={togglePlay}
                  className="mt-4 px-6 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                  <span>{isPlaying ? 'Pausar Canción' : 'Reproducir Canción'}</span>
                </button>
              </div>
            ) : (
              /* Video Player */
              <div className="relative aspect-video w-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={story.videoUrl}
                  poster={story.thumbnailUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  playsInline
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Official EternIA Watermark Stamp */}
                <div className="absolute top-4 left-4 pointer-events-none z-10 opacity-75 group-hover/video:opacity-90 transition-opacity">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <EternIALogo size={18} variant="icon" showGlow={false} />
                    <span className="text-[10px] font-semibold text-white tracking-widest uppercase">EternIA</span>
                  </div>
                </div>

                {/* Big Center Play Overlay when paused */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                )}
              </div>
            )}

            {/* Custom Controls Bar */}
            <div className="p-4 bg-[#090909] border-t border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/70">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-white/50" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-white/50">
                    {formatTime(currentTime)} / {formatTime(duration || 165)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs transition-all font-mono cursor-pointer ${
                      liked
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'glass border-white/10 text-white/70 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
                    <span>{story.likesCount + (liked ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/10 text-xs text-white/70 hover:text-white font-mono uppercase tracking-wider text-[10px] cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                    <span>{isCopied ? 'Copiado' : 'Compartir'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Info & Lyrics Panel */}
          <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#050505]">
            <div>
              {/* Tab Selector */}
              <div className="flex items-center gap-1 p-1 rounded-full glass border border-white/10 mb-6">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'info'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Ficha
                </button>
                <button
                  onClick={() => setActiveTab('lyrics')}
                  className={`flex-1 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'lyrics'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Letra
                </button>
                <button
                  onClick={() => setActiveTab('storyboard')}
                  className={`flex-1 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'storyboard'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Producción
                </button>
              </div>

              {/* Tab Content 1: Information */}
              {activeTab === 'info' && (
                <div className="space-y-5 animate-fade-in text-sm">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                      La Historia
                    </span>
                    <p className="text-white/80 font-light leading-relaxed">
                      {story.synopsis}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl glass border border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">Testimonio:</span>
                    <p className="serif italic text-xs sm:text-sm text-white/90 font-light">
                      “{story.clientQuote}”
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-[#090909] border border-white/5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block">Estilo Musical:</span>
                      <span className="text-xs font-medium text-white flex items-center gap-1.5 mt-1">
                        <Music className="w-3 h-3 text-amber-400" />
                        {story.soundtrackStyle}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#090909] border border-white/5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 block">Atmósfera:</span>
                      <span className="text-xs font-medium text-white flex items-center gap-1.5 mt-1">
                        <Heart className="w-3 h-3 text-rose-400" />
                        {story.emotionalTone}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {(story.tags || []).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-[10px] font-mono text-white/60 glass border border-white/10 uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content 2: Lyrics */}
              {activeTab === 'lyrics' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/60">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Letra de la Canción Original</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#090909] border border-white/10 max-h-60 overflow-y-auto font-serif text-xs leading-relaxed text-white/80 whitespace-pre-line italic">
                    {story.lyricsSnippet ||
                      `En cada paso que dimos juntos, el tiempo pareció detenerse.\nAquellas miradas que guardan mil promesas no se desvanecen jamás.\n\nPorque hay momentos que merecen vivir para siempre,\nhistorias que el universo no puede apagar.\nEres la luz que ilumina este viaje,\nun lazo eterno que nada podrá quebrar.`}
                  </div>
                  <p className="text-[10px] font-mono text-white/40">
                    * Cada letra es orquestada exclusivamente a partir de tus anécdotas, nombres y fechas reales.
                  </p>
                </div>
              )}

              {/* Tab Content 3: Storyboard / Production */}
              {activeTab === 'storyboard' && (
                <div className="space-y-3 animate-fade-in max-h-64 overflow-y-auto pr-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                    Escaleta de Producción
                  </span>
                  {(story.storyboard || [
                    { timecode: '00:00 - 00:20', visualPrompt: 'Apertura con luz cálida y primeros recuerdos.', voiceover: 'Donde nace una historia eterna...', musicalCues: 'Intro de piano solista' },
                    { timecode: '00:20 - 01:30', visualPrompt: 'Nudo emotivo con fotos restauradas y armonía sonora.', voiceover: 'Cada instante juntos forjó este lazo.', musicalCues: 'Crescendo de cuerdas' },
                    { timecode: '01:30 - 02:45', visualPrompt: 'Clímax y dedicatoria final grabada a perpetuidad.', voiceover: 'Por siempre en nuestra alma.', musicalCues: 'Resolución orquestal' },
                  ]).map((sc, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-[#090909] border border-white/5 text-xs">
                      <div className="flex items-center justify-between text-white/70 font-mono text-[10px] mb-1">
                        <span className="font-semibold uppercase tracking-wider text-amber-300">Escena 0{i + 1}</span>
                        <span>{sc.timecode}</span>
                      </div>
                      <p className="text-white font-medium">{sc.visualPrompt}</p>
                      <p className="text-white/50 italic mt-1 text-[11px] font-light">“{sc.voiceover}”</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Modal CTA */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2">
              <button
                id="btn-modal-request-similar"
                onClick={() => {
                  onClose();
                  onRequestSimilar(story);
                }}
                className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quiero una Obra similar para mi historia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

