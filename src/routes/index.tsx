import {
  Button,
  HeaderIcon,
  HeaderSubTitle,
  HeaderTitle,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection
} from "@/components/Elements";
import SongsList from "@/components/songs/SongsList";
import { usePlayer } from "@/context/PlayerContext";
import { staticSongs } from "@/data/songs";
import { Music, Play } from "lucide-react";

import { usePlaylists } from "@/context/PlaylistContext";
import { createFileRoute, Navigate } from "@tanstack/react-router";

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
            <HeaderIcon>
              <Music size={30} />
            </HeaderIcon>

            <div className="">
              <HeaderTitle>Favourites</HeaderTitle>
              <HeaderSubTitle>{`${songs.length} songs`}</HeaderSubTitle>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Button.Primary onClick={() => playSong(songs)}>
              <Play size={18} />
              <span className="hidden sm:block">Play</span>
            </Button.Primary>
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
