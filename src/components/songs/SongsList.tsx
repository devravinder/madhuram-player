import type { Song } from "@/types/music";
import SongCard from "./SongCard";

export default function SongsList({ songs }: { songs: Song[] }) {
  return (
    <>
      <div className="grow flex flex-col gap-2">
        {songs.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            queue={songs}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
