import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

async function runSeed() {
  const client = await pool.connect();

  try {
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        pw_hash TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS followers (
        id SERIAL PRIMARY KEY,
        who_id INT NOT NULL,
        whom_id INT NOT NULL,
        FOREIGN KEY (who_id) REFERENCES users(id),
        FOREIGN KEY (whom_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        author_id INT NOT NULL,
        text TEXT NOT NULL,
        pub_date INT NOT NULL,
        flagged INT DEFAULT 0,
        author_name VARCHAR(255),
        FOREIGN KEY (author_id) REFERENCES users(id)
      );
    `;

    await client.query(createTablesQuery);
    console.log("Tables created successfully");

    // // Optionally, insert some seed data
    // const insertSeedDataQuery = `
    //   INSERT INTO users (username, email, pw_hash) VALUES 
    //     ('alice', 'alice@example.com', 'hashed_password_1'),
    //     ('bob', 'bob@example.com', 'hashed_password_2')
    //   ON CONFLICT (username) DO NOTHING;  -- Prevent inserting duplicates

    //   INSERT INTO followers (who_id, whom_id) VALUES
    //     (1, 2),
    //     (2, 1)
    //   ON CONFLICT DO NOTHING;

    //   INSERT INTO messages (author_id, text, pub_date, flagged, author_name) VALUES
    //     (1, 'Hello, this is a message from Alice.', 1675239900, 0, 'Alice'),
    //     (2, 'Hi, this is a message from Bob.', 1675239930, 0, 'Bob')
    //   ON CONFLICT DO NOTHING;
    // `;

    // await client.query(insertSeedDataQuery);
    // console.log("Seed data inserted successfully");

  } catch (err) {
    console.error("Error during seeding: ", err);
  } finally {
    client.release();
    pool.end(); // End the pool connection after the script finishes
  }
}

// Run the seed script
runSeed().catch((error) => console.error("Failed to run seed:", error));
