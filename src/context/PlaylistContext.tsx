import { FAVOURITE_PLAYLIST_ID, RECENT_PLAYLIST_ID } from "@/services/db";
import { getPlaylist, updatePlaylist } from "@/services/playlistService";
import React, { createContext, useCallback, useContext, useState } from "react";
interface PlaylistContextType {
  addToRecentlyPlayed: (songId: string, playListId?: string) => Promise<void>;
  toggleLike: (songId: string) => void;
  favourites: string[]
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<string[]>([]);

  const addToRecentlyPlayed = async (songId: string, playListId?: string) => {
    const isRecent = playListId === RECENT_PLAYLIST_ID;

    console.log({ playListId, isRecent });
    if (isRecent) return;

    const recentPlaylist = await getPlaylist(RECENT_PLAYLIST_ID);

    const isExists = recentPlaylist?.songIds.find((ele) => ele === songId);
    let songIds = recentPlaylist?.songIds || [];

    if (isExists) {
      songIds = songIds?.filter((ele) => ele === songId);
      songIds = [songId, ...songIds];
    } else {
      songIds = [...songIds, songId];
    }

    await updatePlaylist(RECENT_PLAYLIST_ID, {
      songIds,
    });
  };

  const toggleLike = useCallback(
    async (songId: string) => {
      const favouritePlaylist = await getPlaylist(FAVOURITE_PLAYLIST_ID);
      const favourites = favouritePlaylist?.songIds || [];
      const songIds = favourites.includes(songId)
        ? favourites.filter((id) => id !== songId)
        : [songId, ...favourites];

      setFavourites(songIds);

      await updatePlaylist(FAVOURITE_PLAYLIST_ID, { songIds });
    },
    [setFavourites]
  );
  return (
    <PlaylistContext.Provider
      value={{
        favourites,
        addToRecentlyPlayed,
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
