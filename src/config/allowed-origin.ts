// ** For local development
const devOrigins = ["http://localhost:3000", "http://localhost:3001"];

// ** After got to productions
const prodOrigins = [""];

export const allowedOrigins: string[] = [...devOrigins, ...prodOrigins];
