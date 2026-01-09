import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider, SecureComponent } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { PlaylistProvider } from "@/context/PlaylistContext";
import { ThemeProvider } from "@/hooks/useTheme";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <PlayerProvider>
            <PlaylistProvider>
              <SecureComponent>
                <AppLayout />
              </SecureComponent>
            </PlaylistProvider>
          </PlayerProvider>
        </ThemeProvider>
      </AuthProvider>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
