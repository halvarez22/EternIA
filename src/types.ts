export type ServiceType = 'cancion' | 'video' | 'video_musicalizado';

export type EterniaCategory =
  | 'bodas'
  | 'celebraciones'
  | 'bautizos'
  | 'homenajes'
  | 'recuerdos'
  | 'historias';

export interface CategoryInfo {
  id: EterniaCategory;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  highlightTone: string;
  musicalDefaults: string;
  accentColor: string;
  bgGradient: string;
}

export interface StoryScene {
  timecode: string;
  sceneNumber?: number;
  visualPrompt: string;
  voiceover: string;
  musicalCues: string;
}

export interface FinishedStory {
  id: string;
  title: string;
  serviceType: ServiceType; // 'cancion' | 'video' | 'video_musicalizado'
  category: EterniaCategory;
  categoryLabel: string;
  categoryIcon: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl: string;
  duration: string;
  protagonists: string;
  clientQuote: string;
  synopsis: string;
  soundtrackStyle: string;
  emotionalTone: string;
  tags: string[];
  viewsCount: number;
  likesCount: number;
  lyricsSnippet?: string;
  storyboard?: StoryScene[];
  isUserUploaded?: boolean;
  uploadedAt?: string;
}

export interface StoryDraft {
  category: EterniaCategory;
  recipientName: string;
  senderName: string;
  relationship: string;
  keyMoments: string;
  musicStyle: string;
  emotionalTone: string;
  specialPhrases: string;
  vocalPreference: 'femenina' | 'masculina' | 'dueto' | 'solo_instrumental';
  deliverySpeed: 'standard' | 'express_48h' | 'vip_24h';
}

export interface GeneratedStoryResult {
  title: string;
  styleDescription: string;
  lyrics: {
    verse1: string;
    chorus: string;
    verse2: string;
    bridge: string;
    outro: string;
  };
  storyboard: StoryScene[];
  creativeAdvice: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  currency: string;
  isPopular?: boolean;
  features: string[];
  deliveryTime: string;
  revisions: string;
}
