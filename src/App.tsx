import AppLayout from "./components/layout/AppLayout";
import { PlayerProvider } from "./context/PlayerContext";
import { ThemeProvider } from "./hooks/useTheme";

export default function App() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <AppLayout />
      </PlayerProvider>
    </ThemeProvider>
  );
}
