import {
  IconButton,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection,
} from "@/components/Elements";
import SongsList from "@/components/songs/SongsList";
import { RECENTLY_PLAYED_LIMIT, usePlayer } from "@/context/PlayerContext";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Play } from "lucide-react";

export const Route = createFileRoute("/recent")({
  component: RouteComponent,
});

function RouteComponent() {
  const { playQueue, recentlyPlayed } = usePlayer();
  const songs = recentlyPlayed;
  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <IconButton className="p-4 h-14 w-14 rounded-xl">
              <Clock size={30} />
            </IconButton>

            <div className="">
              <div className="text-2xl font-bold line-clamp-1">
                Recenctly PLayed
              </div>
              <div className="text-md text-muted-foreground">{`${songs.length} songs of ${RECENTLY_PLAYED_LIMIT} max`}</div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => playQueue(songs)}
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
            <SongsList songs={recentlyPlayed} />
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
