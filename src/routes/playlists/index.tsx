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
import { usePlaylists } from "@/context/PlaylistContext";
import type { Playlist } from "@/types/music";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ListMusic, Plus } from "lucide-react";
import { useState } from "react";
import NoItems from "./-components/NoItems";
import PlayListCard from "./-components/PlayListCard";

export const Route = createFileRoute("/playlists/")({
  component: PlayList,
});

function PlayList() {
  const navigate = useNavigate();
  const { playlists } = usePlaylists();
  const [showModal, setShowModal] = useState(false);

  const newPlaylist = (): Omit<Playlist, "createdAt" | "updatedAt"> => ({
    id: "",
    name: "",
    description: "",
    songIds: [],
  });

  if (showModal)
    return (
      <PlaylistModal
        title="Create Plalist"
        onClose={() => setShowModal(false)}
        playlist={newPlaylist()}
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
              <HeaderTitle>Playlists</HeaderTitle>
              <HeaderSubTitle>{`${playlists.length} playlists`}</HeaderSubTitle>
            </div>
          </div>
          <div className="">
            <Button.Primary onClick={() => setShowModal(true)}>
              <Plus size={18} />
              <span className="hidden sm:block">Create</span>
            </Button.Primary>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <PageMainContainer>
          <PageMainSection>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {playlists.length ? (
                playlists.map((ele) => (
                  <PlayListCard
                    onClick={() =>
                      navigate({ to: "/playlists/$id", params: { id: ele.id } })
                    }
                    key={ele.id}
                    name={ele.name}
                    noOfSongs={ele.songIds.length}
                  />
                ))
              ) : (
                <div className="col-span-4">
                  <NoItems
                    title="No Playlists"
                    subTitle="Click Create to add playlists"
                  />
                </div>
              )}
            </div>
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
