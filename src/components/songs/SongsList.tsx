import { staticSongs } from "@/data/songs";
import type { Song } from "@/types/music";
import SongCard from "./SongCard";

export default function SongsList({songs}:{songs:Song[]}) {
  return (
   <div className="flex-1 overflow-y-auto px-4 py-3">
     <div className="grow flex flex-col gap-2">
      {songs.map((song, index) => (
        <SongCard
          key={song.id}
          song={song}
          queue={staticSongs}
          showIndex
          index={index}
        />
      ))}
    </div>
   </div>
  );
}
