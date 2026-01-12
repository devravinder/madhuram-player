import type { Playlist, Song } from "@/types/music";
import db from "./db";

export const getSongs = () => db.songs.toArray();

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
  return newSong;
};


export const getSongsCount = ()=>db.songs.count()