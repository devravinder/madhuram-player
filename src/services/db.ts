import { Dexie, type EntityTable } from "dexie";
import type { AudioFile, Playlist, Song } from "@/types/music";
import { DB_NAME } from "@/constants";

class AppDB extends Dexie {
  songs!: EntityTable<Song, "id">;
  playlists!: EntityTable<Playlist, "id">;
  audioFiles!: EntityTable<AudioFile, "songId">;

  constructor() {
    super(DB_NAME);

    this.version(1).stores({
      songs: "id,title,addedAt",
      playlists: "id,name,createdAt",
    });

    this.version(2)
      .stores({
        songs: "id,title,addedAt",
        playlists: "id,name,createdAt",
      })
      .upgrade(async tx => {
        console.log("Upgrading to v2 → clearing old data");

        await Promise.all([
          tx.table("songs").clear(),
          tx.table("playlists").clear(),
          tx.table("audioFiles").clear()
        ]);
      });

      this.version(3)
      .stores({
        songs: "id,title,addedAt",
        playlists: "id,name,createdAt, *songIds",
      })
      .upgrade(async () => {
        console.log("Upgrading to v3 ");
      });
  }
}

const db = new AppDB();

//=====
export async function initDB() {
  try {
    await db.open();
  } catch (error: any) {
    console.error("DB upgrade failed:", error);

    if (error?.name === "UpgradeError") {
      const reset = window.confirm(
        "Database upgrade failed.\n" +
        "Old data is incompatible.\n\n" +
        "Do you want to reset database?"
      );

      if (reset) {
        await Dexie.delete(DB_NAME);
        window.location.reload(); // recreate with latest version
      }
    }
  }
}

export default db;
