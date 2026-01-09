import {
  IconButton,
  PageContent,
  PageHeader,
  PageLayout,
} from "@/components/Elements";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ListMusic, Plus } from "lucide-react";
import PlayListCard from "./-components/PlayListCard";

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
            <button className="cursor-pointer px-4 sm:px-8 py-3 text-xl rounded-lg bg-accent hover:bg-accent flex flex-row justify-center items-center gap-2">
              <Plus size={18} />
              Create
            </button>
          </div>
        </div>
      </PageHeader>
      <PageContent>
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
      </PageContent>
    </PageLayout>
  );
}
