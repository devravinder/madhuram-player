import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDb } from "./services/db.ts";

const intialize = async () => {
  await initializeDb();
};

const startApp = async () => {
  await intialize();

  createRoot(document.getElementById("root")!).render(<App />);
};

startApp();
