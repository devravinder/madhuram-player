let timer: number | undefined;

self.onmessage = (e) => {
  const { type, interval } = e.data;

  switch (type) {
    case "START":
      start(interval);
      break;

    case "STOP":
      stop();
      break;

    case "RUN_NOW": // 👈 manual trigger
      runOnce();
      break;
  }
};

function start(interval: number = 30 * 1000) {
  if (timer) return;

  timer = setInterval(runOnce, interval);
}

function runOnce() {
  if (!navigator.onLine) return;

  self.postMessage({ type: "EXECUTE_TASK" });
}

function stop() {
  if (timer) clearInterval(timer);
  timer = undefined;
}
