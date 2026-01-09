import { Outlet } from "@tanstack/react-router";
import { MainContainer } from "../Elements";
import Player from "../player/Player";

export default function MainContent() {
  return (
    <MainContainer>
      <Outlet />
      <Player />
    </MainContainer>
  );
}
