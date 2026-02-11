import { FirestoreService } from "./FireStoreService.js";

// DbService.ts
export interface DbService<T> {
  create(id: string, data: T): Promise<T>;
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}


// export const dbService: DbService<FileMeta> = new FirestoreService()
