import { config } from "@dotenvx/dotenvx"
import { defineConfig } from 'drizzle-kit';

const DB_URL = process.env.DATABASE_URL
if(!DB_URL) throw Error("no DB URL")

config({ path: ".env", override: true })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL,
  },
})