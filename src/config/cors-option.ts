import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowed-origin";

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow specific methods
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Idempotency-Key",
    "X-Idempotency-Key", // as some browser wants that format
  ],
  credentials: true, // Allow credentials (cookies, etc.)
  optionsSuccessStatus: 200, // For older browsers compatibility
};

export default corsOptions;
