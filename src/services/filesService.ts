import type { AppFile } from "@/types/music";
import db from "./db";

export const saveFile=async(file: File, id?: string)=>{

    const newFile: AppFile = {
    id: id || `${crypto.randomUUID().slice(0,4)}`,
    data: file,
    name: file.name,
    size: file.size,
    type: file.type,

    createdAt: new Date(),
  };
  await db.files.add(newFile);
  return newFile;

}

export const getFile = (id: string) => db.files.get(id);
