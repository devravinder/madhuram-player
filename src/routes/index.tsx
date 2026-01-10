import {
  IconButton,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection,
} from "@/components/Elements";
import SongsList from "@/components/songs/SongsList";
import { usePlayer } from "@/context/PlayerContext";
import { staticSongs } from "@/data/songs";
import { Music, Play } from "lucide-react";

import { createFileRoute } from "@tanstack/react-router";
import { usePlaylists } from "@/context/PlaylistContext";
import { Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { playSong } = usePlayer();
  const { favourites } = usePlaylists();
  if (!favourites?.length) return <Navigate to="/library" />;
  const songs = staticSongs.filter((song) => favourites.includes(song.id));
  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <IconButton className="p-4 h-14 w-14 rounded-xl">
              <Music size={30} />
            </IconButton>

            <div className="">
              <div className="text-2xl font-bold line-clamp-1">Favourites</div>
              <div className="text-md text-muted-foreground">{`${songs.length} songs`}</div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => playSong(songs)}
              className="cursor-pointer px-4 sm:px-8 py-3 text-xl rounded-lg bg-primary/40 hover:bg-primary/50 flex flex-row justify-center items-center gap-2"
            >
              <Play size={18} />
              Play
            </button>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <PageMainContainer>
          <PageMainSection>
            <SongsList songs={songs} />
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
