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
import { RECENTLY_PLAYED_LIMIT, usePlayer } from "@/context/PlayerContext";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Play } from "lucide-react";

export const Route = createFileRoute("/recent")({
  component: RouteComponent,
});

function RouteComponent() {
  const { playSong, recentlyPlayed } = usePlayer();
  const songs = recentlyPlayed;
  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <HeaderIcon>
              <Clock size={30} />
            </HeaderIcon>

            <div className="">
              <HeaderTitle>
                Recenctly PLayed
              </HeaderTitle>
              <HeaderSubTitle>{`${songs.length} songs of ${RECENTLY_PLAYED_LIMIT} max`}</HeaderSubTitle>
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
            <SongsList songs={recentlyPlayed} />
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
