import type { Playlist } from "@/types/music";
import db from "./db";

export const createPlaylist = async (
  playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">,
  id?: string
): Promise<Playlist> => {
  const newPlaylist: Playlist = {
    ...playlist,
    id: id || `${"---"}`,
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
  const res = await db.playlists.update(id, {
    ...updates,
    updatedAt: new Date(),
  });

  console.log({ res });
};

export const deletePlaylist = (id: string) => db.playlists.delete(id);

export const addSongToPlaylist = async (playlistId: string, songId: string) => {
  const playlist = await getPlaylist(playlistId);
  if (!playlist) return;

  if (!playlist.songIds.includes(songId)) playlist.songIds.push(songId);
  const res = await db.playlists.update(playlistId, {
    songIds: playlist.songIds,
    updatedAt: new Date(),
  });

  console.log({ res });
};

export const removeSongFromPlaylist = async (
  playlistId: string,
  songId: string
) => {
  const playlist = await getPlaylist(playlistId);
  if (!playlist) return;
  playlist.songIds = playlist.songIds.filter((id) => id !== songId);

  await db.playlists.update(playlistId, {
    songIds: playlist.songIds,
    updatedAt: new Date(),
  });
};
