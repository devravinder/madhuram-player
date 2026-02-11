declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      APP_FIREBASE_STORAGE_BUCKET: string
      APP_ENV: "LOCAL" | "FIREBASE"

    }
  }

  interface AppFile {
    name: string
    mimeType: string
    size: number
    path: string
  }
}

export {};
