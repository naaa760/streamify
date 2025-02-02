"use client";

import { createContext, useContext, useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playlist: Song[];
  playSong: (song: Song) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaylist: (songs: Song[]) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playNext = () => {
    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong?.id
    );
    if (currentIndex < playlist.length - 1) {
      playSong(playlist[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong?.id
    );
    if (currentIndex > 0) {
      playSong(playlist[currentIndex - 1]);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlist,
        playSong,
        setIsPlaying,
        setPlaylist,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
