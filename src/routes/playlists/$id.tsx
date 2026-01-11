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
import { PlaylistModal } from "@/components/PlaylistModal";
import SongsList from "@/components/songs/SongsList";
import { usePlayer } from "@/context/PlayerContext";
import db from "@/services/db";
import { createFileRoute } from "@tanstack/react-router";
import { ListMusic, Pencil, Play } from "lucide-react";
import { useState } from "react";
import NoItems from "./-components/NoItems";

export const Route = createFileRoute("/playlists/$id")({
  component: PlaylistDetails,
  loader: async ({ params: { id } }) => {
    const playlist = await db.playlists.get(id); // working with only number ids
    if (!playlist) return { playlist, songs: [] };
    const allSongs = await db.songs.toArray();

    console.log("===== /playlists/$id in loader")

    const songs = allSongs.filter((song) => playlist.songIds.includes(song.id));

    return { playlist, songs };
  },
});

function PlaylistDetails() {
  const [showModal, setShowModal] = useState(false);

  const { playSong } = usePlayer();
  const { playlist, songs } = Route.useLoaderData();

  if (!playlist) return undefined;

  if (showModal)
    return (
      <PlaylistModal
        title="Edit Plalist"
        onClose={() => setShowModal(false)}
        playlist={playlist}
      />
    );

  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <HeaderIcon>
              <ListMusic size={30} />
            </HeaderIcon>

            <div className="">
              <HeaderTitle>{playlist.name}</HeaderTitle>
              <HeaderSubTitle>{`${playlist.songIds.length} songs`}</HeaderSubTitle>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Button.Primary onClick={() => playSong(songs, 0, playlist.id)}>
              <Play size={18} />
              <span className="hidden sm:block">Play</span>
            </Button.Primary>
            <Button.Secondary onClick={() => setShowModal(true)}>
              <Pencil size={18} />
              <span className="hidden sm:block"> Edit</span>
            </Button.Secondary>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <PageMainContainer>
          <PageMainSection>
            {playlist.songIds?.length ? (
              <SongsList songs={songs} playListId={playlist.id} />
            ) : (
              <NoItems />
            )}
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
