"use client";

import { useEffect, useState } from "react";
import { useMusic } from "@/context/MusicContext";

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const ProgressBar = ({ audioRef }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const { isPlaying } = useMusic();

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio?.addEventListener("timeupdate", updateProgress);
    return () => audio?.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const clickPosition = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
      audio.currentTime = clickPosition * audio.duration;
    }
  };

  return (
    <div
      className="h-1 bg-gray-600 cursor-pointer rounded-full"
      onClick={handleSeek}
    >
      <div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
