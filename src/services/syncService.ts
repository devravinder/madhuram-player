import dayjs from "dayjs";
import {
  type TaskType,
  type Playlist,
  type Song,
  type UpdateInfo,
  type Direction,
  type BackgroundTask,
} from "@/types/music";
import axios from "redaxios";

import { withAccessToken } from "./firebaseUtil";
import { getPlaylist, getPlaylists, resetPlaylists } from "./playlistService";
import { getSong, getSongs, resetSongs } from "./songsService";
import { getAllUpdatesInfo, resetUpdateInfo } from "./updateInfoService";
import { getFile, saveFile } from "./filesService";
import { COLLECTIONS } from "./db";
import { addBackgroundTask } from "./backgroundTaskService";

const API_ENDPOINT = import.meta.env.VITE_WEB_APP_BASE_API_URL;

const getAll = async <T>(collectionName: string) => {
  const res = await withAccessToken(({ headers }) =>
    axios.get<T[]>(`${API_ENDPOINT}/firestore/${collectionName}`, { headers })
  );
  return res.data;
};

const upsertOne = async <T>(collectionName: string, data: T, id: string) => {
  const res = await withAccessToken(({ headers }) =>
    axios.post<T>(`${API_ENDPOINT}/firestore/${collectionName}/${id}`, data, {
      headers,
    })
  );
  return res.data;
};

const deleteOne = async <T>(collectionName: string, id: string) => {
  const res = await withAccessToken(({ headers }) =>
    axios.delete<T[]>(`${API_ENDPOINT}/firestore/${collectionName}/${id}`, {
      headers,
    })
  );
  return res.data;
};
//====

const getSyncType = (
  local: Date | string,
  cloud: Date | string | undefined
): Direction | undefined => {
  console.log({ local, cloud });
  if (dayjs(local).isSame(cloud, "minute"))
    // ignore seconds
    return;

  if (dayjs(local).isAfter(cloud, "minute")) {
    return "UP";
  } else return "DOWN";
};

export const songUp = async (id: string) => {
  const song = await getSong(id);
  if (!song) return;

  await upsertOne<Song>(COLLECTIONS.SONGS_COLLECTION, song, song.id);

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
};
export const songsUp = async () => {
  const data = await getSongs();

  for (let item of data) {
    await addBackgroundTask({
      id: item.id,
      type: "song_UP",
      status: "PENDING",
      retries: 0,
    });
  }
};

export const songsDown = async () => {
  const cloudSongs = await getAll<Song>(COLLECTIONS.SONGS_COLLECTION);
  const currentSongs = await getSongs();
  const ids = currentSongs.map((s) => s.id);

  const newSongs = cloudSongs.filter((song) => !ids.includes(song.id));

  for (let newSong of newSongs) {
    await addBackgroundTask({
      id: newSong.audioId,
      type: "files_DOWN",
      status: "PENDING",
      retries: 0,
    });
    if (newSong.coverImageId)
      await addBackgroundTask({
        id: newSong.coverImageId,
        type: "files_DOWN",
        status: "PENDING",
        retries: 0,
      });
  }

  await resetSongs(cloudSongs);
};

export const playlistUp = async (id: string) => {
  const data = await getPlaylist(id);
  if (!data) return;
  await upsertOne<Playlist>(COLLECTIONS.PLAYLIST_COLLECTION, data, data.id);
};
export const playlistDeleteUp = async (id: string) => {
  await deleteOne<Playlist>(COLLECTIONS.PLAYLIST_COLLECTION, id);
};
export const playlistsUp = async () => {
  const data = await getPlaylists();
  for (let playlist of data) {
    await addBackgroundTask({
      id: playlist.id,
      type: "playlist_UP",
      status: "PENDING",
      retries: 0,
    });
  }
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
    axios.post(`${API_ENDPOINT}/files/download/${id}`, {
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

export const sync = async () => {
  const localUpdatesInfo = await getAllUpdatesInfo();
  const cloudUpdatesInfo = await getAll<UpdateInfo>(
    COLLECTIONS.UPDATE_INFO_COLLECTION
  );

  console.log({ localUpdatesInfo, cloudUpdatesInfo });
  const cloud: Record<string, UpdateInfo> = {};

  cloudUpdatesInfo.reduce((pre, cur) => {
    pre[cur.collectionName] = cur;
    return pre;
  }, cloud);

  for (let localInfo of localUpdatesInfo) {
    const type = getSyncType(
      localInfo.updatedAt,
      cloud[localInfo.collectionName]?.updatedAt
    );
    if (!type) break;

    const taskType: TaskType = `${localInfo.collectionName}_${type}`;

    const task: BackgroundTask = {
      id: taskType,
      type: taskType,
      retries: 0,
      status: "PENDING",
    };

    await addBackgroundTask(task);
  }

  // update update-info
  const latestUpdatesInfo = await getAll<UpdateInfo>(
    COLLECTIONS.UPDATE_INFO_COLLECTION
  );

  await resetUpdateInfo(latestUpdatesInfo);
};
