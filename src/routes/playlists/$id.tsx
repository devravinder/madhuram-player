import { ListMusic, Pencil, Play } from "lucide-react";
import { IconButton } from "@/components/Elements";
import { fetchPlayListDetails } from "@/services/playlistService";
import { createFileRoute } from "@tanstack/react-router";
import NoSongs from "./-components/NoSongs";
import SongsList from "@/components/songs/SongsList";

export const Route = createFileRoute("/playlists/$id")({
  component: PlaylistDetails,
  loader: ({ params: { id } }) => fetchPlayListDetails(id),
});

function PlaylistDetails() {
  const playlistDetails = Route.useLoaderData()
  return (
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <IconButton className="p-4 h-14 w-14 rounded-xl">
              <ListMusic size={30} />
            </IconButton>
  
            <div className="">
              <div className="text-2xl font-bold line-clamp-1">{playlistDetails.name}</div>
              <div className="text-md text-muted-foreground">{`${playlistDetails.songs.length} songs`}</div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button className="cursor-pointer px-4 sm:px-8 py-3 text-xl rounded-lg bg-primary/40 hover:bg-primary/50 flex flex-row justify-center items-center gap-2">
              <Play size={18} />
              Play
            </button>
            <button className="cursor-pointer px-4 sm:px-8 py-3 text-xl rounded-lg bg-accent hover:bg-accent flex flex-row justify-center items-center gap-2">
              <Pencil size={18} />
              Edit
            </button>
          </div>
        </div>
        { playlistDetails.songs.length ? <SongsList songs={playlistDetails.songs} /> : <NoSongs/>}
      </div>
    );
}
