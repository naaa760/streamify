"use client";

import { useState, useRef, useEffect } from "react";
import { useMusic } from "@/context/MusicContext";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import ProgressBar from "./ProgressBar";

export const MusicPlayer = () => {
  const { currentSong, isPlaying, setIsPlaying, playlist } = useMusic();
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
      audio.addEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
    }
  }, [currentSong]);

  if (!currentSong) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-secondary p-4 border-t border-gray-700 z-50">
        <div className="max-w-screen-xl mx-auto">
          <ProgressBar audioRef={audioRef} />
          <div className="flex items-center justify-between mt-2">
            {/* Song Info */}
            <div className="flex items-center space-x-4">
              {currentSong && (
                <>
                  <img
                    src={currentSong.coverUrl}
                    alt={currentSong.title}
                    className="w-14 h-14 rounded"
                  />
                  <div>
                    <p className="text-white font-medium">
                      {currentSong.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {currentSong.artist}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Player Controls */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white">
                <FaStepBackward size={20} />
              </button>
              <button
                className="text-white p-2 rounded-full bg-primary hover:bg-primary/90"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
              <button className="text-gray-400 hover:text-white">
                <FaStepForward size={20} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setVolume(volume === 0 ? 1 : 0)}
              >
                {volume === 0 ? (
                  <FaVolumeMute size={20} />
                ) : (
                  <FaVolumeUp size={20} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-primary"
              />
            </div>

            <div className="text-xs text-gray-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
