import type { BackgroundTask } from "@/types/music";
import db, { COLLECTIONS } from "./db";
import { isAuthenticated } from "./firebaseUtil";
import {
  filedown,
  fileUp,
  playlistsDown,
  playlistsUp,
  songsDown,
  songsUp
} from "./syncService";
import { runTaskNow } from "./task/taskExecutor";

export const addBackgroundTask = async (task: BackgroundTask) => {
  await db[COLLECTIONS.BACKGROUND_TASKS_COLLECTION].put(task);
  runTaskNow();
};

export const deleteBackgroundTask = (id: string) =>
  db[COLLECTIONS.BACKGROUND_TASKS_COLLECTION].delete(id);

const executeTask = async (task: BackgroundTask) => {
  try {
    await db[COLLECTIONS.BACKGROUND_TASKS_COLLECTION].update(task.id, {
      status: "RUNNING",
    });

    switch (task.type) {

      case "files_DOWN":
        await filedown(task.id);
        break;

      case "files_UP":
        await fileUp(task.id);
        break;

      case "songs_UP":
        await songsUp();
        break;

      case "songs_DOWN":
        await songsDown();
        break;

      case "playlists_UP":
        await playlistsUp();
        break;

      case "playlists_DOWN":
        await playlistsDown();
        break;
    }

    // await db[BACKGROUND_TASKS_COLLECTION].update(task.id, { status: "DONE" });

    await deleteBackgroundTask(task.id);
  } catch (e) {
    await db[COLLECTIONS.BACKGROUND_TASKS_COLLECTION].update(task.id, {
      status: "FAILED",
      retries: task.retries + 1,
    });
  }
};

const MAX_TRIES = 3;
export const executeOneTask = async () => {
  if (!isAuthenticated()) return;
  const task = await db[COLLECTIONS.BACKGROUND_TASKS_COLLECTION]
    .filter(
      (task: BackgroundTask) =>
        task.status === "PENDING" ||
        (task.status === "FAILED" && task.retries < MAX_TRIES)
    )
    .first();

  if (!task) return;

  console.log("executing task ", task)
  await executeTask(task);
};
