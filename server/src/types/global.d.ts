declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
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
