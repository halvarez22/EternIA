import { useState, useRef, useEffect } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = async (styleId: string, previewUrl: string) => {
    // If clicking the same track that is currently playing, pause it
    if (isPlaying === styleId) {
      audioRef.current?.pause();
      setIsPlaying(null);
      return;
    }

    // Stop current track if any
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsLoading(styleId);
    try {
      const audio = new Audio();
      audio.preload = 'metadata'; // Lazy loading requirement
      audio.src = previewUrl;
      
      // We set it early so onended can be bound
      audio.onended = () => {
        setIsPlaying(null);
      };
      
      audioRef.current = audio;
      
      await audio.load();
      await audio.play();
      
      setIsPlaying(styleId);
    } catch (error) {
      console.error('Error playing audio preview:', error);
      // In a real app we might show an error toast here
    } finally {
      setIsLoading(null);
    }
  };

  return { play, isPlaying, isLoading };
};
