// db.js
import type { AudioFile, Playlist, Song } from "@/types/music"
import { Dexie, type EntityTable } from "dexie"

export const db = new Dexie("madhuram") as Dexie & {
  songs: EntityTable<
    Song,
    "id" // primary key "id" (for the typings only)
  >,
  playlists: EntityTable<Playlist, "id">
  audioFiles: EntityTable<AudioFile, "songId">
}


db.version(1).stores({
  songs: "++id, title, addedAt", // Primary key and indexed props
  playlists: '++id, name, songIds',
  audioFiles: 'songId'
})


export default db;
