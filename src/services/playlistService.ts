import type { Playlist } from "@/types/music";
import db from "./db";

export const createPlaylist = async (
  playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">,
  id?: string
): Promise<Playlist> => {
  const newPlaylist: Playlist = {
    ...playlist,
    id: id || `${crypto.randomUUID().slice(0,4)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await db.playlists.add(newPlaylist);
  return newPlaylist;
};
export const getPlaylist = (id: string) => db.playlists.get(id);

export const updatePlaylist = async (
  id: string,
  updates: Partial<Omit<Playlist, "id" | "createdAt">>
) => {
  await db.playlists.update(id, {
    ...updates,
    updatedAt: new Date(),
  });
};

export const deletePlaylist = (id: string) => db.playlists.delete(id);

