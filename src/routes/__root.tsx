import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider, SecureComponent } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
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
            <SecureComponent>
              <AppLayout />
            </SecureComponent>
          </PlayerProvider>
        </ThemeProvider>
      </AuthProvider>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
