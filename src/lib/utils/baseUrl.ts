import env from "../../config/clean-env";

export const urlFrontEnd = !env.isProd
  ? env.DEV_CLIENT_URL
  : env.PROD_CLIENT_URL;
