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
import { PlaylistModal } from "@/components/PlaylistModal";
import SongsList from "@/components/songs/SongsList";
import { usePlayer } from "@/context/PlayerContext";
import { usePlaylists } from "@/context/PlaylistContext";
import { staticSongs } from "@/data/songs";
import { fetchPlayListDetails } from "@/services/playlistService";
import { createFileRoute } from "@tanstack/react-router";
import { ListMusic, Pencil, Play } from "lucide-react";
import { useMemo, useState } from "react";
import NoItems from "./-components/NoItems";

export const Route = createFileRoute("/playlists/$id")({
  component: PlaylistDetails,
  loader: ({ params: { id } }) => fetchPlayListDetails(id),
});

function PlaylistDetails() {
  const [showModal, setShowModal] = useState(false);

  const { playSong } = usePlayer();

  const { playlists } = usePlaylists();
  const { id } = Route.useParams();
  const playlist = playlists.find((ele) => ele.id === id);
  // const playlist = Route.useLoaderData();

  const songs = useMemo(
    () =>
      playlist
        ? staticSongs.filter((song) => playlist.songIds.includes(song.id))
        : [],
    [playlist]
  );
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
              <HeaderTitle>
                {playlist.name}
              </HeaderTitle>
              <HeaderSubTitle>{`${playlist.songIds.length} songs`}</HeaderSubTitle>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Button.Primary onClick={() => playSong(songs)}>
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
              <SongsList songs={songs} />
            ) : (
              <NoItems />
            )}
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
