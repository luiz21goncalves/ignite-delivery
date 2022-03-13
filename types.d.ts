declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    CLIENT_SECRET: string;
    DELIVERYMAN_SECRET: string;
    CLIENT_EXPIRES_IN: string | number;
    DELIVERYMAN_EXPIRES_IN: string | number;
    DATABASE_URL: string;
  }
}
