import db from "@/services/db";
import AppLayout from "./-layout/AppLayout";
import { createRootRoute } from "@tanstack/react-router";
import { staticSongs } from "@/data/songs";

const createSampleSongs = async () => {
  console.log("createSampleSongs");
  await db.songs.bulkAdd(staticSongs);
};

export const Route = createRootRoute({
  beforeLoad: async () => {
    console.log("Root beforeLoad"); // BUG, why it is calling multiple times
    const allSongs = await db.songs.toArray();

    if (!allSongs?.length) await createSampleSongs();
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <AppLayout />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
