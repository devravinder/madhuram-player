// db.js

import { staticSongs } from "@/data/songs";
import type { AudioFile, Playlist, Song } from "@/types/music";
import { Dexie, type EntityTable } from "dexie";

export const db = new Dexie("madhuram") as Dexie & {
  songs: EntityTable<
    Song,
    "id" // primary key "id" (for the typings only)
  >;
  playlists: EntityTable<Playlist, "id">;
  audioFiles: EntityTable<AudioFile, "songId">;
};

db.version(1).stores({
  songs: "++id, title, addedAt", // Primary key and indexed props
  // ++ auto increment works only for numbers
  playlists: "id, name, songIds",
  audioFiles: "songId",
});

//====
const createSampleSongs = async () => {
  console.log("createSampleSongs");
  await db.songs.bulkAdd(staticSongs);
};

export const RECENT_PLAYLIST_ID = "recentPlaylist";
export const FAVOURITE_PLAYLIST_ID = "favouritePlaylist";

const recentPlaylistDefault: Playlist = {
  id: RECENT_PLAYLIST_ID,
  name: "Recently Played",
  description: "recently played songs",
  songIds: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const favouritePlaylistDefault: Playlist = {
  id: FAVOURITE_PLAYLIST_ID,
  name: "Favourites",
  description: "Favourite songs",
  songIds: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const createInitialPlayLists = async () => {
  console.log("createInitialPlayLists");
  await db.playlists.add(recentPlaylistDefault);
  await db.playlists.add(favouritePlaylistDefault);
};

export const initializeDb = async () => {
  console.log("initializeDb");
  const data = await db.playlists.get(FAVOURITE_PLAYLIST_ID);

  if (data) {
    console.log("Data exists");
    return;
  }

  await createSampleSongs();
  await createInitialPlayLists();
};

export default db;
