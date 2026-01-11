import {
  Button,
  HeaderIcon,
  HeaderSubTitle,
  HeaderTitle,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection,
} from "@/components/Elements";
import SongsList from "@/components/songs/SongsList";
import { usePlayer } from "@/context/PlayerContext";
import { Music, Play } from "lucide-react";

import db, { FAVOURITE_PLAYLIST_ID } from "@/services/db";
import { createFileRoute } from "@tanstack/react-router";
import NoItems from "./playlists/-components/NoItems";



export const Route = createFileRoute("/favourites")({
  component: RouteComponent,
  loader: async () => {
    console.log("/favourites loader");
    
    const favs = await db.playlists.get(FAVOURITE_PLAYLIST_ID);
    if (!favs) return [];
    const allSongs = await db.songs.toArray();
    return allSongs.filter((song) => favs.songIds.includes(song.id));
  },
});

function RouteComponent() {
  const { playSong } = usePlayer();

  const songs = Route.useLoaderData();

  if (!songs) return undefined;

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
            {songs.length ? (
              <SongsList songs={songs} />
            ) : (
              <NoItems subTitle="Like any song to see here" />
            )}
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
