import { AuthProvider, SecureComponent } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { PlaylistProvider } from "@/context/PlaylistContext";
import { ThemeProvider } from "@/hooks/useTheme";
import type { ReactNode } from "react";
import AppRouter from "./AppRouter";
import PWABadge from "./PWABadge";

const ContextProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <ThemeProvider>
      <PlaylistProvider>
        <PlayerProvider>
          <SecureComponent>{children}</SecureComponent>
        </PlayerProvider>
      </PlaylistProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default function App() {
  return (
    <ContextProviders>
      <AppRouter />
      <PWABadge />
    </ContextProviders>
  );
}
