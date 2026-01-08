import { usePlayer } from "@/context/PlayerContext";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

export default function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    togglePlay,
    next,
    previous,
    seek,
  } = usePlayer();

   if (!currentSong) {
    return undefined;
  }

//   const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  return (
    <div className="shrink-0 glass">
      <div className="px-4 pt-2">
        <ProgressBar progress={progress} duration={duration} onSeek={seek} />
      </div>
      <div className="flex items-center gap-3 p-3">
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm line-clamp-1">
            {currentSong.title}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {currentSong.artist}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={previous} className="btn-icon p-2">
            <SkipBack size={20} />
          </button>
          <button onClick={togglePlay} className="rounded-full bg-muted p-3">
            {isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} className="ml-0.5" />
            )}
          </button>
          <button onClick={next} className="btn-icon p-2">
            <SkipForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
