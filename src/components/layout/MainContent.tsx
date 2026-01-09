import { Outlet } from "@tanstack/react-router";
import { MainContainer, MainSection } from "../Elements";
import Player from "../player/Player";

export default function MainContent() {
  return (
    <MainContainer>
      <MainSection>
        <Outlet />
      </MainSection>
      <Player />
    </MainContainer>
  );
}
