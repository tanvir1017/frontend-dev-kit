export const APP_CONFIG = {
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  MAX_RETRIES: 3, // Use full for retry the same things by while loop. e.g, api call max retries
  ROLES: ["user", "admin", "moderator"] as const,
};
