import { executeOneTask } from "../backgroundTaskService";

let worker: Worker | null = null;

const AUTO_SYNC = import.meta.env.VITE_APP_AUTO_SYNC === "TRUE";
const AUTO_SYNC_MS = parseInt(import.meta.env.VITE_APP_AUTO_SYNC_MS || `30000`);

export const createTaskWorker = () => {
  if (worker) return;

  worker = new Worker(new URL("./task.worker.ts", import.meta.url), {
    type: "module",
  });

  worker.onmessage = async (e) => {
    const { type, interval = 0 } = e.data;
    if (type === "EXECUTE_TASK") {
      setTimeout(async () => {
        await executeOneTask();
      }, interval);
    }
  };

  if (AUTO_SYNC) worker.postMessage({ type: "START", interval: AUTO_SYNC_MS });
};

/**
 * 🔥 Manual trigger from anywhere
 */
export const runTaskNow = (delay=1*1000) => {
  if (!worker) return;

  worker.postMessage({ type: "RUN_NOW", interval: delay });
};

export const stopTaskWorker = () => {
  if (!worker) return;

  worker.postMessage({ type: "STOP" });
  worker.terminate();
  worker = null;
};

window.addEventListener("beforeunload", stopTaskWorker);
