import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDb } from "./services/db.ts";

const intialize = async () => {
  await initializeDb();
};

window.addEventListener("error", (event) => {
  if (
    event.message?.includes("Failed to fetch dynamically imported module") ||
    event.message?.includes("Importing a module script failed")
  ) {
    const retries = parseInt(sessionStorage.getItem("chunk_retry_count") || "0", 10);
    if (retries < 3) {
      sessionStorage.setItem("chunk_retry_count", (retries + 1).toString());
      window.location.reload();
    } else {
      console.error("Failed to load module after multiple retries.");
    }
  }
});

const startApp = async () => {
  await intialize();

  createRoot(document.getElementById("root")!).render(<App />);

  // Reset retry count if app runs successfully for a few seconds
  setTimeout(() => {
    sessionStorage.removeItem("chunk_retry_count");
  }, 5000);
};

startApp();
