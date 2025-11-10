import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_7V3NdZfyCLlr@ep-red-bush-a194b3x9-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});
