export const APP_CONFIG = {
  API_ENDPOINT:
    process.env.NODE_ENV !== "development"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_DEV,
  ROLES: ["user", "admin"] as const,
};
