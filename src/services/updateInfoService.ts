import type { CollectionValue, UpdateInfo } from "@/types/music";
import db, { COLLECTIONS } from "./db";

export const updateInfo = async (collectionName: CollectionValue) =>
  db.updateInfo.put({ collectionName, updatedAt: new Date() });

export const getAllUpdatesInfo = async () => db.updateInfo.toArray();

export const resetUpdateInfo=async(updates:UpdateInfo[])=>{
  await db[COLLECTIONS.UPDATE_INFO_COLLECTION].clear()

  await db[COLLECTIONS.UPDATE_INFO_COLLECTION].bulkAdd(updates)
}
