import { executeOneTask } from "../backgroundTaskService";

let worker: Worker | null = null;


export const createTaskWorker = () => {
  if (worker) return;

  worker = new Worker(new URL("./task.worker.ts", import.meta.url), {
    type: "module",
  });

  worker.onmessage = async (e) => {
    const { type } = e.data;
    if (type === "EXECUTE_TASK") {
      await executeOneTask();
    }
  };

  worker.postMessage({ type: "START"});
};

/**
 * 🔥 Manual trigger from anywhere
 */
export const runTaskNow = () => {
  if (!worker) return;

  worker.postMessage({ type: "RUN_NOW" });
};

export const stopTaskWorker = () => {
  if (!worker) return;

  worker.postMessage({ type: "STOP" });
  worker.terminate();
  worker = null;
};

window.addEventListener("beforeunload", stopTaskWorker);
