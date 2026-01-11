import db from "@/services/db";
import { type Playlist } from "@/types/music";
import { useLiveQuery } from "dexie-react-hooks";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
interface PlaylistContextType {
  playlists: Playlist[];
  recentPlaylist: Playlist;
  favouritePlaylist: Playlist;
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
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

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
export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const recentPlaylist = useLiveQuery(async () => {
    const playList = await db.playlists.get(RECENT_PLAYLIST_ID);
    if (playList) return playList;
  })!;

  const favouritePlaylist = useLiveQuery(async () => {
    const playList = await db.playlists.get(FAVOURITE_PLAYLIST_ID);
    if (playList) return playList;
  })!;

  const playlists = useLiveQuery(async () => {
    const res = await db.playlists.toArray();
    return res;
  })!;

  const toggleLike = async (songId: string) => {
    const favourites = favouritePlaylist.songIds;
    const songIds = favourites.includes(songId)
      ? favourites.filter((id) => id !== songId)
      : [songId, ...favourites];

    await db.playlists.update(FAVOURITE_PLAYLIST_ID, { songIds });
  };
  const createPlaylist = useCallback(
    async (
      playlist: Omit<Playlist, "id" | "createdAt" | "updatedAt">,
      id?: string
    ): Promise<Playlist> => {
      const newPlaylist: Playlist = {
        ...playlist,
        id: id || `${playlists.length}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.playlists.add(newPlaylist);
      return newPlaylist;
    },
    [playlists]
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

  useEffect(() => {
    const createInitialPlayLists = async () => {
      console.log("createInitialPlayLists");
      await createPlaylist(recentPlaylistDefault, RECENT_PLAYLIST_ID);
      await createPlaylist(favouritePlaylistDefault, FAVOURITE_PLAYLIST_ID);
    };
    if (playlists && playlists.length == 0) createInitialPlayLists();
  }, [playlists, createPlaylist]);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        recentPlaylist,
        favouritePlaylist,
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
