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
import { EditPlaylistModal } from "@/components/EditPlaylistModal";

export const Route = createFileRoute("/playlists/")({
  component: PlayList,
});

const arr = [
  { id: "1", name: "Test Some", noOfSongs: 10 },
  { id: "2", name: "Test Guru", noOfSongs: 9 },
  { id: "3", name: "Test Whs", noOfSongs: 22 },
  { id: "4", name: "Test Hello", noOfSongs: 11 },
  { id: "5", name: "Test Some Things", noOfSongs: 10 },
  { id: "11", name: "Test Some", noOfSongs: 10 },
  { id: "12", name: "Test Guru", noOfSongs: 9 },
  { id: "13", name: "Test Whs", noOfSongs: 22 },
  { id: "14", name: "Test Hello", noOfSongs: 11 },
  { id: "15", name: "Test Some Things", noOfSongs: 10 },
  { id: "21", name: "Test Some", noOfSongs: 10 },
  { id: "22", name: "Test Guru", noOfSongs: 9 },
  { id: "23", name: "Test Whs", noOfSongs: 22 },
  { id: "24", name: "Test Hello", noOfSongs: 11 },
  { id: "25", name: "Test Some Things", noOfSongs: 10 },
];

function PlayList() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const newPlaylist = ():Omit<Playlist, "createdAt" | "updatedAt">=>({id:'', name:'', description:'', songIds:[]})

  if(showModal)
    return <EditPlaylistModal onClose={()=>setShowModal(false)} playlist={newPlaylist()} onDelete={()=>{}} />

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
              <div className="text-md text-muted-foreground">{`${2} playlists`}</div>
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
              {arr.map((ele) => (
                <PlayListCard
                  onClick={() =>
                    navigate({ to: "/playlists/$id", params: { id: ele.id } })
                  }
                  key={ele.id}
                  name={ele.name}
                  noOfSongs={ele.noOfSongs}
                />
              ))}
            </div>
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
