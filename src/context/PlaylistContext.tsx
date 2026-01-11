import React, { createContext, useContext, useCallback } from "react";
import { type Playlist } from "@/types/music";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import db from "@/services/db";
import { useLiveQuery } from "dexie-react-hooks";
interface PlaylistContextType {
  playlists: Playlist[];
  createPlaylist: (
    playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">
  ) => Promise<Playlist>;
  updatePlaylist: (
    id: string,
    updates: Partial<Omit<Playlist, "id" | "createdAt">>
  ) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  getPlaylist: (id: string) => Playlist | undefined;
  toggleLike: (songId: string) => void;
  favourites: string[];
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourities] = useLocalStorage<string[]>(
    "favourites",
    []
  ); // songIds

  const playlists = useLiveQuery(async () => {
    const res = await db.playlists.toArray();
    return res;
  })!;

  const toggleLike = (songId: string) => {
    const index = favourites.findIndex((id) => id === songId);
    if (index >= 0) setFavourities((pre) => pre.filter((id) => id !== songId));
    else setFavourities([songId, ...favourites]);
  };
  const createPlaylist = useCallback(
    async (
      playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">
    ): Promise<Playlist> => {
      const newPlaylist: Omit<Playlist, "id"> = {
        ...playlist,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res = await db.playlists.add(newPlaylist);

      return { ...newPlaylist, id: res };
    },
    []
  );

  const updatePlaylist = useCallback(
    async (
      id: string,
      updates: Partial<Omit<Playlist, "id" | "createdAt">>
    ) => {
      const res = await db.playlists.update(id, {
        ...updates,
        updatedAt: new Date(),
      });

      console.log({ res });
    },
    []
  );

  const deletePlaylist = useCallback(async (id: string) => {
    await db.playlists.delete(id);
  }, []);

  const addSongToPlaylist = useCallback(
    async (playlistId: string, songId: string) => {
      const playlist = playlists.find((item) => item.id === playlistId)!;

      if (!playlist.songIds.includes(songId)) playlist.songIds.push(songId);

      const res = await db.playlists.update(playlistId, {
        songIds: playlist.songIds,
        updatedAt: new Date(),
      });

      console.log({ res });
    },
    [playlists]
  );

  const removeSongFromPlaylist = useCallback(
    async (playlistId: string, songId: string) => {
      const playlist = playlists.find((item) => item.id === playlistId)!;

      playlist.songIds = playlist.songIds.filter((id) => id !== songId);

      const res = await db.playlists.update(playlistId, {
        songIds: playlist.songIds,
        updatedAt: new Date(),
      });

      console.log({ res });
    },
    [playlists]
  );

  const getPlaylist = useCallback(
    (id: string): Playlist | undefined => {
      return playlists.find((p) => p.id === id);
    },
    [playlists]
  );

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        favourites,
        toggleLike,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        getPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlaylists() {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylists must be used within a PlaylistProvider");
  }
  return context;
}
