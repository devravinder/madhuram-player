import type { BackgroundTask, Playlist } from "@/types/music";
import db, { COLLECTIONS } from "./db";
import { updateInfo } from "./updateInfoService";
import { addBackgroundTask } from "./backgroundTaskService";

export const createPlaylist = async (
  playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">,
  id?: string
): Promise<Playlist> => {
  const newPlaylist: Playlist = {
    ...playlist,
    id: id || `${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.playlists.add(newPlaylist);
  await updateInfo(COLLECTIONS.PLAYLIST_COLLECTION);

  const task: BackgroundTask = {
    id: newPlaylist.id,
    type: "playlist_UP",
    retries: 0,
    status: "PENDING",
  };

  await addBackgroundTask(task);

  return newPlaylist;
};
export const getPlaylist = (id: string) => db.playlists.get(id);
export const getPlaylists = () => db.playlists.toArray();

export const updatePlaylist = async (
  id: string,
  updates: Partial<Omit<Playlist, "id" | "createdAt">>
) => {
  await db.playlists.update(id, {
    ...updates,
    updatedAt: new Date(),
  });

  await updateInfo(COLLECTIONS.PLAYLIST_COLLECTION);
};

export const deletePlaylist = async (id: string) => {
  await db.playlists.delete(id);
  await updateInfo(COLLECTIONS.PLAYLIST_COLLECTION);

  const task: BackgroundTask = {
    id: id,
    type: "playlist_DELETE",
    retries: 0,
    status: "PENDING",
  };

  await addBackgroundTask(task);
};

export const resetPlaylists = async (playlists: Playlist[]) => {
  await db[COLLECTIONS.PLAYLIST_COLLECTION].clear();

  await db[COLLECTIONS.PLAYLIST_COLLECTION].bulkAdd(playlists);
};
