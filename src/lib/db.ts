import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function getUserByUsername(username: string) {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT user_id, username, email, pw_hash FROM users WHERE username = $1`,
      [username]
    );
    return rows[0] || undefined;
  } catch (error) {
    console.error("Error fetching user by username");
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserById(id: string) {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT user_id, username, email, pw_hash FROM users WHERE user_id = $1`,
      [id]
    );
    return rows[0] || undefined;
  } catch (error) {
    console.error("Error fetching user by ID");
    throw error;
  } finally {
    client.release();
  }
}

export async function createUser(
  username: string,
  email: string,
  pw_hash: string
) {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `INSERT INTO users (username, email, pw_hash) VALUES ($1, $2, $3) RETURNING user_id`,
      [username, email, pw_hash]
    );
    return rows[0];
  } catch (error) {
    console.error("Error creating user");
    throw error;
  } finally {
    client.release();
  }
}

export async function showUsers() {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT user_id, username, email FROM users`
    );
    return rows;
  } catch (error) {
    console.error("Error fetching users");
    throw error;
  } finally {
    client.release();
  }
}
