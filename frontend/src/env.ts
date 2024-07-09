import { object, z } from "zod";

const envSchema = object({
    DATABASE_URL: z.string().url(),
    CLOUDFLARE_ENDPOINT: z.string().url(),
    CLOUDFLARE_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
    ClOUDFLARE_BUCKET_NAME: z.string()
})

export const env = envSchema.parse(process.env)