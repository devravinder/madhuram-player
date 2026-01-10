import {
  Button,
  HeaderIcon,
  HeaderSubTitle,
  HeaderTitle,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection,
} from "@/components/Elements";
import { LogOut, Pencil } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { createFileRoute } from "@tanstack/react-router";
import ThemeToggle from "@/components/ThemeToggle";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, logout } = useAuth();
  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <HeaderIcon>
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full rounded-lg object-cover"
              />
            </HeaderIcon>

            <div className="">
              <HeaderTitle>{user?.name}</HeaderTitle>
              <HeaderSubTitle>{user?.email}</HeaderSubTitle>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Button.Secondary>
              <Pencil size={18} />
              <span className="hidden sm:block"> Edit</span>
            </Button.Secondary>
            <Button.Primary onClick={logout}>
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </Button.Primary>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <PageMainContainer>
          <PageMainSection>
            <div className="border border-card rounded-lg p-2 flex flex-row items-center justify-between gap-2">
              <span>Change Theme</span> <ThemeToggle />
            </div>
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
