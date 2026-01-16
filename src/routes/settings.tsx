import {
  Button,
  HeaderIcon,
  HeaderSubTitle,
  HeaderTitle,
  IconButton,
  Img,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection,
} from "@/components/Elements";
import { CloudSync, LogOut, Pencil, Trash2 } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { usePlayer } from "@/context/PlayerContext";
import { clearData } from "@/services/db";
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
              <Img src={user?.photoURL!} alt={user?.email!} className="rounded-lg" />
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
                    await clearData("Do you want to clear the data")
                  }
                >
                  <Trash2 className="h-5 w-5" />
                </IconButton>
              </div>
              <div className="border border-card rounded-lg p-2 flex flex-row items-center justify-between gap-2">
                <span>Sync Data</span>
                <IconButton
                  onClick={async () =>
                    await clearData("Do you want to clear the data")
                  }
                >
                  <CloudSync className="h-5 w-5" />
                </IconButton>
              </div>
            </div>
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
