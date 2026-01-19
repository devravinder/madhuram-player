import { type Playlist, type Song } from "@/types/music";
import axios from "redaxios";

import { addBackgroundTask } from "./backgroundTaskService";
import { COLLECTIONS } from "./db";
import { deleteAllFiles, getFile, saveFile } from "./filesService";
import { withAccessToken } from "./firebaseUtil";
import { getPlaylists, resetPlaylists } from "./playlistService";
import { getSongs, resetSongs } from "./songsService";

const API_ENDPOINT = import.meta.env.VITE_WEB_APP_BASE_API_URL;

const getAll = async <T>(collectionName: string) => {
  const res = await withAccessToken(({ headers }) =>
    axios.get<T[]>(`${API_ENDPOINT}/firestore/${collectionName}`, { headers })
  );
  return res.data;
};

const addAll = async <T>(collectionName: string, data: T[]) => {
  const res = await withAccessToken(({ headers }) =>
    axios.post<T[]>(`${API_ENDPOINT}/firestore/${collectionName}`, data, {
      headers,
    })
  );
  return res.data;
};

export const upsertOne = async <T>(
  collectionName: string,
  data: T,
  id: string
) => {
  const res = await withAccessToken(({ headers }) =>
    axios.post<T>(`${API_ENDPOINT}/firestore/${collectionName}/${id}`, data, {
      headers,
    })
  );
  return res.data;
};

export const deleteOne = async <T>(collectionName: string, id: string) => {
  const res = await withAccessToken(({ headers }) =>
    axios.delete<T[]>(`${API_ENDPOINT}/firestore/${collectionName}/${id}`, {
      headers,
    })
  );
  return res.data;
};

const deleteAll = async (collectionName: string) => {
  const res = await withAccessToken(({ headers }) =>
    axios.delete(`${API_ENDPOINT}/firestore/${collectionName}`, {
      headers,
    })
  );
  return res.data;
};
//====

export const songsUp = async () => {
  const data = await getSongs();
  await deleteAll(COLLECTIONS.SONGS_COLLECTION);
  await addAll(COLLECTIONS.SONGS_COLLECTION, data);

  for (const song of data) {
    await addBackgroundTask({
      id: song.audioId,
      type: "files_UP",
      status: "PENDING",
      retries: 0,
    });
    if (song.coverImageId)
      await addBackgroundTask({
        id: song.coverImageId,
        type: "files_UP",
        status: "PENDING",
        retries: 0,
      });
  }
};

export const songsDown = async () => {
  const cloudSongs = await getAll<Song>(COLLECTIONS.SONGS_COLLECTION);

  await deleteAllFiles();

  for (let song of cloudSongs) {
    await addBackgroundTask({
      id: song.audioId,
      type: "files_DOWN",
      status: "PENDING",
      retries: 0,
    });
    if (song.coverImageId)
      await addBackgroundTask({
        id: song.coverImageId,
        type: "files_DOWN",
        status: "PENDING",
        retries: 0,
      });
  }
  await resetSongs(cloudSongs);
};

export const playlistsUp = async () => {
  const data = await getPlaylists();
  await deleteAll(COLLECTIONS.PLAYLIST_COLLECTION);
  await addAll(COLLECTIONS.PLAYLIST_COLLECTION, data);
};

export const playlistsDown = async () => {
  const data = await getAll<Playlist>(COLLECTIONS.PLAYLIST_COLLECTION);
  await resetPlaylists(data);
};

export const fileUp = async (id: string) => {
  const appFile = await getFile(id);

  if (!appFile) return;

  const form = new FormData();
  form.append("file", appFile.data);

  await withAccessToken(({ headers }) =>
    axios.post(`${API_ENDPOINT}/files/upload/${appFile.id}`, form, {
      headers,
    })
  );
};

export const filedown = async (id: string) => {
  const response = await withAccessToken(({ headers }) =>
    axios.get(`${API_ENDPOINT}/files/download/${id}`, {
      headers,
      responseType: "blob", // IMPORTANT
    })
  );

  const blob: Blob = response.data;

  const disposition = response.headers.get("Content-Disposition");
  let filename = "download";

  if (disposition) {
    const match = disposition.match(/filename=(?:(?:"([^"]+)")|([^;]+))/);
    filename = match?.[1] || match?.[2] || "download";
    filename = filename.trim();
  }

  const file = new File([blob], filename, {
    type: blob.type,
  });

  await saveFile(file, id);
};

export const syncUp = async () => {
  await addBackgroundTask({
    id: "playlists_UP",
    type: "playlists_UP",
    status: "PENDING",
    retries: 0,
  });

  await addBackgroundTask({
    id: "songs_UP",
    type: "songs_UP",
    status: "PENDING",
    retries: 0,
  });
};

export const syncDown = async () => {
  await addBackgroundTask({
    id: "playlists_DOWN",
    type: "playlists_DOWN",
    status: "PENDING",
    retries: 0,
  });

  await addBackgroundTask({
    id: "songs_DOWN",
    type: "songs_DOWN",
    status: "PENDING",
    retries: 0,
  });
};
