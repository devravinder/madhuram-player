import AppLayout from "./-layout/AppLayout";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
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
