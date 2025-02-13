import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

module.exports = connectionPool;

export async function getUserByUsername(username: string) {
  const client = await connectionPool.connect();
  const result = await client.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  client.release();
  return result.rows[0];
}
