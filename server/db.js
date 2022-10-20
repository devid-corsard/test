import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// const client = await pool.connect();
// const { rows } = await client.query(SQL.GET_ALL);
export const SQL = {
  CREATE_USER: `
    INSERT INTO users
    (id, name, email, phone, position_id, photo, registration_timestamp) 
    VALUES
    (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())
    RETURNING *
  `,

  SELECT_BY_OFFSET_AND_LIMIT: `
    SELECT * FROM users
    OFFSET $1 LIMIT $2
  `,

  SELECT_BY_ID: `SELECT * FROM users LEFT JOIN positions ON positions.position_id = users.position_id WHERE id = $1`,
};
