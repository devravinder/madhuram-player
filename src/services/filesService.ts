import type { AppFile } from "@/types/music";
import db from "./db";

const getFileExtension = (file: File): string => {
  return file.name.split(".").pop()?.toLowerCase() || "";
};

export const saveFile = async (file: File, fileId?: string) => {
  const ext = getFileExtension(file);
  const id =
    fileId || `${crypto.randomUUID().slice(0, 8)}${ext ? "." + ext : ""}`;

  const newFile: AppFile = {
    id,
    data: file,
    createdAt: new Date(),
  };
  await db.files.add(newFile);
  return newFile;
};

export const getFile = (id: string) => db.files.get(id);
