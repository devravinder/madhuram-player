import React, { createContext, useContext, useCallback } from "react";
import { type Playlist } from "@/types/music";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface PlaylistContextType {
  playlists: Playlist[];
  createPlaylist: (
    playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">
  ) => Playlist;
  updatePlaylist: (
    id: string,
    updates: Partial<Omit<Playlist, "id" | "createdAt">>
  ) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
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
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>(
    "playlists",
    []
  );

  const toggleLike = (songId: string) => {
    const index = favourites.findIndex((id) => id === songId);
    if (index >= 0) setFavourities((pre) => pre.filter((id) => id !== songId));
    else setFavourities([songId, ...favourites]);
  };
  const createPlaylist = useCallback(
    (playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">): Playlist => {
      const newPlaylist: Playlist = {
        ...playlist,
        id: `playlist-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setPlaylists((prev) => [...prev, newPlaylist]);
      return newPlaylist;
    },
    [setPlaylists]
  );

  const updatePlaylist = useCallback(
    (id: string, updates: Partial<Omit<Playlist, "id" | "createdAt">>) => {
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === id
            ? { ...playlist, ...updates, updatedAt: new Date() }
            : playlist
        )
      );
    },
    [setPlaylists]
  );

  const deletePlaylist = useCallback(
    (id: string) => {
      setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
    },
    [setPlaylists]
  );

  const addSongToPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === playlistId && !playlist.songIds.includes(songId)
            ? {
                ...playlist,
                songIds: [...playlist.songIds, songId],
                updatedAt: new Date(),
              }
            : playlist
        )
      );
    },
    [setPlaylists]
  );

  const removeSongFromPlaylist = useCallback(
    (playlistId: string, songId: string) => {
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songIds: playlist.songIds.filter((id) => id !== songId),
                updatedAt: new Date(),
              }
            : playlist
        )
      );
    },
    [setPlaylists]
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
