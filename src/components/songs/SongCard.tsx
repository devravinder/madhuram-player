import { usePlayer } from "@/context/PlayerContext";
import type { Song } from "@/types/music";
import { formatTime } from "@/services/timeUtil";
import { Pause, Play } from "lucide-react";
import Waves from "../Waves";
import { SongItem } from "../Elements";

interface SongCardProps {
  song: Song;
  queue: Song[];
  index: number;
  playListId: string;
}

export default function SongCard({
  song,
  queue,
  index,
  playListId,
}: SongCardProps) {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handleClick = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(queue, index, playListId);
    }
  };

  return (
    <SongItem onClick={handleClick} $active={isCurrentSong}>
      <span className="w-6 text-center text-sm text-muted-foreground">
        {index !== undefined ? index + 1 : ""}
      </span>

      <div className="w-12 h-12 relative">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full rounded-lg object-cover"
        />
        <div className="absolute border p-2 rounded-lg inset-0 flex justify-center items-center group-hover:hidden">
          {isCurrentSong && <Waves start={isPlaying} />}
        </div>
        <div className="absolute border p-2 rounded-lg inset-0 justify-center items-center hidden group-hover:flex">
          {isCurrentSong && isPlaying ? <Pause /> : <Play />}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium line-clamp-1 ${
            isCurrentSong ? "text-emerald-300" : "text-foreground"
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
    </SongItem>
  );
}
