import { usePlayer } from "@/context/PlayerContext";
import type { Song } from "@/types/music";
import { formatTime } from "@/services/timeUtil";
import { Pause, Play } from "lucide-react";
import Waves from "../Waves";

interface SongCardProps {
  song: Song;
  queue: Song[];
  showIndex?: boolean;
  index?: number;
}

export default function SongCard({
  song,
  queue,
  showIndex,
  index,
}: SongCardProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handleClick = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(queue, index);
    }
  };

  return (
    <div
      className={
        isCurrentSong
          ? "flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 bg-primary/10"
          : "flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all duration-200"
      }
      onClick={handleClick}
    >
      {showIndex && (
        <span className="w-6 text-center text-sm text-muted-foreground group-hover:hidden">
          {index !== undefined ? index + 1 : ""}
        </span>
      )}
      <div
        className={`relative ${showIndex ? "hidden group-hover:block" : ""}`}
      >
        {showIndex ? (
          <div className="w-6 flex justify-center">
            {isCurrentSong && isPlaying ? (
              <Pause size={16} className="text-primary" />
            ) : (
              <Play size={16} className="text-primary" />
            )}
          </div>
        ) : null}
      </div>

      <div className="w-12 h-12 relative">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full rounded-lg object-cover"
        />
        <div className="absolute border p-2 rounded-lg inset-0 flex justify-center items-center">
          {isCurrentSong && <Waves start={isPlaying} />}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium line-clamp-1 ${
            isCurrentSong ? "text-primary" : ""
          }`}
        >
          {song.title}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {song.artist}
        </p>
      </div>

      <span className="text-sm text-muted-foreground hidden sm:block">
        {song.album}
      </span>

      <span className="text-sm text-muted-foreground w-12 text-right">
        {formatTime(song.duration)}
      </span>
    </div>
  );
}
