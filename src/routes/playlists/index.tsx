import {
  IconButton,
  PageMain,
  PageHeader,
  PageLayout,
  PageMainSection,
  PageMainContainer,
} from "@/components/Elements";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ListMusic, Plus } from "lucide-react";
import PlayListCard from "./-components/PlayListCard";
import { useState } from "react";
import type { Playlist } from "@/types/music";
import { PlaylistModal } from "@/components/PlaylistModal";
import { usePlaylists } from "@/context/PlaylistContext";
import NoItems from "./-components/NoItems";

export const Route = createFileRoute("/playlists/")({
  component: PlayList,
});


function PlayList() {
  const navigate = useNavigate();
  const {playlists} = usePlaylists()
  const [showModal, setShowModal] = useState(false);

  const newPlaylist = ():Omit<Playlist, "createdAt" | "updatedAt">=>({id:'', name:'', description:'', songIds:[]})

  if(showModal)
    return <PlaylistModal title="Create Plalist" onClose={()=>setShowModal(false)} playlist={newPlaylist()} />

  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <IconButton className="p-4 h-14 w-14 rounded-xl">
              <ListMusic size={30} />
            </IconButton>

            <div className="">
              <div className="text-2xl font-bold line-clamp-1">Playlists</div>
              <div className="text-md text-muted-foreground">{`${playlists.length} playlists`}</div>
            </div>
          </div>
          <div className="">
            <button onClick={()=>setShowModal(true)} className="cursor-pointer px-4 sm:px-8 py-3 text-xl rounded-lg bg-accent hover:bg-accent flex flex-row justify-center items-center gap-2">
              <Plus size={18} />
              Create
            </button>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <PageMainContainer>
          <PageMainSection>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {playlists.length ? playlists.map((ele) => (
                <PlayListCard
                  onClick={() =>
                    navigate({ to: "/playlists/$id", params: { id: ele.id } })
                  }
                  key={ele.id}
                  name={ele.name}
                  noOfSongs={ele.songIds.length}
                />
              )): <div className="col-span-4"><NoItems title="No Playlists" subTitle='Click Create to add playlists' /></div>}
            </div>
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
