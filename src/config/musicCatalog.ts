export interface MusicStyle {
  id: string;
  label: string;
  desc: string;
  emoji: string;
  url: string;
}

export const MUSIC_STYLES: MusicStyle[] = [
  { id: 'acustico', label: 'Acústico', desc: 'Fresco, cercano y lleno de luz', emoji: '🎵', url: '/audio/samples/acustico.mp3' },
  { id: 'baile-boda', label: 'Baile de Boda', desc: 'Romántico y perfecto para el primer baile', emoji: '💃', url: '/audio/samples/baile_boda.mp3' },
  { id: 'balada-pop-hombre', label: 'Balada Pop (Hombre)', desc: 'Voz masculina emotiva y moderna', emoji: '🎤', url: '/audio/samples/balada_pop_hombre.mp3' },
  { id: 'balada-pop-mujer', label: 'Balada Pop (Mujer)', desc: 'Voz femenina dulce y poderosa', emoji: '🎤', url: '/audio/samples/balada_pop_mujer.mp3' },
  { id: 'balada-ranchera', label: 'Balada Ranchera', desc: 'Sentimiento profundo con toque regional', emoji: '🎸', url: '/audio/samples/balada_ranchera.mp3' },
  { id: 'banda', label: 'Banda', desc: 'Alegre, festivo y tradicional', emoji: '🎺', url: '/audio/samples/banda.mp3' },
  { id: 'blues', label: 'Blues', desc: 'Melancólico, profundo y con alma', emoji: '🎹', url: '/audio/samples/blues.mp3' },
  { id: 'cumbia', label: 'Cumbia', desc: 'Ritmo tropical para bailar y celebrar', emoji: '🥁', url: '/audio/samples/cumbia.mp3' },
  { id: 'cumpleanos', label: 'Cumpleaños', desc: 'Festivo y lleno de buenos deseos', emoji: '🎂', url: '/audio/samples/cumpleanos.mp3' },
  { id: 'funeral', label: 'Funeral', desc: 'Solemne, respetuoso y sanador', emoji: '🕊️', url: '/audio/samples/funeral.mp3' },
  { id: 'heavy-metal', label: 'Heavy Metal', desc: 'Energía pura, guitarras y fuerza', emoji: '🤘', url: '/audio/samples/heavy_metal.mp3' },
  { id: 'iglesia', label: 'Iglesia', desc: 'Música sacra, coral y espiritual', emoji: '⛪', url: '/audio/samples/iglesia.mp3' },
  { id: 'infantil', label: 'Infantil', desc: 'Alegre, inocente y muy divertido', emoji: '🧸', url: '/audio/samples/infantil.mp3' },
  { id: 'jazz', label: 'Jazz', desc: 'Elegante, nocturno y sofisticado', emoji: '🎷', url: '/audio/samples/jazz.mp3' },
  { id: 'regueton', label: 'Reguetón', desc: 'Ritmo urbano moderno y pegadizo', emoji: '🕺', url: '/audio/samples/regueton.mp3' },
  { id: 'tango', label: 'Tango', desc: 'Pasional, dramático y clásico', emoji: '💃', url: '/audio/samples/tango.mp3' },
  { id: 'opera', label: 'Ópera', desc: 'Voces magistrales y dramatismo lírico', emoji: '🎭', url: '/audio/samples/opera.mp3' },
];
