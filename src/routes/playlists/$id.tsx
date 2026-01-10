import { ListMusic, Pencil, Play } from "lucide-react";
import {
  IconButton,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection,
} from "@/components/Elements";
import { fetchPlayListDetails } from "@/services/playlistService";
import { createFileRoute } from "@tanstack/react-router";
import NoItems from "./-components/NoItems";
import SongsList from "@/components/songs/SongsList";
import { usePlaylists } from "@/context/PlaylistContext";
import { staticSongs } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";
import { useMemo, useState } from "react";
import { PlaylistModal } from "@/components/PlaylistModal";

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
            <IconButton className="p-4 h-14 w-14 rounded-xl">
              <ListMusic size={30} />
            </IconButton>

            <div className="">
              <div className="text-2xl font-bold line-clamp-1">
                {playlist.name}
              </div>
              <div className="text-md text-muted-foreground">{`${playlist.songIds.length} songs`}</div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => playSong(songs[0], songs)}
              className="cursor-pointer px-4 sm:px-8 py-3 text-xl rounded-lg bg-primary/40 hover:bg-primary/50 flex flex-row justify-center items-center gap-2"
            >
              <Play size={18} />
              Play
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer px-4 sm:px-8 py-3 text-xl rounded-lg bg-accent hover:bg-accent flex flex-row justify-center items-center gap-2"
            >
              <Pencil size={18} />
              Edit
            </button>
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
