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

export async function getUserByUsername(username: string): Promise<{
  id: string;
  username: string;
  pw_hash: string;
  }> {
  const client = await connectionPool.connect();
  const result = await client.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  client.release();
  return result.rows[0] as { id: string; username: string; pw_hash: string };
}

export async function getUserById(id: string) {
  const client = await connectionPool.connect();
  const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
  client.release();
  return result.rows[0];
}

export async function createUser(username: string, password: string) {
  const client = await connectionPool.connect();
  const query = `INSERT INTO users (username, pw_hash) VALUES ($1, $2) RETURNING id`;
  const values = [username, password];
  const result = await client.query(query, values);
  client.release();
  return result.rows[0];
}

export async function showUsers() {
  const client = await connectionPool.connect();
  const result = await client.query(`SELECT * FROM users`);
  client.release();
  return result.rows;
}