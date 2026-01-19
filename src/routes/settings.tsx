import {
  Button,
  HeaderIcon,
  HeaderSubTitle,
  HeaderTitle,
  IconButton,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection,
} from "@/components/Elements";
import {
  CloudDownload,
  CloudUpload,
  LogOut,
  Pencil,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Image } from "@/components/Avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { usePlayer } from "@/context/PlayerContext";
import { clearDataWithPrompt } from "@/services/db";
import { syncDown, syncUp } from "@/services/syncService";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, logout } = useAuth();
  const { pause } = usePlayer();
  const handleLogout = () => {
    pause();
    logout();
  };
  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <HeaderIcon>
              <Image src={user?.photoURL!} alt={user?.displayName!} />
            </HeaderIcon>

            <div className="">
              <HeaderTitle>{user?.displayName}</HeaderTitle>
              <HeaderSubTitle>{user?.email}</HeaderSubTitle>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Button.Secondary>
              <Pencil size={18} />
              <span className="hidden sm:block"> Edit</span>
            </Button.Secondary>
            <Button.Primary onClick={handleLogout}>
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </Button.Primary>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <PageMainContainer>
          <PageMainSection>
            <div className="flex flex-col gap-2">
              <div className="border border-card rounded-lg p-2 flex flex-row items-center justify-between gap-2">
                <span>Change Theme</span> <ThemeToggle />
              </div>
              <div className="border border-card rounded-lg p-2 flex flex-row items-center justify-between gap-2">
                <span>Clear Data</span>
                <IconButton
                  onClick={async () =>
                    await clearDataWithPrompt("Do you want to clear the data")
                  }
                >
                  <Trash2 className="h-5 w-5" />
                </IconButton>
              </div>

              <div className="border border-card rounded-lg p-2 flex flex-row items-center justify-between gap-2">
                <span>Sync Up</span>
                <IconButton
                  onClick={async () => {
                    await syncUp();
                    toast("Syncing up in backgrdound");
                  }}
                >
                  <CloudUpload className="h-5 w-5" />
                </IconButton>
              </div>
              <div className="border border-card rounded-lg p-2 flex flex-row items-center justify-between gap-2">
                <span>Sync Down</span>
                <IconButton
                  onClick={async () => {
                    await syncDown();
                    toast("Syncing down in backgrdound");
                  }}
                >
                  <CloudDownload className="h-5 w-5" />
                </IconButton>
              </div>
              <div className="border border-card rounded-lg p-2 flex flex-row items-center justify-between gap-2">
                <span>Refresh</span>
                <IconButton
                  onClick={() => {
                    toast("Refreshing...");
                    window.location.reload();
                  }}
                >
                  <RefreshCcw className="h-5 w-5" />
                </IconButton>
              </div>
            </div>
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
