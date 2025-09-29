import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_BASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    APP_NAME: z.string(),
    APP_DESCRIPTION: z.string(),
    API_BASE_URL_AI_INBOUND: z.string().url(),
    API_BASE_URL_AI_OUTBOUND: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_APP_DESCRIPTION: z.string(),
    NEXT_PUBLIC_OUTBOUND_EMAIL: z.string().email(),
    NEXT_PUBLIC_INBOUND_EMAIL: z.string().email(),
    NEXT_PUBLIC_API_BASE_URL_AI_INBOUND: z.string().url(),
    NEXT_PUBLIC_API_BASE_URL_AI_OUTBOUND: z.string().url(),
  },
  runtimeEnv: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_BASE_URL_AI_INBOUND: process.env.API_BASE_URL_AI_INBOUND,
    API_BASE_URL_AI_OUTBOUND: process.env.API_BASE_URL_AI_OUTBOUND,
    NODE_ENV: process.env.NODE_ENV,
    APP_NAME: process.env.APP_NAME,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,

    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_OUTBOUND_EMAIL: process.env.NEXT_PUBLIC_OUTBOUND_EMAIL,
    NEXT_PUBLIC_INBOUND_EMAIL: process.env.NEXT_PUBLIC_INBOUND_EMAIL,

    NEXT_PUBLIC_API_BASE_URL_AI_INBOUND:
      process.env.NEXT_PUBLIC_API_BASE_URL_AI_INBOUND,

    NEXT_PUBLIC_API_BASE_URL_AI_OUTBOUND:
      process.env.NEXT_PUBLIC_API_BASE_URL_AI_OUTBOUND,
  },
});
