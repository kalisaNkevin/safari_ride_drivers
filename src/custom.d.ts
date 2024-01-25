declare namespace NodeJS {
  interface ProcessEnv {
    GENERATE_SOURCEMAP: "true" | "false";
    API_URL_V1: string;
  }
}
