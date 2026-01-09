import SongsList from "@/components/SongsList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/library")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SongsList />;
}
