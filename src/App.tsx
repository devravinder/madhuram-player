import { AuthProvider, SecureComponent } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { PlaylistProvider } from "@/context/PlaylistContext";
import { ThemeProvider } from "@/hooks/useTheme";
import type { ReactNode } from "react";
import AppRouter from "./AppRouter";

const ContextProviders = ({children}:{children:ReactNode}) => (
  <AuthProvider>
    <ThemeProvider>
      <PlayerProvider>
        <PlaylistProvider>
          <SecureComponent>
           {children}
          </SecureComponent>
        </PlaylistProvider>
      </PlayerProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default function App() {
  return <ContextProviders><AppRouter /></ContextProviders>;
}
