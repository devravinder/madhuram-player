import path from "path";

export const SERVER_PORT = process.env.PORT;
export const APP_ENV = process.env.APP_ENV
export const API_PREFIX = "/api";

export const FIREBASE_CREDENTIALS_FILE=path.join(process.cwd(), "firebase-credentials.json")

export const IS_LOCAL = process.env.APP_ENV==="LOCAL";


export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_TOTAL_SIZE = 1000 * 1024 * 1024; // 1000MB
