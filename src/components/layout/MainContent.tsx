import { Outlet } from "@tanstack/react-router";
import Player from "../player/Player";

export default function MainContent() {
  return (
    <div className="h-full flex flex-col">
      <Outlet />
      <Player />
    </div>
  );
}
