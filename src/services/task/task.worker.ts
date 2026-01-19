import { DELAY } from "@/constants";

let timer: number | undefined;

self.onmessage = (e) => {
  const { type } = e.data;

  switch (type) {
    case "START":
      start();
      break;

    case "STOP":
      stop();
      break;

    case "RUN_NOW": // 👈 manual trigger
      runOnce();
      break;
  }
};

function start() {
  if (timer) return;

  timer = setInterval(runOnce, DELAY);
}

function runOnce() {
  if (!navigator.onLine) return;

  self.postMessage({ type: "EXECUTE_TASK" });
}

function stop() {
  if (timer) clearInterval(timer);
  timer = undefined;
}
