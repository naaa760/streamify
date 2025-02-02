"use client";

import { useMusic } from "@/context/MusicContext";
import { FaPlay, FaPause } from "react-icons/fa";

export default function SongCard({ song }) {
  const { currentSong, isPlaying, playSong, setIsPlaying } = useMusic();

  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      setIsPlaying(!isPlaying);
    } else {
      playSong(song);
    }
  };

  return (
    <div className="group relative rounded-md overflow-hidden hover:bg-white/5 transition-all">
      <div className="flex items-center p-2 gap-3">
        <div className="relative w-12 h-12">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-full h-full object-cover rounded"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isCurrentSong && isPlaying ? (
              <FaPause className="text-white" />
            ) : (
              <FaPlay className="text-white" />
            )}
          </button>
        </div>
        <div>
          <h3 className="font-medium text-white">{song.title}</h3>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>
    </div>
  );
}
