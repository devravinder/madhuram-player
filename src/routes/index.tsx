import {
  HeaderIcon,
  HeaderSubTitle,
  HeaderTitle,
  PageHeader,
  PageLayout,
  PageMain,
  PageMainContainer,
  PageMainSection
} from "@/components/Elements";
import { Music } from "lucide-react";

import { createFileRoute } from "@tanstack/react-router";



export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {


  return (
    <PageLayout>
      <PageHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <HeaderIcon>
              <Music size={30} />
            </HeaderIcon>

            <div className="">
              <HeaderTitle>Home Page</HeaderTitle>
              <HeaderSubTitle>Offline Songs</HeaderSubTitle>
            </div>
          </div>
        </div>
      </PageHeader>
      <PageMain>
        <PageMainContainer>
          <PageMainSection>
          </PageMainSection>
        </PageMainContainer>
      </PageMain>
    </PageLayout>
  );
}
