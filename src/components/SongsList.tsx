import { staticSongs } from "@/data/songs";
import SongCard from "./SongCard";

export default function SongsList() {
  return (
   <div className="flex-1 overflow-y-auto px-4 py-3">
     <div className="grow flex flex-col gap-2">
      {staticSongs.slice(1).map((song, index) => (
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
