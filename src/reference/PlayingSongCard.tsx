import { Play, Pause, SkipBack, SkipForward, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Waves from "../components/Waves";

interface PlayingSongCardProps {
  title?: string;
  artist?: string;
  album?: string;
  coverImage?: string;
  duration?: number;
}

export default function PlayingSongCard({
  title = "Midnight Dreams",
  artist = "The Resonance",
  album = "Echoes of Tomorrow",
  coverImage = "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
  duration = 245,
}: PlayingSongCardProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(67);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative">
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent" />

          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-2.5 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isLiked ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-slate-400 text-sm">{artist}</p>
            <p className="text-slate-500 text-xs">{album}</p>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="w-16 h-10"><Waves start={isPlaying} /></div>
          </div>

          <div className="space-y-2">
            <div className="relative h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              className="p-3 text-slate-400 hover:text-white transition-colors"
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-5 bg-linear-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/50 transition-all transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" fill="currentColor" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              className="p-3 text-slate-400 hover:text-white transition-colors"
              onClick={() =>
                setCurrentTime(Math.min(duration, currentTime + 10))
              }
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
