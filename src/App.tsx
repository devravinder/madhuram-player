import AppLayout from "./components/layout/AppLayout";
import { AuthProvider, SecureComponent } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import { ThemeProvider } from "./hooks/useTheme";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PlayerProvider>
          <SecureComponent>
            <AppLayout />
          </SecureComponent>
        </PlayerProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
