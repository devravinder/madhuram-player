import type { BackgroundTask, Playlist, Song } from "@/types/music";
import { addBackgroundTask } from "./backgroundTaskService";
import db, { COLLECTIONS } from "./db";
import { updateInfo } from "./updateInfoService";

export const getSongs = () => db.songs.toArray();

export const getSong = (id: string) => db.songs.get(id);
export const getSongsCount = () => db.songs.count();

export const getPlayListSongs = async (playlist?: Playlist) => {
  if (!playlist) return [];
  const allSongs = await getSongs();
  return allSongs.filter((song) => playlist.songIds.includes(song.id));
};

export const addSong = async (song: Omit<Song, "id">, id?: string) => {
  const newSong: Song = {
    ...song,
    id: id || `${crypto.randomUUID().slice(0, 4)}`,
    addedAt: new Date(),
  };
  await db.songs.add(newSong);
  await updateInfo(COLLECTIONS.SONGS_COLLECTION);

  const task: BackgroundTask = {
    id: newSong.id,
    type: "song_UP",
    retries: 0,
    status: "PENDING",
  };

  await addBackgroundTask(task);

  return newSong;
};
export const deleteSongs = async () => {
  await db.songs.clear();
  await updateInfo(COLLECTIONS.SONGS_COLLECTION);
};

export const resetSongs = async (songs: Song[]) => {
  await db[COLLECTIONS.SONGS_COLLECTION].clear();

  await db[COLLECTIONS.SONGS_COLLECTION].bulkAdd(songs);
};
