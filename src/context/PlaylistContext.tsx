import { FAVOURITE_PLAYLIST_ID, RECENT_PLAYLIST_ID } from "@/services/db";
import { getPlaylist, updatePlaylist } from "@/services/playlistService";
import { type Playlist } from "@/types/music";
import { useLiveQuery } from "dexie-react-hooks";
import React, { createContext, useContext } from "react";
interface PlaylistContextType {
  recentPlaylist: Playlist;
  favouritePlaylist: Playlist;
  toggleLike: (songId: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const recentPlaylist = useLiveQuery(async () => {
    const playList = await getPlaylist(RECENT_PLAYLIST_ID);
    if (playList) return playList;
  })!;

  const favouritePlaylist = useLiveQuery(async () => {
    const playList = await getPlaylist(FAVOURITE_PLAYLIST_ID);
    if (playList) return playList;
  })!;

  const toggleLike = async (songId: string) => {
    const favourites = favouritePlaylist.songIds;
    const songIds = favourites.includes(songId)
      ? favourites.filter((id) => id !== songId)
      : [songId, ...favourites];

    await updatePlaylist(FAVOURITE_PLAYLIST_ID, { songIds });
  };

  return (
    <PlaylistContext.Provider
      value={{
        recentPlaylist,
        favouritePlaylist,
        toggleLike,
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
