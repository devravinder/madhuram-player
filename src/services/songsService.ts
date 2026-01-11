import type { Playlist } from "@/types/music";
import db from "./db";

export const getSongs = () => db.songs.toArray();

export const getPlayListSongs = async (playlist?: Playlist) => {
  if (!playlist) return [];
  const allSongs = await getSongs();
  return allSongs.filter((song) => playlist.songIds.includes(song.id));
};
